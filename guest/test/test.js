const chai = require('chai');
const chaiHttp = require('chai-http');
const server=require("../guest")
chai.should(); 
chai.use(chaiHttp);
describe('Get /guest/read',()=>{
    it('it should get all data',(done)=>{
        chai.request(server)
        .get('/guest/read')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
        done();
        })
    });
    it("It should NOT GET all the tasks", (done) => {
        chai.request(server)
            .get("/guest/reads")
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });


});
describe("GET /guest/read/:id", () => {
    it("It should GET a task by ID", (done) => {
        const taskId = "60d96667c2964d313023f7db";
        chai.request(server)                
            .get("/guest/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('roomNumber');
            done();
            });
    }),
    it("It should NOT GET a task by ID", (done) => {
        const taskId = "12dfd35598458dsd9748";
        chai.request(server)                
            .get("/guest/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});
describe("POST /guest/create", () => {
    it("It should POST a new task", (done) => {
        const task = {
            roomNumber: 200,
            guests: 2,
            personal:{   name: "shiva",
                         email:"dddf@gmail.com",
                         identity:"fefeves",
                         phone:543033554
                     },
            timeline:{   timein: "shiva",
                         timeout:"dddf@gmail.com",
                         days:5
                     },
            payment:{    total: 1500,
                         paid:1000,
                         balance:500,
                     },
        };
        chai.request(server)                
            .post("/guest/create")
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            });
    });

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
 describe("PUT /guest/update/:name", () => {
    it("It should PUT an existing task", (done) => {
        const taskId = "60d96667c2964d313023f7db";
        const task = {
            roomNumber: 200,
            guests: 2,
            personal:{   name: "shiva",
                         email:"dddf@gmail.com",
                         identity:"fefeves",
                         phone:543033554
                     },
            timeline:{   timein: "shiva",
                         timeout:"dddf@gmail.com",
                         days:5
                     },
            payment:{    total: 1500,
                         paid:1000,
                         balance:500,
                     },
        };
        chai.request(server)                
            .put("/guest/update/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id').eq("60d96667c2964d313023f7db");
            done();
            });
    });

    it("It should NOT PUT ", (done) => {
        const taskId = "60d246cb6d38af4e58092e7"; //wrong
        const task = {
            roomNumber: 2000,
            guests: 2,
            personal:{   name: "shiva",
                         email: "dddf@gmail.com",
                         identity: "fefeves",
                         phone:543033554
                     },
            timeline:{   timein: "shiva",
                         timeout:"dddf@gmail.com",
                         days:5
                     },
            payment:{    total: 1500,
                         paid:1000,
                         balance:500,
                     },
        };
        chai.request(server)                
            .put("/guest/update/" + taskId)
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
describe("DELETE /guest/delete/:id", () => {
    it("It should DELETE an existing task", (done) => {
        const taskId = "60d24630e962ea4bf8befe12";
        chai.request(server)                
            .delete("/guest/delete/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });

    it("It should NOT DELETE a task that is not in the database", (done) => {
        const taskId = "60d246cbd5809fe9";//wrong
        chai.request(server)                
            .delete("/guest/delet/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});


});


