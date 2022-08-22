import LinkedListNode from './LinkedListNode';
import Comparator from '../utils/Comparator';

export default class LinkedList {
    /**
     * Constructor.
     * @param {function(a:*, b:*)} [compareFunction]
     */
    constructor(compareFunction) {

        /** @var LinkedListNode */
        this.head = null;

        /** @var LinkedListNode */
        this.tail = null;

        this.compare = new Comparator(compareFunction);
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    prepend(value) {
        // Create new node to be head.
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        // If there is no tail yet, new node is also tail.
        if (!this.tail) {
            this.tail = newNode;
        }

    return this;
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    append(value) {
        const newNode = new LinkedListNode(value);

        // if there is no head yet, new node is also head.
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
    }

    /**
     * @param {*} value
     * @param {number} index
     * @return {LinkedList}
     */
    insert(value, rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if(index === 0) {
            return this.prepend(value);
        } else {
            let count = 1;
            let currentNode = this.head;
            const newNode = new LinkedListNode(value);
            while(currentNode) {
                if(count === index) break;
                currentNode = currentNode.next;
                count++;
            }
            if(currentNode) {
                newNode.next = currentNode.next;
                currentNode.next = newNode;
            } else {
                if(this.tail) {
                    this.tail.next = newNode;
                    this.tail = newNode;
                } else {
                    this.head = newNode;
                    this.tail = newNode;
                }
            }
        }
        return this;
    }

    /**
     * @param {*} value
     * @return {LinkedListNode}
     */
    delete(value) {
        if(!this.head) {
            return null;
        }
    let deleteNode = null;
    while(this.head && this.compare.equal(this.head.value, value)) {
        deleteNode = this.head;
        this.head = this.head.next;
    }

    let currentNode = this.head;
    if(currentNode !== null) {
        while(currentNode.next) {
            if(this.compare.equal(currentNode.next.value, value)) {
                deleteNode = currentNode.next;
                currentNode.next = currentNode.next.next;
            } else {
                currentNode = currentNode.next;
            }
        }
    }

    if(this.compare.equal(this.tail.value, value)) {
        this.tail = currentNode;
    }

    return deleteNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */

    find({value = undefined, callback = undefined}) {
        if(!this.head) {
            return null;
        }
        
        let currentNode = this.head;
        while(currentNode) {
            if(callback && callback(currentNode.value)) {
                return currentNode;
            }

            if(value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteTail() {
        const deleteTail = this.tail;

        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
        
            return deleteTail;
        }

        let currentNode = this.head;
        while(currentNode.next) {
            if(!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deleteTail;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteHead() {
        if(!this.head) {
            return null;
        }

        const deleteHead = this.head;
        if(this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deleteHead;
    }

    /**
     * @param {*[]} values - Array of values that need to be converted to linked list.
     * @return {LinkedList}
     */
    fromArray(values) {
        values.forEach(value => this.append(value));

        return this;
    }

    /**
     * @return {LinkedListNode[]}
     */
    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    /**
     * Reverse the linked list.
     * @return {LinkedList}
     */
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currNode) {
            nextNode = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;
            currNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}