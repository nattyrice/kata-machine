export default class SinglyLinkedList<T> {
    item: T | undefined;
    length: number;

    private next: SinglyLinkedList<T> | undefined;
    private head: SinglyLinkedList<T> | undefined;
    private tail: SinglyLinkedList<T> | undefined;

    constructor(item?: T, next?: SinglyLinkedList<T> | undefined) {
        this.length = 0;
        this.item = item;
        this.next = next;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx > this.length - 1) {
            undefined;
        }
        if (idx === 0) {
            return this.head?.item;
        }
        if (idx === this.length - 1) {
            return this.tail?.item;
        }

        let item = this.traverseTo(idx)?.item;
        return item;
    }

    prepend(item: T): void {
        this.length += 1;

        if (!this.head) {
            this.head = this.tail = new SinglyLinkedList(item);
            return;
        }
        let node: SinglyLinkedList<T> | undefined = this.head;
        this.head = new SinglyLinkedList(item, node);
    }
    append(item: T): void {
        this.length += 1;

        if (!this.tail || !this.head) {
            this.head = this.tail = new SinglyLinkedList(item);
            return;
        }

        this.tail.next = new SinglyLinkedList(item);
        this.tail = this.tail.next;
        return;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
            return;
        }
        if (idx === this.length) {
            this.append(item);
            return;
        }

        let prevNode = this.traverseTo(idx - 1);
        if (!prevNode) {
            return;
        }

        let nextNode = prevNode?.next;
        prevNode.next = new SinglyLinkedList(item, nextNode);
        this.length += 1;
        return;
    }
    remove(item: T): T | undefined {
        if (this.length === 0) {
            return undefined;
        } else if (this.length === 1 || this.head?.item == item) {
            return this.pop_front(); //pop_front() should adjust head/tail
        }

        let prevNode: SinglyLinkedList<T> | undefined = this.head;
        let currNode: SinglyLinkedList<T> | undefined = prevNode?.next;
        let nextNode: SinglyLinkedList<T> | undefined = currNode?.next;

        while (currNode) {
            if (currNode.item === item) {
                if (currNode === this.tail) {
                    this.tail = prevNode;
                }

                if (!prevNode) {
                    // this should never happen
                    // assert or throw an exception
                    return undefined;
                }

                prevNode.next = nextNode;
                return currNode.item;
            }

            //Traverse to next node
            prevNode = currNode;
            currNode = prevNode?.next;
            nextNode = currNode?.next;
        }
        return undefined;
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) {
            return;
        }
        if (idx === 0) {
            return this.pop_front();
        }
        if (idx === this.length - 1) {
            return this.pop_back();
        }

        let prevNode = this.traverseTo(idx - 1);
        let removed = prevNode?.next;
        if (prevNode) {
            prevNode.next = removed?.next;
        }
        this.length -= 1;

        return removed?.item;
    }

    pop_front(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        let popped: SinglyLinkedList<T> | undefined = this.head;
        this.head = popped?.next;
        this.length -= 1;
        if (this.length === 0) {
            this.head = this.tail = undefined;
        }
        return popped?.item;
    }
    pop_back(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        if (this.length === 1) {
            this.head = this.tail = undefined;
        } else {
            // since this is a singly linked list
            // I have to retraverse to the new end to find the new tail
            this.tail = this.traverseTo(this.length - 2);
            if (!this.tail) {
                // this should never happen
                // assert or throw an exception
                return undefined;
            }
            this.tail.next = undefined;
        }

        this.length -= 1;
        let popped: SinglyLinkedList<T> | undefined = this.tail;
        return popped?.item;
    }

    private traverseTo(idx: number): SinglyLinkedList<T> | undefined {
        if (idx < 0 || idx >= this.length) {
            return; //invalid range  -  throw error??
        }
        let node: SinglyLinkedList<T> | undefined = this.head;
        let i = 0;
        for (; i < idx && node?.next; ++i) {
            node = node?.next;
        }
        if (i !== idx) return undefined;
        return node;
    }
}
