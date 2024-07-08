const Node = (data) => {
  return {
    data,
    left: null,
    right: null,
  };
};

const Tree = (array) => {
  let root = buildTree(array);

  function buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const rootNode = Node(arr[middle]);

    rootNode.left = buildTree(arr, start, middle - 1);
    rootNode.right = buildTree(arr, middle + 1, end);

    return rootNode;
  }

  function insert(value) {
    if (root === null) {
      root = Node(value);
      return;
    }
    let currentNode = root;
    let inserted = false;

    while (!inserted) {
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = Node(value);
          inserted = true;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = Node(value);
          inserted = true;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        inserted = true; // Value already exists in the tree
      }
    }
  }

  function minValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  function deleteItem(value) {
    root = deleteRec(root, value);
  }

  function deleteRec(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = deleteRec(node.left, value);
    } else if (value > node.data) {
      node.right = deleteRec(node.right, value);
    } else {
      // Node to delete found

      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.data = minValue(node.right); // Find the inorder successor

      node.right = deleteRec(node.right, node.data); // Delete the inorder successor
    }
    return node;
  }

  function find(value) {
    return findRec(root, value);
  }

  function findRec(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      return findRec(node.left, value);
    } else if (value > node.data) {
      return findRec(node.right, value);
    } else {
      return node; // Node with the value found
    }
  }

  function levelOrder(callback) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (callback) {
      result.forEach(callback);
    }

    return result;
  }

  function inOrder(callback) {
    const result = [];

    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        result.push(node.data);
        traverse(node.right);
      }
    }

    traverse(root);

    if (callback) {
      result.forEach(callback);
    }

    return result;
  }

  function preOrder(callback) {
    const result = [];

    function traverse(node) {
      if (node !== null) {
        result.push(node.data);
        traverse(node.left);
        traverse(node.right);
      }
    }

    traverse(root);

    if (callback) {
      result.forEach(callback);
    }

    return result;
  }

  function postOrder(callback) {
    const result = [];

    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        result.push(node.data);
      }
    }

    traverse(root);

    if (callback) {
      result.forEach(callback);
    }

    return result;
  }

  function height(node) {
    if (node === null) {
      return 0;
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(value) {
    return depthRec(root, value, 0);
  }

  function depthRec(node, value, currentDepth) {
    if (node === null) {
      return null;
    }

    if (node.data === value) {
      return currentDepth;
    }

    let leftDepth = depthRec(node.left, value, currentDepth + 1);
    if (leftDepth !== null) {
      return leftDepth;
    }

    let rightDepth = depthRec(node.right, value, currentDepth + 1);
    if (rightDepth !== null) {
      return rightDepth;
    }

    return null;
  }

  function isBalanced(node) {
    return checkBalance(root) !== -1;
  }

  function checkBalance(node) {
    if (node === null) {
      return 0;
    }

    let leftHeight = checkBalance(node.left);
    if (leftHeight === -1) {
      return -1;
    }

    let rightHeight = checkBalance(node.right);
    if (rightHeight === -1) {
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function rebalance() {
    const arr = inOrder();
    root = buildTree(arr);
    return root;
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};
