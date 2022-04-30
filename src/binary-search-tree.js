const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      this._insertNode(this.rootNode, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  _search(node, data) {
    if (!node) {
      return null;
    } else if (data < node.data) {
      return this._search(node.left, data);
    } else if (data > node.data) {
      return this._search(node.right, data);
    } else {
      return node;
    }
  }

  has(data) {
    return !!this._search(this.rootNode, data);
  }

  find(data) {
    return this._search(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, key) {
    if (!node) return null;
    else if (key < node.data) {
      node.left = this._removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this._removeNode(node.right, key);
      return node;
    } else {
      if (!node.left && !node.right) {
        node = null;
        return node;
      }

      if (!node.left) {
        node = node.right;
        return node;
      } else if (!node.right) {
        node = node.left;
        return node;
      }

      let aux = this._findMin(node.right);
      node.data = aux.data;
      node.right = this._removeNode(node.right, aux.data);
      return node;
    }

  }

  min() {
    return this._findMin(this.rootNode).data;
  }

  _findMin(node = this.rootNode) {
    if (!node.left)
      return node;
    else
      return this._findMin(node.left);

  }

  max(node = this.rootNode) {
    if (!node.right)
      return node.data;
    else
      return this.max(node.right);
  }
}

module.exports = {
  BinarySearchTree
};