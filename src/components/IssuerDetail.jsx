import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import moment from "moment";
import Copy from "../assets/Images/copy.png";
function IssuerDetail({
  advanceStep,
  issuer,
  dob,
  expiration,
  signature,
  subject,
  execute,
}) {
  console.log("====formValues", issuer);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [error, setError] = useState(false);

  const [form] = Form.useForm();
  // Function to copy the text to the clipboard
  const copyTextToClipboard = (text) => {
    if (text) {
      const textField = document.createElement("textarea");
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      return true;
    }
    return false;
  };

  // Handle click on the copy image
  const handleCopyClick = (text, fieldName) => {
    if (copyTextToClipboard(text)) {
      message.success(`Copied ${fieldName} to clipboard`);
    } else {
      message.error(`${fieldName} is empty`);
    }
  };

  const handleGenerateProof = async () => {
    try {
      setHasExecuted(true);
      await execute();
    } catch (err) {
      console.error("Error executing:", err);
      setError("An error occurred while generating the proof.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-item-center ">
      <div className="title-style text-center font-clash">ZPass Issuer</div>
      <div className="d-flex justify-content-center align-item-center">
        <Form layout={"vertical"} form={form} className="form-style">
          <Form.Item
            label={
              <label
                style={{
                  color: "#808080",
                  fontSize: "16px",
                  fontFamily: "ClashGrotest",
                }}
              >
                Issuer Address
              </label>
            }
            rules={[
              {
                required: true,
                message: "Please enter holder name!",
              },
            ]}
          >
            <div className="d-flex gap-4 align-items-center justify-content-between">
              <span
                className="issuer-detail coming-soon-text fw-bold my-auto  "
                style={{
                  border: "1px solid #2c0689",
                  padding: "10px  20px 10px 10px",
                  width: "90%",
                  borderRadius: "10px",
                  fontFamily: "ClashGrotest",
                }}
              >
                {issuer !== "" ? issuer.toString() : ""}
              </span>
              <span>
                <img
                  width={30}
                  height={30}
                  style={{ objectFit: "contain", cursor: "pointer" }}
                  src={Copy}
                  alt="Copy Icon"
                  onClick={() => handleCopyClick(issuer, "Issuer Address")}
                />
              </span>
            </div>
          </Form.Item>
          <Form.Item
            label={
              <label
                style={{
                  color: "#808080",
                  fontSize: "16px",
                  fontFamily: "ClashGrotest",
                }}
              >
                Subject Address
              </label>
            }
            rules={[
              {
                required: true,
                message: "Please enter holder name!",
              },
            ]}
          >
            <div className="d-flex gap-4 align-items-center justify-content-between">
              <span
                className="issuer-detail coming-soon-text fw-bold my-auto "
                style={{
                  border: "1px solid #2c0689",
                  padding: "10px  20px 10px 10px",
                  width: "90%",
                  borderRadius: "10px",
                  fontFamily: "ClashGrotest",
                }}
              >
                {subject !== "" ? subject.toString() : ""}
              </span>
              <span>
                <img
                  width={30}
                  height={30}
                  style={{ objectFit: "contain", cursor: "pointer" }}
                  src={Copy}
                  alt="Copy Icon"
                  onClick={() => handleCopyClick(subject, "Subject Address")}
                />
              </span>
            </div>
          </Form.Item>
          <Form.Item
            label={
              <label
                style={{
                  color: "#808080",
                  fontSize: "16px",
                  fontFamily: "ClashGrotest",
                }}
              >
                Date Of Birth
              </label>
            }
            rules={[
              {
                required: true,
                message: "Please enter holder name!",
              },
            ]}
          >
            <p className="issuer-detail coming-soon-text fw-bold">
              {dob !== ""
                ? dob.format("YYYY-MM-DD") // Format the date as desired
                : ""}
            </p>
          </Form.Item>
          <Form.Item
            label={
              <label
                style={{
                  color: "#808080",
                  fontSize: "16px",
                  fontFamily: "ClashGrotest",
                }}
              >
                Expiration
              </label>
            }
            rules={[
              {
                required: true,
                message: "Please enter holder name!",
              },
            ]}
          >
            <p className="issuer-detail coming-soon-text fw-bold">{expiration}</p>
          </Form.Item>{" "}
          <Form.Item
            label={
              <label
                style={{
                  color: "#808080",
                  fontSize: "16px",
                  fontFamily: "ClashGrotest",
                }}
              >
                Signature
              </label>
            }
            rules={[
              {
                required: true,
                message: "Please enter signature!",
              },
            ]}
          >
            <div className="d-flex gap-4 align-items-center justify-content-between">
              <span
                className="issuer-detail coming-soon-text fw-bold my-auto"
                style={{
                  border: "1px solid #2c0689",
                  padding: "10px  20px 10px 10px",
                  // width: "90%",
                  borderRadius: "10px",
                  maxWidth: "300px",
                  fontFamily: "ClashGrotest",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {signature !== "" ? signature.toString()?.trim() : ""}
              </span>
              <span>
                <img
                  width={30}
                  height={30}
                  style={{ objectFit: "contain", cursor: "pointer" }}
                  src={Copy}
                  alt="Copy Icon"
                  onClick={() => handleCopyClick(signature, "Signature")}
                />
              </span>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => handleGenerateProof()}
              style={{ background: "rgb(128, 128, 128)", letteSpacing: 1 }}
              className="form-button w-100 font-clash spacing-let"
              disabled={hasExecuted}
            >
              {hasExecuted ? "Generating.." : "Issue ZPass"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default IssuerDetail;
