import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import Added from "../assets/Images/added.png";
function ZpassAdded({ advanceStep }) {
  const [form] = Form.useForm();

  return (
    <div className="d-flex flex-column justify-content-center align-item-center">
      <div className="d-flex justify-content-center flex-column align-item-center">
        <div className="text-center">
          <img
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
            src={Added}
          />
        </div>
        <div
          className="text-center my-4 font-clash font-22 "
          style={{ letterSpacing: 1 , fontFamily: "ClashGrotest", }}
        >
          <p className="">It's that easy</p>
          <p className="">Now that zPass is Added, it's</p>
          <p className="">ready to use</p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Form
            layout={"vertical"}
            form={form}
            className="form-style d-flex align-item-center justify-content-center"
          >
            <Form.Item>
              <Button
                style={{ letterSpacing: 1 , fontFamily: "ClashGrotest",}}
                onClick={() => advanceStep()}
                className="form-button font-clash"
              >
                Next
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ZpassAdded;
