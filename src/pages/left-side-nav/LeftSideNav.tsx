import { Menu, MenuProps } from 'antd';
const items: any[] = [
    {
        key: '1',
        label: 'Projects'
    }
];

const LeftSideNav = () => {
    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
    };


    return (
        <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            // @ts-ignore
            items= {items}
        />
    );
};

export default LeftSideNav
