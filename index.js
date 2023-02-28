import Tree from './Tree.js';

const generateRandomNumber = (start = 0, end = 100) => {
  return Math.ceil(Math.random() * (end - start)) + start;
};

const generateArrayofRandomNumber = (length, start = 0, end = 100) => {
  let i = 0;
  let arr = [];
  while (i < length) {
    arr.push(generateRandomNumber(start, end));
    i++;
  }
  return arr;
};

const arr = generateArrayofRandomNumber(7, 0, 20);

// driver
const tree = new Tree(arr);
tree.prettyPrint();
console.log({
  isBalanced: tree.isBalanced(),
  inorder: tree.inorder(),
  preorder: tree.preorder(),
  postorder: tree.postorder(),
});
console.log('==========');

console.log('insert some values to test balanceness');
tree.insert(299);
tree.insert(444);
tree.insert(499);
tree.prettyPrint();
console.log({
  isBalanced: tree.isBalanced(),
});
console.log('==========');

tree.rebalance();
console.log('rebalance...');
tree.prettyPrint();
console.log({
  isBalanced: tree.isBalanced(),
  inorder: tree.inorder(),
  preorder: tree.preorder(),
  postorder: tree.postorder(),
});
