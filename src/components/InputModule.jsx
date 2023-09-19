import React, { useEffect, useRef } from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { useAleoWASM } from "../aleo-wasm-hook";

function InputModule({ advanceStep, setIssuer, setSignature, setExpiration, setSubject, setDob, account, setAccount, generateAccount }) {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values)
        console.log(form.getFieldValue("signature"))
        console.log({ form })
        setIssuer(values?.issuer);
        setExpiration("01/01/2030");
        setSubject(values?.holder)
        setDob(values?.dateOfBirth)
        advanceStep();


    };
    const signString = (str) => {
        console.log("generate called12")
        if (!str || !account) return;
        console.log("generate called1212")

        return account.sign(str);
    };
    const generateSignature = (issuer, dob, holder) => {
        console.log("generate called")
        const str = `${holder}${issuer}${dob}${"01/01/2030"}2023field21field`;

        const generatedSignature = signString(str);
        console.log("genetrated", generatedSignature)
        form?.setFieldValue("signature", generatedSignature?.to_string())
        setSignature(generatedSignature.to_string())
    };







    const handleFormChange = (changedValues, allValues) => {
        console.log({ changedValues }, { allValues }, allValues?.issuer)
        if (allValues?.issuer && allValues?.dateOfBirth && allValues?.holder) {
            console.log("yes inner")
            generateSignature(allValues?.issuer, allValues?.dateOfBirth, allValues?.holder)
        }

    };

    return (
        <div style={{fontFamily: "ClashGrotest"}} className="input-card-style d-flex flex-column justify-content-center align-item-center">
            <div className="title-style text-center">ZPass Issuer</div>
            <div className="d-flex justify-content-center align-item-center p-0">
                <Form

                    layout={"vertical"}
                    form={form}
                    className="form-style"
                    onFinish={onFinish}
                    validateTrigger="onBlur"
                    onValuesChange={handleFormChange}
                >
                    <Form.Item

                        name="holder"
                        label={<span style={{ fontFamily: "ClashGrotest" }}>Holder</span>}
                        rules={[
                            {
                                required: true,
                                message: "Please enter holder !",
                            },
                        ]}
                    >
                        <Input placeholder="Input holder " className="form-input " />
                    </Form.Item>
                    <Form.Item
                        name="issuer"
                        label={<span style={{ fontFamily: "ClashGrotest" }}>Issuer</span>}
                        rules={[
                            {
                                required: true,
                                message: "Please enter issuer !",

                            },
                        ]}
                    >
                        <Input placeholder="Input issuer " className="form-input" />
                    </Form.Item>
                    <Form.Item
                        name="dateOfBirth"
                        label={<span style={{ fontFamily: "ClashGrotest" }}>Date of Birth</span>}
                        rules={[
                            {
                                required: true,
                                message: "Please enter date of birth!",
                            },
                        ]}
                    >
                        <DatePicker
                            placeholder="Select date of birth"
                            className="form-input"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="signature"

                        label={<span style={{ fontFamily: "ClashGrotest" }}>Signature</span>}
                        rules={[
                            {
                                required: true,
                                message: "Please enter signature!",
                            },
                        ]}
                    >
                        <Input disabled placeholder="Input signature" className="form-input" />
                    </Form.Item>
                    <Form.Item className="">
                        <Button
                            htmlType="submit"
                            style={{ letterSpacing: 1 }}
                            className="form-button w-100 font-clash spacing-let"
                        >
                            Issue ZPass
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default InputModule;
