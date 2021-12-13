
import React, { useState, useContext, useEffect } from "react"
import './InitialMenuComponent.css';
import { Menu } from 'antd';
import LayoutComponent from "./LayoutComponent/LayoutComponent";
import { UserDetailsContext } from "../Context/UserDetailsContext";
function InitialMenuComponent() {
    const { setWakeUpFunc, wakeUpFunc } = useContext(UserDetailsContext)
    const { SubMenu } = Menu;
    const [current, setCurrent] = useState("homepage")
    const [loading, setLoading] = useState(false)

    const [dummyData, setDummyData] = useState([
        { name: "newname",sub:[],id:"8f6d54f7-0495-47c0-97dd-ab8489ce01f3" },
        { name: "newname2",sub:[],id:"0296d996-be22-4300-9c38-77288b6af0e9" },
        {
            name: "submenu1",
            sub: [
                { name: "newname3",sub:[],id:"b1f9db56-ed2a-4e5c-b23c-91b02289dd01" }
                , { name: "newname4",sub:[],id:"b963d8a5-56d6-42df-be10-0b1669bde20f" }
                , { name: "newname5",sub:[],id:"254ed1cc-5896-4680-9f27-30bea120e9ab" },
                {
                    name: "submenu2",
                    sub: [
                        { name: "newname6",sub:[],id: "be90fac2-70fc-423d-a2df-4fea84befb52"},
                        { name: "newname7",sub:[],id:"9d326395-857f-4d9b-9cd1-a0e62284283f"},
                        { name: "newname8",sub:[] ,id:"86e9d8c8-7cc2-4f7d-bb4a-d3447af53eb4"}
                    ]
                    ,id:"101c39e0-5a83-43f8-9a4d-8bf3955840c6"
                }
            ]
            ,id:"65aa6c7f-b72e-47ef-aead-7e6e27e104bb"
        },
        { name: "newname2",sub:[],id:"05b2caf5-ef32-42e9-a514-73931f1f6bc8" }
    ]

    )
    useEffect(() => {
        setLoading(true)
        setTimeout(() => setLoading(false), .2)
    }, [wakeUpFunc])
    if (loading) {
        return <div></div>
    }
    const handleClick = (e) => {
        setCurrent(e.key)
    }
    const subComp = (e) => {
        if (e.length !== 0) {
            return (e.map(f => {
                if (f.sub.length===0)
                    return <Menu.Item key={f + Math.random()}>
                        {f.name}
                    </Menu.Item>
                if (f.sub.length!==0)
                    return <SubMenu key={f + Math.random()} title={f.name}>
                        {subComp(f.sub)}
                    </SubMenu>
            }))
        }
        else return
    }
    const subComp1 = (e, idx) => {
        if (e.length !== 0) {
            return (e.map((f, idx1) => {
                if (f.sub.length===0)
                    return <Menu.Item key={f + Math.random()}>
                    {f.name}
                </Menu.Item>
                 if (f.sub.length!==0)
                    return subComp([...f.sub,{name:f.name,sub:[],id:f.id}], [...idx,idx1])}
            )
            )
        }
        else return
    }
    return (
        <div className="initial-comp">
            <div>
                <Menu style={{ marginTop: "2vh" }} onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="homepage">
                        Home page
                    </Menu.Item>
                    <SubMenu key="leftdropdown" title=" left dropdown">
                        {dummyData && dummyData.map(e => {
                            if (e.sub.length===0)
                                return <Menu.Item key={e + Math.random()}>
                                    {e.name}
                                </Menu.Item>
                            if (e.sub.length!==0) {
                                return <SubMenu key={e + Math.random()} title={e.name}>
                                    {subComp(e.sub)}
                                </SubMenu>
                            }
                        }
                        )
                        }
                    </SubMenu>

                    <SubMenu key="megamenu" title=" Mega menu">
                    {dummyData && dummyData.map((e,idx) => {
                                    if (e.sub.length===0)
                                        return<Menu.Item key={e + Math.random()}>
                                        {e.name}
                                    </Menu.Item>
                                    else if (e.sub.length!==0) {
                                        return subComp1([...e.sub,{name:e.name,sub:[],id:e.id}], [idx])
                                    }
                                })
                                }
                   </SubMenu>
                   <Menu.Item key="anypage">
                        AnyPage
                    </Menu.Item>
                    <SubMenu key="rightdropdown" title=" right dropdown">
                        
                    </SubMenu>
                </Menu>
            </div>
            <LayoutComponent dummyData={dummyData} setDummyData={setDummyData} />
        </div>
    );
}

export default InitialMenuComponent;
