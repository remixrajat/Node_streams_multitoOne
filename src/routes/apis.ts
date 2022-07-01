import { Router } from "express";
import fs from "fs";
import axios from "axios";
const zlib = require("zlib");
const es = require("event-stream");
import { Readable } from "node:stream";
import { Transform, Writable } from "node:stream";
const router = Router();

router.get("/readTwo", async (req, res) => {
  // for (let i = 0; i < 5; i++) {
  //   for (let j = 0; j < 5; j++) {
  //     console.log(i, j);
  //     break;
  //   }
  // }

  try {
    const writeStream = fs.createWriteStream(
      `.././Node_Streams_New/final.json`,
      {
        flags: "a",
      }
    );

    const fileStream = new Readable({
      read() {},
    });
    const em1 = fs.createReadStream(`.././Node_Streams_New/em1.jsonl`, {
      highWaterMark: 5,
    });
    const em2 = fs.createReadStream(`.././Node_Streams_New/em2.jsonl`, {
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
      .pipe(
        new Transform({
          objectMode: true,
          transform(chunk, enc, cb) {
            // console.log(chunk.toString(), ",,,,,,,,,,,,,,,,,,");
            cb(null, chunk);
          },
        })
      )
      // .pipe(writeStream);
      .pipe(
        new Writable({
          objectMode: true,
          write(chunk, enc, cb) {
            console.log(chunk.toString(), "jjjjj");
            const writeStream = fs.createWriteStream(
              `.././Node_Streams_New/final.json`,
              {
                flags: "a",
              }
            );
            writeStream.write(chunk);
            return cb();
          },
        })
      );
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});
export default router;
