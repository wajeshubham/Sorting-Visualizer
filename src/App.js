import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import { Button, Col, Container, Row } from "reactstrap";
import { Select } from "antd";

import { wait } from "@testing-library/react";

const App = () => {
  const [lst, setLst] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState("1");

  const { Option } = Select;

  const handleChange = (value) => {
    setSpeed(value);
  };

  const insertionSort = () => {
    setIsSorting(true);
    let x = speed === "1" ? 30 : speed === "1.5" ? 20 : 10;

    let array = Array.from(lst);
    let sorted = Array.from(lst).sort();
    let current;
    for (let i = 1; i < array.length; i++) {
      setTimeout(() => {
        current = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > current) {
          array[j + 1] = array[j];

          //animation part
          let bar1 = document.getElementById(`${current}`);
          let bar2 = document.getElementById(`${j + 1}`);
          let bar3 = document.getElementById(`${0}`);
          bar1.style.backgroundColor = "red";
          bar1.style.height = `${array[current] * 6 + 30}px`;
          bar2.style.height = `${array[j + 1] * 6 + 30}px`;
          bar3.style.height = `${array[0] * 6 + 30}px`;
          wait(() => {
            bar1.style.backgroundColor = "lightseagreen";
            bar2.style.backgroundColor = "lightseagreen";
          }, x);
          j--;
        }
        array[j + 1] = current;
      }, (i + 1) * x);
      setTimeout(() => {
        setIsSorting(false);
      }, array.length * x);

      setLst(array);
    }
  };

  const bubbleSort = () => {
    setIsSorting(true);
    let x = speed === "1" ? 0.5 : speed === "1.5" ? 0.05 : 0.005;
    let temp;
    var list = Array.from(lst);
    let sorted = Array.from(lst).sort;
    var s = 1;
    for (let i = list.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        setTimeout(() => {
          if (list[j] > list[j + 1]) {
            temp = list[j];
            list[j] = list[j + 1];
            list[j + 1] = temp;

            //animation part
            let bar1 = document.getElementById(`${j}`);
            let bar2 = document.getElementById(`${j + 1}`);
            let bar3 = document.getElementById(`${0}`);
            bar3.style.backgroundColor = "black";
            bar1.style.height = `${list[j] * 6 + 30}px`;
            bar2.style.height = `${list[j + 1] * 6 + 30}px`;
          }

          let bar3 = document.getElementById(`${i}`);
          bar3.style.backgroundColor = "black";
        }, (s + 1) * x);
        s++;
      }
    }
    setTimeout(() => {
      setIsSorting(false);
    }, (s + 1) * x);

    setLst(list);
  };

  const selectionSort = () => {
    setIsSorting(true);
    let x = speed === "1" ? 50 : speed === "1.5" ? 20 : 10;
    let temp;
    let minPos;
    var list = Array.from(lst);
    for (let i = 0; i < list.length; i++) {
      setTimeout(() => {
        minPos = i;

        for (let j = i; j < list.length; j++) {
          if (list[minPos] > list[j]) {
            minPos = j;
          }
        }
        temp = list[i];
        list[i] = list[minPos];
        list[minPos] = temp;

        //animation part
        let bar1 = document.getElementById(`${minPos}`);
        let bar2 = document.getElementById(`${i}`);
        bar1.style.backgroundColor = "red";
        bar2.style.backgroundColor = "red";
        bar1.style.height = `${list[minPos] * 6 + 30}px`;
        bar2.style.height = `${list[i] * 6 + 30}px`;
        wait(() => {
          bar1.style.backgroundColor = "lightseagreen";
          bar2.style.backgroundColor = "black";
        }, (i + 1) * x);
      }, (i + 1) * x);
    }
    setTimeout(() => {
      setIsSorting(false);
    }, list.length * x);

    setLst(list);
  };

  const resetArray = () => {
    let newLst = [];
    for (let i = 0; i < 370; i++) {
      newLst.push(Math.floor(Math.random() * 100 + 1));

      let arr = document.getElementById(`${i}`);
      if (arr) {
        arr.style.backgroundColor = "lightseagreen";
      }
    }
    setLst(newLst);
  };

  useEffect(() => {
    resetArray();
  }, []);

  return (
    <div className="array-cont">
      {lst.map((item, i) => (
        <div
          key={i}
          id={i}
          className="array-bar"
          style={{ height: item * 6 + 30, backgroundColor: "lightseagreen" }}
        ></div>
      ))}
      <br></br>
      <Row>
        <div class="btn-cont">
          <Button
            className="btn-info btn-sm text-white mt-4 ml-4"
            onClick={insertionSort}
            disabled={isSorting}
          >
            Insertion Sort
          </Button>
          <Button
            className="btn-success btn-sm text-white mt-4 ml-4"
            onClick={selectionSort}
            disabled={isSorting}
          >
            Selection Sort
          </Button>
          <Button
            className="btn-primary btn-sm text-white mt-4 ml-4"
            onClick={resetArray}
            disabled={isSorting}
          >
            Reset Pattern
          </Button>
          <Button
            className="btn-danger btn-sm text-white mt-4 ml-4"
            onClick={bubbleSort}
            disabled={isSorting}
          >
            Bubble Sort
          </Button>
          <a
            href="/"
            className="btn btn-secondary text-sm text-white mt-4 ml-4 pt-2"
          >
            Reload
          </a>
        </div>
        <Col className="speed-col">
          <div className="speed-cont">
            <span style={{ fontWeight: 500 }}>Set speed: </span>
            <Select
              disabled={isSorting}
              defaultValue="1"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="1">1x</Option>
              <Option value="1.5">1.5x</Option>

              <Option value="2">2x</Option>
            </Select>

            <a
              style={{
                float: "right",
                color: "blue",
                textDecoration: "underline",
              }}
              href="https://github.com/wajeshubham/Sorting-Visualizer"
            >
              click here for source code
            </a>
            <p
              className="mr-2 text-sm"
              style={{
                float: "right",
                color: "grey",
                fontSize: "14px",
                fontStyle: "italic",
              }}
            >
              (Only compatible with laptop/desktop)
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
