import * as React from 'react';
import { Card, Segment, Checkbox, Form, Container, Grid, Icon, Image } from 'semantic-ui-react';

import UsersStore from './UsersStore';
import UserApi from '../../api/UserApi';

import { observer } from 'mobx-react';
import mock from './mock';

@observer
export default class Users extends React.Component {

    componentDidMount() {
        UsersStore.setup();
    }

    render() {

        const { users } = UsersStore;

        return (
            <div className='p-5 text-left'>
                <Grid columns={4}>
                    {users.map((user, index) => {
                        return (
                            <Grid.Column key={index}>
                                <Card>
                                    <Image className='p-3' src='http://www.nyan.cat/cats/original.gif' />
                                    <Card.Content>
                                        <Card.Header>{user.firstname + ' ' + user.lastname}</Card.Header>

                                        <Card.Description>
                                            <p>{user.position}</p>
                                            <p>{user.email}</p>
                                            <p>{user.username}</p>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        );
                    })}
                </Grid>

            </div>
        )
    }
}