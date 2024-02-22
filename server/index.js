import express from 'express'
import moment from 'moment'
import mysql from 'mysql2'
import bodyParser from 'body-parser'
const app = express();
import bcrypt from 'bcrypt'
const salt = bcrypt.genSaltSync(10);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
})
app.use(express.json());
app.use(bodyParser.json())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abcd1234",
    database: "hostel"
})
app.post('/admin/login', async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    db.query("select id from adminauth where username=? and password=? limit 1", [user.username, user.password], (err, data) => {
        if (data.length > 0) {
            res.json({ result: 'SUCCESS', token: 'adminadmin' });
        } else {
            res.json({ result: 'ERROR', message: "User id or password is not correct!" });
        }
    });
})
app.post('/warden/login', async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    db.query("select * from warden where email=?", [user.username], (err, data) => {
        if (data.length > 0 && bcrypt.compareSync(user.password, data[0].password)) {
            if (data[0].approved === 1)
                res.json({ result: 'SUCCESS', token: 'wardenwarden', id: data[0].id });
            else
                res.json({ result: "WAIT" })
        } else {
            res.json({ result: 'ERROR', message: "User id or password is not correct!" });
        }
    });
})
app.post('/student/login', async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    db.query("select * from student where email=?", [user.username], (err, data) => {
        if (data.length > 0 && bcrypt.compareSync(user.password, data[0].password)) {
            if (data[0].approved === 1)
                res.json({ result: 'SUCCESS', token: 'studentstudent', id: data[0].id });
            else
                res.json({ result: "WAIT" })
        } else {
            res.json({ result: 'ERROR', message: "User id or password is not correct!" });
        }
    });
})
app.post('/student-register', async (req, res) => {
    const user = {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        bloodgroup: req.body.bloodgroup,
        clgname: req.body.clgname,
        rollno: req.body.rollno,
        degree: req.body.degree,
        year: req.body.year,
        semester: req.body.semester,
        joindate: req.body.joindate,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        pcode: req.body.pcode,
        fname: req.body.fname,
        fphone: req.body.fphone,
        foccupation: req.body.foccupation,
        mname: req.body.mname,
        mphone: req.body.mphone,
        moccupation: req.body.moccupation,
        password: bcrypt.hashSync(req.body.password, salt),
        hostel: req.body.gender === 'M' ? "Kurinji" : "Mullai"
    }
    db.query('select * from student where email=?', [user.email], (err, data) => {
        if (data.length > 0) {
            console.log(data);
            res.send({ message: "AE" })
        } else {
            db.query("insert into student (name,dob,gender,email,mobile,bloodgroup,college,rno,deg,year,sem,doj,country,city,address,pin,father,fathermobile,fatherocc,mother,mothermobile,motherocc,password,approved,hostel) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?)", [user.name, user.dob, user.gender, user.email, user.mobile, user.bloodgroup, user.clgname, user.rollno, user.degree, user.year, user.semester, user.joindate, user.country, user.city, user.address, user.pcode, user.fname, user.fphone, user.foccupation, user.mname, user.mphone, user.moccupation, user.password, user.hostel], (err, data) => {
                if (err) console.log(err);
                res.send({ message: "SUCCESS" })
            })
        }
    })

})
app.post('/warden-register', async (req, res) => {
    const user = {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        bloodgroup: req.body.bloodgroup,
        clgname: req.body.clgname,
        dept: req.body.dept,
        degree: req.body.degree,
        aoresearch: req.body.aoresearch,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        pcode: req.body.pcode,
        password: bcrypt.hashSync(req.body.password, salt),
        hostel: req.body.gender === 'M' ? "Kurinji" : "Mullai"
    }
    db.query('select * from warden where email=?', [user.email], (err, data) => {
        if (data.length > 0) {
            res.send({ message: "AE" })
        } else {
            db.query("insert into warden (name,dob,gender,email,mobile,bloodgroup,clgname,dept,degree,aoresearch,country,city,address,pcode,password,approved,hostel) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?)", [user.name, user.dob, user.gender, user.email, user.mobile, user.bloodgroup, user.clgname, user.dept, user.degree, user.aoresearch, user.country, user.city, user.address, user.pcode, user.password, user.hostel], (err, data) => {
                if (err) console.log(err);
                else
                    res.send({ message: "SUCCESS" })
            })
        }
    })

})
app.get('/admin/approval', async (req, res) => {
    db.query("select * from warden where approved=0", (err, data) => {
        if (data.length > 0) {
            res.json(data);
        } else {
            res.json({ message: "Nothing" })
        }
    });
})
app.post('/admin/approval', async (req, res) => {
    const user = {
        id: req.body.id,
        uname: req.body.uname,
        pwd: req.body.pwd
    }
    db.query("update warden set approved=1 where id=?", [user.id], (err, data) => { });

})
app.post('/admin/deny', async (req, res) => {
    const user = {
        id: req.body.id,
        uname: req.body.uname,
        pwd: req.body.pwd
    }
    db.query("delete from warden where id=?", [user.id], (err, data) => { });

})
app.post('/warden/deny', async (req, res) => {
    const user = {
        id: req.body.id,
        uname: req.body.uname,
        pwd: req.body.pwd
    }
    db.query("delete from student where id=?", [user.id], (err, data) => { });
})
app.get('/warden/approval/:id', async (req, res) => {
    db.query("select * from student where approved=0 and hostel=(select hostel from warden where id=?)", [req.params.id], (err, data) => {
        if (data.length > 0) {
            res.json(data);
        } else {
            res.json({ message: "Nothing" })
        }
    });
})
app.post('/warden/approval/:id', async (req, res) => {
    const user = {
        id: req.body.id,
        uname: req.body.uname,
        pwd: req.body.pwd
    }
    db.query("update student set approved=1 where id=?", [user.id], (err, data) => { });
})
app.post('/warden/students/:id', async (req, res) => {
    let hostel;
    db.query("select hostel from warden where id = ?", [req.params.id], (err, data) => {
        hostel = data[0].hostel;
        db.query("select * from attendance where date=? and hostel=?", [req.body.date, data[0].hostel], (err, data) => {
            if (data.length > 0) {
                res.json({ message: "AE" })
            } else {
                db.query("select * from student join hostelstudent join hostelvacancy on student.id=hostelstudent.studentid and hostelstudent.roomid=hostelvacancy.id where student.hostel=? and student.doj<=? and student.approved=1", [hostel, req.body.date], (err, data) => {
                    res.json(data);
                })
            }
        })
    })
})
app.get('/warden/view-students/:id', async (req, res) => {
    let hostel;
    db.query("select hostel from warden where id = ?", [req.params.id], (err, data) => {
        hostel = data[0].hostel;
        db.query("select * from student join hostelstudent join hostelvacancy on student.id=hostelstudent.studentid and hostelstudent.roomid=hostelvacancy.id where student.hostel=? and student.approved=1", [hostel], (err, data) => {
            res.json(data);
        })
    })
})
app.get('/student/dashboard/:id', async (req, res) => {
    db.query('select * from hostelstudent where studentid=?', [req.params.id], (err, data) => {
        if (data.length > 0) {
            db.query("select * from student join hostelstudent join hostelvacancy on student.id=hostelstudent.studentid and hostelstudent.roomid=hostelvacancy.id where student.id=?", [req.params.id], (err, data) => {
                res.json(data);
            })
        } else {
            db.query("select * from student where id=?", [req.params.id], (err, data) => {
                res.json(data);
            })
        }
    })

})
app.get('/warden/dashboard/:id', async (req, res) => {
    db.query("select * from warden where id=?", [req.params.id], (err, data) => {
        if (err) console.log(err);
        res.json(data);
    })
})
app.post('/warden/attendance/:id', async (req, res) => {
    const arr = req.body.arr;
    let count = 0;
    arr.forEach(element => {
        if (element.attendance) {
            db.query("insert into attendance (studid,date,hostel) values (?,?,?) ", [element.studentid, req.body.date, element.hostel], (err, data) => {
                if (err) {
                }
                db.query('select * from reduction where studid=? and ? between `from` and `to`', [element.studentid, new Date(req.body.date)], (err, data) => {
                    if (err) {
                    }
                    if (data != undefined) {
                        data.forEach((d) => {
                            db.query("delete from reduction where id=?", [d.id], (err, data) => {
                                if (err) {
                                }
                                count++;
                                if (count === arr.length) {
                                    res.json({ message: "SUCCESS" });
                                }
                            });
                        })
                    } else {
                        count++;
                        if (count === arr.length) {
                            res.json({ message: "SUCCESS" });
                        }
                    }
                })
            })
        } else {
            count++;
            if (count === arr.length) {
                res.json({ message: "SUCCESS" });
            }
        }
    });
});
app.post('/warden/bm/:id',(req,res)=>{
    db.query("update student set blackmark=? where name=?",[req.body.blackmark,req.body.name],(err,data)=>{
        if(err) res.json({message:"AE"})
        else res.json({message:"SUCCESS"})
    })
})
app.post('/warden/mess/:id', async (req, res) => {
    let hostel;
    const month = req.body.month;
    const year = req.body.year;
    const amount = req.body.amount;
    const startOfMonth = new Date(`${year}-${month}-01`);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
    db.query("select hostel from warden where id = ?", [req.params.id], (err, data) => {
        hostel = data[0].hostel;
        db.query("select * from messbill where month=? and year=? and hostel=?", [month, year, data[0].hostel], (err, data) => {
            if (data.length > 0) {
                res.json({ message: "AE" })
            } else {
                db.query("select id, doj from student where hostel=? and approved=1", [hostel], (err, data) => {
                    let totalDaysResided = 0;
                    data.forEach(student => {
                        const doj = new Date(student.doj);
                        const daysInMonth = endOfMonth.getDate();
                        let daysResided;
                        if (doj.getFullYear() < year || (doj.getFullYear() === year && doj.getMonth() < month - 1)) {
                            daysResided = daysInMonth;
                        } else if (doj.getFullYear() == year && doj.getMonth() == month - 1) {
                            daysResided = daysInMonth - doj.getDate() + 1;
                        } else {
                            daysResided = 0;
                        }
                        totalDaysResided += daysResided;
                    });
                    db.query("select sum(days) as reductionDays from reduction join student on student.id=reduction.studid where student.hostel=? and MONTH(`from`)=?", [hostel, month], (err, data) => {
                        const reductionDays = data[0].reductionDays || 0;
                        const finalDays = totalDaysResided - reductionDays;
                        const ratio = amount * 1.0 / finalDays;
                        db.query("insert into messbill (hostel,month,year,amount,days,perstudperday) values (?,?,?,?,?,?)", [hostel, month, year, amount, finalDays, ratio], (err, data) => {
                            if (err) console.log(err);
                            res.json({ message: "SUCCESS" });
                        });
                    });
                });
            }
        })
    })
});

