import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import Hand from "../assets/Images/hand.png";
function Age({ advanceStep }) {
    const [form] = Form.useForm();

    return (
        <div className="d-flex flex-column justify-content-center align-item-center">
            <div className="d-flex justify-content-center flex-column align-item-center">
                <div className="text-center">
                    <img
                        width={50}
                        height={50}
                        style={{ objectFit: "contain" }}
                        src={Hand}
                    />
                </div>
                <div
                    style={{ color: "#808080", fontSize: "30px" }}
                    className="text-center my-4 fw-bold font-clash "
                >
                    <p className="fw-bolder ">FortBlox is requesting</p>
                    <p className="fw-bolder">Age Verification:</p>
                    <p className="fw-bolder">“Age below 16”</p>
                    {/* FortBlox is requesting Age Verification: “Age below 16” */}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <Form layout={"vertical"} form={form} className="form-style">
                        <Form.Item className="d-flex align-item-center justify-content-center">
                            <Button
                                onClick={() => advanceStep()}
                                className="form-button font-clash"
                            >
                                Approve
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Age;
