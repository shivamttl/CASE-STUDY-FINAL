const chai = require('chai');
const chaiHttp = require('chai-http');
const server=require("../app")
chai.should(); 
chai.use(chaiHttp);
describe('Get /showusers',()=>{
    it('it should get all data',(done)=>{
        chai.request(server)
        .get('/showusers')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    });
    it("It should NOT GET all the tasks", (done) => {
        chai.request(server)
            .get("/showuser")
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });


});
describe("GET /showuser/:id", () => {
    it("It should GET a task by ID", (done) => {
        const taskId = "60ce45b77c1d7241889dcdfe";
        chai.request(server)                
            .get("/showuser/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
             
            done();
            });
    }),
    it("It should NOT GET a task by ID", (done) => {
        const taskId = "125748";
        chai.request(server)                
            .get("/showuser" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});
describe("POST /createuser", () => {
    // it("It should POST a new task", (done) => {
        const task = {
            email: "task@gmail.com",
            password:"fdfdf",
            role: "owner",
        };
    //     chai.request(server)                
    //         .post("/createuser")
    //         .send(task)
    //         .end((err, response) => {
    //             response.should.have.status(200);
    //             response.body.should.be.a('object');
    //             response.body.should.have.property('name').eq("Task 4");
    //         done();
    //         });
    // });

    it("It should NOT POST a new task without the name property", (done) => {
        const task = {
            completed: false
        };
        chai.request(server)                
            .post("/create")
            .send(task)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });
/**
     * Test the PUT route
     */
 describe("PUT /update/:name", () => {
    it("It should PUT an existing task", (done) => {
        const taskId = "60ce4a6011dacf0eac2de35f";
        const task = {
            email: "task@gmail.com",
            password:"fdfdf",
            role: "owner",
        };
        chai.request(server)                
            .put("/update/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            });
    });

    it("It should NOT PUT ", (done) => {
        const taskId = "60d7";
        const task = {
            email: "task@gmail.com",
            password:"fdfdf",
            role: "owner",
        };
        chai.request(server)                
            .put("/updat/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });        
});



/**
 * Test the DELETE route
 */
describe("DELETE /delete/:id", () => {
    it("It should DELETE an existing task", (done) => {
        const taskId = "60d24630e962ea4bf8befe12";
        chai.request(server)                
            .delete("/delete/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });

    it("It should NOT DELETE a task that is not in the database", (done) => {
        const taskId = "60d24";
        chai.request(server)                
            .delete("/delet/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});


});


