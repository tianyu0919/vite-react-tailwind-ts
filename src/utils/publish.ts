/*
 * @Author: 卢天宇
 * @Date: 2023-10-18 11:30:49
 * @Description: 
 */
// * 发布订阅模式
// class Publish {
//   constructor() {
//     this.events = {};
//   }

//   add(key, callback) {
//     if (!this.events[key]) {
//       this.events[key] = []
//     }
//     this.events[key].push(callback);
//   }

//   publish(key) {
//     if (!this.events[key]) return;
//     this.events[key].forEach(fun => {
//       fun();
//     })
//   }

//   remove(key, callback) {
//     if (!this.events[key]) return;
//     this.events[key].splice(this.events[key].indexOf(callback), 1);
//   }
// }

// const P = new Publish();

// function click1() {
//   console.log('click 1');
// }

// P.add('click', click1);

// P.add('click', () => {
//   console.log('click 2')
// })

// P.add('click', () => {
//   console.log('click 3')
// })

// P.add('touch', () => {
//   console.log('touch 1')
// })

// P.publish('click');

// P.remove('click', click1)

// P.publish('touch');

// P.publish('click');