app.post('/student/mess/:id', (req, res) => {
    const month = req.body.month;
    let totalDaysResided = 0;
    const year = req.body.year;
    let hostel;
    const startOfMonth = new Date(`${year}-${month}-01`);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
    db.query("select hostel,doj from student where id=?", [req.params.id], (err, data) => {
        const doj = new Date(data[0].doj);
        const daysInMonth = endOfMonth.getDate();
        let daysResided;
        hostel = data[0].hostel;
        if (doj.getFullYear() < year || (doj.getFullYear() === year && doj.getMonth() < month - 1)) {
            daysResided = daysInMonth;
        } else if (doj.getFullYear() == year && doj.getMonth() == month - 1) {
            daysResided = daysInMonth - doj.getDate() + 1;
        } else {
            daysResided = 0;
        }
        totalDaysResided += daysResided;
    });
    db.query("select sum(days) as reductionDays from reduction join student on student.id=reduction.studid where student.id=? and MONTH(`from`)=?", [req.params.id, month], (err, data) => {
        const reductionDays = data[0].reductionDays || 0;
        const finalDays = totalDaysResided - reductionDays;
        db.query("select perstudperday from messbill where hostel=? and month=? and year=?", [hostel, month, year], (err, data) => {
            if (data.length === 0)
                res.json({ message: "Error" });
            else
                res.json({ message: finalDays * data[0].perstudperday });
        });
    });
});
app.post('/student/attendance/:id', (req, res) => {
    const studentId = req.params.id;
    const month = req.body.month;
    const year = req.body.year;
    const query = `
      SELECT date
      FROM attendance
      WHERE studid = ?
        AND MONTH(date) = ?
        AND YEAR(date) = ?
    `;
    const present = [];
    const reduction = [];
    db.query(query, [studentId, month, year], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        results.forEach((result) => {
            present.push(result.date.getDate());
        })
    });
    db.query('SELECT `from`,`to` FROM reduction WHERE studid = ? AND MONTH(`from`) = ? AND YEAR(`from`) = ?', [studentId, month, year], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        results.forEach(row => {
            const { from, to } = row;
            const startDate = new Date(from);
            const endDate = new Date(to);
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                reduction.push(currentDate.getDate());
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        res.json({present:present,reduction:reduction,month:month,year:year})
    });
    
})
app.post('/student/doj/:id',(req,res)=>{
    db.query('select doj from student where id=?',[req.params.id],(err,data)=>{
        res.json({doj:data[0].doj})
    })
})
app.get('/admin/room-enable', async (req, res) => {
    db.query("select value from roomenable where id=1", (err, data) => {
        if (data[0].value == 1) {
            res.json({ message: "enabled" })
        } else {
            res.json({ message: "disabled" })
        }
    })
})
app.post('/admin/room-enable', async (req, res) => {
    db.query("update roomenable set value=? where id=1", [req.body.value], (err, data) => {
        res.json("SUCCESS");
    })
})
app.get('/student/room/:id', async (req, res) => {
    var hostel;
    db.query("select hostel from student where id=?", [req.params.id], (err, data) => {
        hostel = data[0].hostel;
    })
    db.query("select roomid from hostelstudent where studentid=?", [req.params.id], (err, data) => {
        if (data.length > 0) {
            db.query("select * from hostelvacancy where id=?", [data[0].roomid], (err, data) => {
                res.json(data[0]);
            })
        } else {
            res.json({ message: "NA", hostel: hostel })
        }
    })
})
app.post('/student/room/:id', async (req, res) => {
    const hostel = req.body.hostel;
    const room = req.body.room;
    const id = req.params.id;
    db.query("select id,vacancy from hostelvacancy where hostel=? and room=?", [hostel, room], (err, data) => {
        const roomid = data[0].id;
        if (data[0].vacancy > 0) {
            db.query("update hostelvacancy set vacancy=vacancy-1 where hostel=? and room=?", [hostel, room], (err, data) => {
                db.query("insert into hostelstudent (roomid,studentid) values (?,?)", [roomid, id], (err, data) => {
                    res.json({ message: "SUCCESS" })
                })
            })
        } else {
            res.json({ message: "NA" });
        }
    })
})
app.post('/student/apply-reduction/:id', (req, res) => {
    const user = {
        id: req.params.id,
        from: req.body.from,
        to: req.body.to,
    }
    const days = (Math.abs((new Date(req.body.from).getTime() - new Date(req.body.to).getTime()) / (1000 * 60 * 60 * 24)));
    var check;
    db.query("select * from reduction where studid=?", [user.id], (err, data) => {
        for (var i = 0; i < data.length; i++) {
            var efrom = data[i].from;
            var eto = data[i].to;
            if ((new Date(user.from) >= efrom && new Date(user.from) <= eto) || (new Date(user.to) >= efrom && new Date(user.to) <= eto) || (efrom >= new Date(user.from) && efrom <= new Date(user.to)) || (eto >= new Date(user.from) && eto <= new Date(user.to))) {
                check = false;
            }
        }
        if (check === false) {
            return res.json({ message: "AE" })
        } else {
            db.query("insert into reduction (studid,`from`,`to`,days) values (?,?,?,?)", [user.id, user.from, user.to, days + 1], (err, data) => {
                if (err) console.log(err);
                res.json({ message: "SUCCESS" })
            })
        }
    })


})
app.get("/student", (req, res) => {
    const q = "select * from student";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        else return res.json(moment(data[0].dob).utc().format('DD/MM/YYYY'));
    })
})
app.post("/admin/view-warden", (req, res) => {
    db.query("select * from warden where hostel=? and approved=1", [req.body.hostel], (err, data) => {
        res.json(data);
    })
})
app.post('/admin/view-students', async (req, res) => {
    db.query("select * from student join hostelstudent join hostelvacancy on student.id=hostelstudent.studentid and hostelstudent.roomid=hostelvacancy.id where student.hostel=? and student.approved=1", [req.body.hostel], (err, data) => {
        res.json(data);
    })
})
app.listen(8800, () => {
    console.log("Connected to Backend");
})