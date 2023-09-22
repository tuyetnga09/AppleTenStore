import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import {
    Form,
    Input,
    Avatar,
    Row,
    Col,
    Typography,
    Space,
    Radio,
    InputProps,
} from "antd";
import InputMask from "react-input-mask";

const { Text } = Typography;

const CreateVoucher = ({}) => {

    const t = useTranslate();

    return(
        <Create
            // isLoading={queryResult?.isFetching}
            // saveButtonProps={saveButtonProps}
        >
            <Form
                // {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
            >
                <Row gutter={[64, 0]} wrap>
                    <Col xs={24} lg={6}>
                        {/* <Space
                            direction="vertical"
                            align="center"
                            style={{
                                width: "100%",
                                textAlign: "center",
                                marginBottom: "16px",
                            }}
                        >
                            <Avatar
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    maxWidth: "256px",
                                }}
                                src="/images/default-store-img-lg.png"
                                alt="Store Location"
                            />
                            <Text
                                strong
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {t("stores.selectLocation")}
                            </Text>
                        </Space> */}
                         <Form.Item
                            label={t("stores.fields.title")}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("stores.fields.email")}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("stores.fields.title")}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("stores.fields.email")}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Form.Item
                            label={t("stores.fields.title")}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("stores.fields.email")}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("stores.fields.gsm")}
                            name="gsm"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputMask mask="(999) 999 99 99">
                                {/* 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore */}
                                {/* {(props: InputProps) => <Input {...props} />} */}
                            </InputMask>
                        </Form.Item>
                        <Form.Item
                            label={t("stores.fields.isActive")}
                            name="isActive"
                        >
                            <Radio.Group>
                                <Radio value={true}>{t("status.enable")}</Radio>
                                <Radio value={false}>
                                    {t("status.disable")}
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Form.Item
                            label={t("stores.fields.address")}
                            name={["address", "text"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.TextArea rows={8} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Create>
    )
};
export default CreateVoucher;