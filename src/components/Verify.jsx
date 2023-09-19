import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import Move from "../assets/Images/move.png";
function Verify({ advanceStep }) {
  const [form] = Form.useForm();

  return (
    <div className="d-flex flex-column justify-content-center align-item-center">
      <div className="d-flex justify-content-center flex-column align-item-center">
        <div className="d-flex align-items-center justify-content-center">
          <Form
            layout={"vertical"}
            form={form}
            className="form-style d-flex align-item-center justify-content-center"
          >
            <Form.Item>
              <Button onClick={() => advanceStep()}  className="form-button font-clash mt-4" style={{ fontFamily: "ClashGrotest",}}>
               Verify with zPass
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
