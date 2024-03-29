const todoData = JSON.parse(`[{
  "id": 6903,
  "todo": "Ut corrupti eum. Magnam culpa et itaque voluptas maiores et sed molestiae ad. Ut earum est tempore enim odio hic architecto et iure. Qui dolore velit illo velit atque reprehenderit sed cupiditate.",
  "createTime": "2018-02-21T15:52:07.773Z",
  "lastTimeStarted": [
    "2018-02-21T15:52:07.773Z"
  ],
  "lastTimeStopped": [
    "2018-02-21T15:58:07.773Z"
  ],
  "remainingTime": 0
}, {
  "id": 47977,
  "todo": "Eos quas doloremque iste aut. Harum doloribus atque. Natus quis odio eaque ea. Ut recusandae occaecati. Consequuntur deleniti qui perspiciatis veniam ut.",
  "createTime": "2018-02-25T06:09:38.506Z",
  "lastTimeStarted": [
    "2018-02-25T06:09:48.506Z"
  ],
  "lastTimeStopped": [
    "2018-02-25T06:09:58.506Z"
  ],
  "remainingTime": 1000000
}, {
  "id": 81193,
  "todo": "Est quod in vel. Consequatur consequatur ipsa. Odio ea repellat aut quibusdam autem quibusdam. Ad ea quo in.",
  "createTime": "2018-02-25T03:59:20.370Z",
  "lastTimeStarted": [
    "2018-02-25T03:59:30.370Z"
  ],
  "lastTimeStopped": [],
  "remainingTime": 1500000
}, {
  "id": 23485,
  "todo": "Omnis non iste. Delectus omnis quaerat dicta in aut. Id velit est aliquid ut voluptas eligendi numquam.",
  "createTime": "2018-02-24T04:40:50.001Z",
  "lastTimeStarted": [
    "2018-02-24T04:40:50.001Z"
  ],
  "lastTimeStopped": [
    "2018-02-24T04:42:50.001Z"
  ],
  "remainingTime": 7500
}, {
  "id": 61833,
  "todo": "Exercitationem qui quia. Laborum suscipit qui voluptatum suscipit est accusamus. Placeat illo dolorem placeat totam.",
  "createTime": "2018-02-24T00:51:31.881Z",
  "lastTimeStarted": [],
  "lastTimeStopped": [],
  "remainingTime": 1500000
}]`);

class fakeData {
  constructor(size = 10, colorLength = 4){
    this.size = size ;
    this.datas = [];
    this.colorLength = colorLength;
  }
  dataModel(index) {
    // return {
    //   id: faker.random.number() ,
    //   todo: faker.lorem.paragraph(),
    //   createTime: faker.date.past(),
    //   color: faker.random.number(this.colorLength - 1),
    //   completed: faker.random.boolean(),
    // }
    return todoData[index];
  }
  getObjectAt(index) {
    if (index < 0 || index > this.size){
      return undefined;
    }
    if (this.datas[index] === undefined) {
      this.datas[index] = this.dataModel(index);
    }
    return this.datas[index];
  }
  getAll() {
    if (this.datas.length < this.size) {
      for (let i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this.datas.slice();
  }

  getSize() {
    return this.size;
  }
}
export default fakeData;

