import { Form, Input, Button, Checkbox } from 'antd';
import { axiosInstance } from "../services/http.service";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.info(location);


    const onFinish = (values: any) => {
        console.log('Success:', values);

        const bodyFormData = new FormData();

        bodyFormData.append('principal', values.username);
        bodyFormData.append('password', values.password);
        axiosInstance.post('c/login', bodyFormData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            if (!(location.state as any)?.from?.pathname || (location.state as any)?.from?.pathname === '/login') {
                navigate('/', {
                    replace: true
                })
            } else {
                navigate((location.state as any)?.from?.pathname);
            }
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;
