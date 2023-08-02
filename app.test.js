const request = require('supertest');

// Sample test tasks
const task = { description: "This has been Modified", taskname: 'vaibhavyadavtesting', status: "Pending" }

// Test the POST /task route
describe('POST /task', () => {
  test('should add a new task', async () => {
    const response = await request('http://localhost:5000').post('/task').send(task);
    expect(response.status).toBe(201);
    expect(response.body.task).toHaveProperty('description');
    expect(response.body.task.taskname).toBe(task.taskname);
    expect(response.body.task.status).toBe(task.status);
  });
});


// Test the GET /tasks route
describe('GET /task', () => {
  test('should return all tasks', async () => {
    const response = await request('http://localhost:5000').get(`/task?taskname=vaibhavyadavtesting`)
    expect(response.status).toBe(200)
    // expect(response.body.task.taskname).toEqual('vaibhavyadavtesting')
  });
});


// Test the PATCH /task route
describe('PATCH /task', () => {
  test('should update a task', async () => {
    const task = { taskname: "vaibhavyadavtesting", description: "This is Updated", status: "Completed" }
    const response = await request('http://localhost:5000').patch(`/task?taskname=vaibhavyadavtesting`).send(task)
    expect(response.status).toBe(200);
    expect(response.body.task).toHaveProperty('taskname');
    expect(response.body.task.status).toBe("Completed");
  });

  test('should return null if taskname is not found', async () => {
    const response = await request('http://localhost:5000').patch(`/task?taskname=vaibhavyadavtesting-notfound`);
    expect(response.body.task).toBe(null);
  });
});

// Test the DELETE /task/:id route
describe('DELETE /task', () => {
  test('should delete a task', async () => {
    const response = await request('http://localhost:5000').delete(`/task?taskname=vaibhavyadavtesting`);
    expect(response.body.message).toBe('Deletion Successful!');
    expect(response.status).toBe(200);
    expect(response.body.status.deletedCount).toBe(1);
  });

  test('should return null if taskname is not found', async () => {
    const response = await request('http://localhost:5000').delete(`/task?taskname=vaibhavyadavtesting1`);
    expect(response.body.message).toBe('Deletion Successful!');
    expect(response.body.status.deletedCount).toBe(0);
  });
});
