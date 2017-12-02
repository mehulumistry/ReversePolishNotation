//import * as Collections from 'typescript-collections';

const Collections = require("typescript-collections");
let readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let evals = new Collections.Stack();
let opstack = new Collections.Stack();
let postQ = new Collections.Queue();
let infixQ = new Collections.Queue();
let arr:any;
startCalculator();
function startCalculator() {
    rl.question("Enter Infix Expression with spaces: ", (infix:string) => {
        arr = infix.split(" ");
        conversion();
        result();
    });
}
function conversion() {
    for (let i = 0; i < arr.length; i++) {
        if (+arr[i]) {
            if (+arr[i] < 0) {
                console.log("Number is negative , Calculate again");
                startCalculator();
            }
            infixQ.enqueue(+arr[i]);
        }
        else {
            infixQ.enqueue(arr[i]);
        }
    }
    let ti;
    while (!infixQ.isEmpty()) {
        ti = infixQ.peek();
        infixQ.dequeue();
        if (typeof ti === "number") {
            postQ.enqueue(ti);
        }
        else if (opstack.isEmpty()) {
            opstack.push(ti);
        }
        else if (ti == '(') {
            opstack.push(ti);
        }
        else if (ti == ')') {
            while (opstack.peek() != '(') {
                postQ.enqueue(opstack.peek());
                opstack.pop();
            }
            opstack.pop();
        }
        else {
            while (!opstack.isEmpty() && opstack.peek() != '(' && precedence(ti) <= precedence(opstack.peek())) {
                postQ.enqueue(opstack.peek());
                opstack.pop();
            }
            opstack.push(ti);
        }
    }
    while (!opstack.isEmpty()) {
        postQ.enqueue(opstack.peek());
        opstack.pop();
    }
}
function result() {
    let topNum;
    let nextNum;
    let answer;
    let t;
    while (!postQ.isEmpty()) {
        t = postQ.peek();
        console.log(t);
        postQ.dequeue();
        if (typeof t == "number") {
            evals.push(t);
        }
        else {
            topNum = evals.peek();
            evals.pop();
            nextNum = evals.peek();
            evals.pop();
        }
        switch (t) {
            case '+':
                answer = nextNum + topNum;
                break;
            case '-':
                answer = nextNum - topNum;
                break;
            case '*':
                answer = nextNum * topNum;
                break;
            case '/':
                answer = nextNum / topNum;
                break;
            case 'POW':
                answer = Math.pow(nextNum, topNum);
        }
        evals.push(answer);
    }
    console.log(evals.peek());
    rl.question("1. Calculate Again \n2. Quit: \n", (ans:number) => {
        if (ans == 1) {
            startCalculator();
        }
        else {
            process.exit();
        }
    });
}
function precedence(value:string) : number {

    switch (value) {
        case '+':
            return 0;
           
        case '-':
            return 0;
           
        case '*':
           return 1;
        case '/':
            return 1;
        case 'POW':
            return 2;
    }
    // let ar = ['-', '+', '*', '/', 'POW'];
    // for (let t = 0; t < ar.length; t++) {
    //     if (ar[t] == value) {
    //         return t;
    //     }
    // }
}