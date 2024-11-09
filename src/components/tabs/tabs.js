import React from 'react';
import { Tabs } from 'antd';
import './tabs.css';

export default function Tab({ hundleTabsClick }) {
    const items = [
        {
            key: '1',
            label: 'Search',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Rated',
            children: 'Content of Tab Pane 2',
        }
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={(key) => hundleTabsClick(key)} />
    )
}