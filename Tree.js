import Node from './Node.js';
import mergeSort from './mergeSort.js';
class Tree {
  constructor(arr) {
    this.root = this.root ? this.root : this.buildTree(arr);
  }

  /**
   * Build tree based on input array that saved to the root pointer
   * @access public
   * @param {Array} arr
   * @returns {Node} root of the tree
   */
  buildTree(arr = this.arr) {
    // sort and remove duplication
    const noDuplicateArr = Array.from(new Set(arr));
    const sortedArr = mergeSort(noDuplicateArr);

    const tree = this.#sortedArrayToBST(sortedArr, 0, sortedArr.length - 1);
    this.root = tree;
    return tree;
  }

  /**
   * create tree
   * @access private
   * @param {array} arr sorted array
   * @param {number} start start index
   * @param {number} end end index
   * @returns {Node} return the root pointer
   */
  #sortedArrayToBST(arr, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.#sortedArrayToBST(arr, start, mid - 1);
    node.right = this.#sortedArrayToBST(arr, mid + 1, end);
    return node;
  }

  /**
   *  insert data (should integer) to the tree
   * @access public
   * @param {number} data
   */
  insert(data) {
    this.root = this.#insertRec(this.root, data);
  }

  /**
   *  Insert data to the leaf of the tree.
   * @access private
   * @param {Node} root - root node
   * @param {number} data - integer
   * @returns {Node} - return the tree after insertion
   */
  #insertRec(root, data) {
    // add node to leaf
    if (root == null) {
      root = new Node(data);
      return root;
    }
    if (data > root.data) {
      root.right = this.#insertRec(root.right, data);
    } else if (data < root.data) {
      root.left = this.#insertRec(root.left, data);
    }

    return root;
  }

  /**
   * delete the node that match the given value (integer)
   * @access public
   * @param {*} data
   */
  delete(data) {
    this.root = this.#deleteRec(data);
  }

  /**
   * delete the node that match the given value
   * @access private
   * @param {*} data
   * @param {Node} currentNode - current node object
   */
  #deleteRec(data, currentNode = this.root) {
    // if the node is null
    if (currentNode === null) {
      return null;
    }

    // traversing
    if (data > currentNode.data) {
      currentNode.right = this.#deleteRec(data, currentNode.right);
      return currentNode;
    } else if (data < currentNode.data) {
      currentNode.left = this.#deleteRec(data, currentNode.left);
      return currentNode;
    } else if (data === currentNode.data) {
      // if the node is a leaf or
      // if the node has one child
      if (currentNode.left === null) {
        currentNode = currentNode.right;
      } else if (currentNode.right === null) {
        currentNode = currentNode.left;
      } else {
        // if the node has two child
        // replace the value
        const minRightNode = this.findMinNode(currentNode.right);
        currentNode.data = minRightNode.data;
        // delete the replacer
        currentNode.right = this.#deleteRec(
          minRightNode.data,
          currentNode.right
        );
      }
      return currentNode;
    }
  }

  /**
   * find the minimum data value of the node and all subnodes
   * @param {Node|object} root Node object
   * @returns node object
   */
  findMinNode(root = this.root) {
    let node = root;
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /**
   * returns the node that matched the given value.
   * @param {*} data value to be searched
   * @returns {Node} root object
   */
  find(data) {
    return this.#findRec(data);
  }

  /**
   * returns the node with the given value.
   * @param {*} data value to be searched
   * @param {Node} root node object
   * @returns {Node} node object
   */
  #findRec(data, root = this.root) {
    if (root === null) {
      return null;
    }

    if (data > root.data) {
      return this.#findRec(data, root.right);
    } else if (data < root.data) {
      return this.#findRec(data, root.left);
    } else if (root.data === data) {
      return root;
    }
  }

  /**
   * traverse the tree in breadth-first level order and use each node as
   * the argument to the provided function if given
   * @access public
   * @param {function} func function that will invoke in each node
   * @returns {array} returns array of returned value of function given. or array of node value if the function not provided.
   */
  levelOrder(func) {
    const queue = [this.root];
    const output = [];

    while (queue.length) {
      const node = queue.shift();
      typeof func === 'function'
        ? output.push(func(node))
        : output.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return output;
  }

  /**
   * traverse the tree in breadth-first level order using in-order traversal and provide each node as the argument to the provided function if given
   * @access public
   * @param {function} func - function
   * @returns {array} array
   */
  inorder(func) {
    return this.#inorderRec(func);
  }

  /**
   * traverse the tree in breadth-first level order and provide each node as the argument to the provided function
   * @access private
   * @param {function} func - function
   * @param {Node} root - node object
   * @returns {array}
   */
  #inorderRec(func, root = this.root) {
    if (root == null) return [];
    let output = [];

    // left
    output = [...output, ...this.#inorderRec(func, root.left)];

    // read
    let data = root.data;
    if (typeof func === 'function') data = func(root);
    output = [...output, data];

    output = [...output, ...this.#inorderRec(func, root.right)];
    return output;
  }

  /**
   * traverse the tree in breadth-first level order using preorder traversal and provide each node as the argument to the provided function
   * @access public
   * @param {function} func - function
   * @returns {array} array
   */
  preorder(func) {
    return this.#preorderRec(func);
  }

  /**
   * traverse the tree in breadth-first level order using preorder traversal and provide each node as the argument to the provided function
   * @access private
   * @param {function} func - function
   * @param {Node} root - node object
   * @returns {array}
   */
  #preorderRec(func, root = this.root) {
    if (root == null) return [];
    let output = [];

    let data = root.data;
    if (typeof func === 'function') data = func(root);
    output = [...output, data];

    output = [...output, ...this.#preorderRec(func, root.left)];
    output = [...output, ...this.#preorderRec(func, root.right)];

    return output;
  }

  /**
   * traverse the tree in breadth-first level order using postorder traversal and provide each node as the argument to the provided function
   * @access public
   * @param {function} func - function
   * @returns {array} array
   */
  postorder(func) {
    return this.#postorderRec(func);
  }

  /**
   * traverse the tree in breadth-first level order using postorder traversal and provide each node as the argument to the provided function
   * @access private
   * @param {function} func - function
   * @param {Node} root - node object
   * @returns {array}
   */
  #postorderRec(func, root = this.root) {
    if (root == null) return [];
    let output = [];

    output = [...output, ...this.#postorderRec(func, root.left)];
    output = [...output, ...this.#postorderRec(func, root.right)];

    let data = root.data;
    if (typeof func === 'function') data = func(root);
    output = [...output, data];

    return output;
  }

  /**
   *
   * Height is defined as the number of edges in longest path from a given node to a leaf node.
   * @param {Node|object} node
   * @returns {number} returns node height.
   */
  height(node = this.root) {
    if (node === null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /**
   * Depth is defined as the number of edges in path from a given node to the tree’s root node.
   * @param {Node|object} node
   * @returns {number} return node the depth
   */
  depth(node) {
    let queue = [this.root];
    let tempQueue = [];
    let level = 0;

    while (queue.length) {
      const currentNode = queue.shift();
      if (node === currentNode) break;

      if (currentNode.left) tempQueue.push(currentNode.left);
      if (currentNode.right) tempQueue.push(currentNode.right);

      if (!queue.length && tempQueue.length) {
        level++;
        queue = tempQueue;
        tempQueue = [];
      }
    }
    return level;
  }

  /**
   * check is the tree balance or not.
   * @access public
   * @returns {boolean} true if balanced and false if isn't
   */
  isBalanced() {
    const root = this.root;
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    const difference = Math.abs(leftHeight - rightHeight);
    return !(difference > 1);
  }
  /**
   * rebalance the tree
   * @access public
   */
  rebalance() {
    const arr = this.inorder();
    this.buildTree(arr);
  }

  /**
   * print the prettied tree to the console
   * @access public
   */
  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

export default Tree;
