"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const zlib = require("zlib");
const es = require("event-stream");
const node_stream_1 = require("node:stream");
const node_stream_2 = require("node:stream");
const router = (0, express_1.Router)();
router.get("/readTwo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // for (let i = 0; i < 5; i++) {
    //   for (let j = 0; j < 5; j++) {
    //     console.log(i, j);
    //     break;
    //   }
    // }
    try {
        const writeStream = fs_1.default.createWriteStream(`.././Node_Streams_New/final.json`, {
            flags: "a",
        });
        const fileStream = new node_stream_1.Readable({
            read() { },
        });
        const em1 = fs_1.default.createReadStream(`.././Node_Streams_New/em1.jsonl`, {
            highWaterMark: 5,
        });
        const em2 = fs_1.default.createReadStream(`.././Node_Streams_New/em2.jsonl`, {
            highWaterMark: 5,
        });
        em1.on("data", (data) => {
            // console.log(data.toString(), "1");
            fileStream.push(data.toString());
            em1.pause();
        });
        em2.on("data", (data) => {
            // console.log(data.toString(), "2");
            fileStream.push(data.toString());
            em1.resume();
        });
        // async function processLineByLine() {
        //   const rl = readline.createInterface({
        //     input: em1,
        //     crlfDelay: Infinity,
        //   });
        //   const rl2 = readline.createInterface({
        //     input: em2,
        //     crlfDelay: Infinity,
        //   });
        //   let i = 0,
        //     j = 0;
        //   let x = 1;
        //   let line1 = "";
        //   let line2 = "";
        //   let secondLine: any;
        //   rl.on("line", (line: any) => {
        //     console.log(line, "1");
        //     rl.pause();
        //   });
        //   rl2.on("line", (line: any) => {
        //     console.log(line, "2");
        //     // rl.resume();
        //   });
        //   // console.log(JSON.stringify(rl));
        //   // async function loop1() {
        //   //   for await (const line of rl) {
        //   //     // await fileStream.push(line + "\n");
        //   //     await console.log(line, "loop1");
        //   //   }
        //   // }
        //   // async function loop2() {
        //   //   for await (const lined of rl2) {
        //   //     // await fileStream.push(lined + "\n");
        //   //     await console.log(lined, "loop2");
        //   //   }
        //   // }
        //   // loop1();
        //   // loop2();
        //   // async function loop1() {
        //   //   for (var i = 10; i < 20; i++) {
        //   //     console.log(i);
        //   //   }
        //   // }
        //   // async function loop2() {
        //   //   for (var i = 0; i < 10; i++) {
        //   //     console.log(i);
        //   //   }
        //   // }
        //   // loop1();
        //   // loop2();
        //   // fileStream.push(null);
        // }
        // processLineByLine();
        // em1.pipe(new Transform({})).pipe(writeStream);
        // em2.pipe(writeStream);
        fileStream
            .pipe(new node_stream_2.Transform({
            objectMode: true,
            transform(chunk, enc, cb) {
                // console.log(chunk.toString(), ",,,,,,,,,,,,,,,,,,");
                cb(null, chunk);
            },
        }))
            // .pipe(writeStream);
            .pipe(new node_stream_2.Writable({
            objectMode: true,
            write(chunk, enc, cb) {
                console.log(chunk.toString(), "jjjjj");
                const writeStream = fs_1.default.createWriteStream(`.././Node_Streams_New/final.json`, {
                    flags: "a",
                });
                writeStream.write(chunk);
                return cb();
            },
        }));
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}));
exports.default = router;
