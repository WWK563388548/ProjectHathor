import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class ActivityForm extends React.Component {
    render() {
        return (
            <Segment>
              <Form>
                <Form.Field>
                  <label>活动主题</label>
                  <input placeholder="活动的主题" />
                </Form.Field>
                <Form.Field>
                  <label>活动日期</label>
                  <input type="date" placeholder="YYYY-MM-DD" />
                </Form.Field>
                <Form.Field>
                  <label>城市</label>
                  <input placeholder="活动所在城市" />
                </Form.Field>
                <Form.Field>
                  <label>地点</label>
                  <input placeholder="活动举办地点" />
                </Form.Field>
                <Form.Field>
                  <label>组织者</label>
                  <input placeholder="输入活动组织者的名字" />
                </Form.Field>
                <Button positive type="submit">
                  提交
                </Button>
                <Button type="button">取消</Button>
              </Form>
            </Segment>
        );
    }
}

export default ActivityForm;