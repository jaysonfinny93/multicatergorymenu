
import React, { useState ,useContext,useEffect} from "react"
import './LayoutComponent.css';
import { Input, Select, Form, Button } from 'antd'
import { UserDetailsContext } from "../../Context/UserDetailsContext";
import { v4 as uuidv4 } from 'uuid';
function LayoutComponent({ dummyData ,setDummyData}) {
    const {setWakeUpFunc,wakeUpFunc}=useContext(UserDetailsContext)
    const { Option } = Select
    const fullInfo2 = (index) => {
        for(var i=0;i<index.length;i++){
          if(i===0)
            var a=dummyData[index[i]]
          if(i>0){
           a=a.sub[index[i]]
          }
        }
      return a
      }
      
      
    const onFinish = (values) => {  
        const categoryMap = (g,idx) => {
            g.sub.map((f,idx1) => {
                if(f.id===values.parentcategory)
            {
                fullInfo2([idx,idx1]).sub=[...f.sub,{name:values.categoryname,sub:[],id:uuidv4()}]
                setDummyData(dummyData)
                setWakeUpFunc(!wakeUpFunc)
            }
            if(f.sub.length!==0)
            {
                categoryMap(f,[...idx,idx1])
            }
            })}
        dummyData.map((e,idx) => {
            if(e.id===values.parentcategory)
            {
                dummyData[idx]={name:e.name,id:e.id,sub:[...e.sub,{name:values.categoryname,sub:[],id:uuidv4()}]}
                setDummyData(dummyData)
                setWakeUpFunc(!wakeUpFunc)
            }
            if(e.sub.length!==0)
            {
                categoryMap(e,[idx])
            }
        })
    }
    console.log(dummyData)
    function handleChange(values) {
       
    }
    const subComp = (e, idx) => {
        if (e.length !== 0) {
            return (e.map((f, idx1) => {
                if (f.sub.length===0)
                    return <Option value={f.id}>{f.name}</Option>
                 if (f.sub.length!==0)
                    return subComp([...f.sub,{name:f.name,sub:[],id:f.id}], [...idx,idx1])}
            )
            )
        }
        else return
    }

    return (
        <div >
            <div className="layout-style">
                <div className="cate-head">
                    <div style={{marginTop:10,marginBottom:10}}>Add a new Category</div>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="categoryname"
                            rules={[{ required: true, message: 'Please input your category name!' }]}
                        >
                            <Input style={{ width: 190 }} placeholder="Category Name" />
                        </Form.Item>
                        <Form.Item
                            name="parentcategory"
                            rules={[{ required: true, message: 'Please select parent category!' }]}
                        >
                            <Select placeholder="Parent category" style={{ width: 190 }} onChange={handleChange}>
                                {dummyData && dummyData.map((e,idx) => {
                                    if (e.sub.length===0)
                                        return <Option value={e.id}>{e.name}</Option>
                                    else if (e.sub.length!==0) {
                                        return subComp([...e.sub,{name:e.name,sub:[],id:e.id}], [idx])
                                    }
                                })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ width:190,backgroundColor:"#b981f0",border:"none" }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LayoutComponent;
