# Balanced Binary Search Tree

## Description

A balanced binary search tree (BST) is a data structure where each node has at most two child nodes, and the heights of the left and right subtrees of any node differ by at most one. This ensures efficient search, insertion, and deletion operations. Popular types include AVL trees and Red-Black trees, and they're used to implement efficient data structures like sets, maps, and dictionaries.

## Tree Properties and Methods

**Properties:**

- `root` root pointer of the tree.

**Methods:**

- `buildTree` Build tree based on input array that saved to the `root` pointer
- `insert(data)` insert `data` (should integer) to the tree
- `delete(data)` delete the node that match the given value (integer)
- `findMinNode` find the minimum data value of the node and all subnodes
- `find` returns the node that matched the given value.
- `levelOrder(func) ` traverse the tree in breadth-first level order and provide each node as the argument to the provided function
- `inorder(func)` traverse the tree in breadth-first level order using in-order traversal and provide each node as the argument to the provided function if given
- `preorder(func)` traverse the tree in breadth-first level order using preorder traversal and provide each node as the argument to the provided function
- `postorder(func)` traverse the tree in breadth-first level order using postorder traversal and provide each node as the argument to the provided function
- `height(node)` return node height. Height is defined as the number of edges in longest path from a given node to a leaf node.
- `depth(node)` return the node depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.
- `isBalanced` check is the tree balance or not.

- `rebalance` rebalance the tree
- `prettyPrint` print the prettied tree to the console
