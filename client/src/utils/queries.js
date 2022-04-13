import {gql} from "@apollo/client"

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
        token
        user {
            username
            _id
            }
        }
    }
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const Me_Query = gql`
query me{
  me {
    username
    email
    channelModel {
      _id
      users {
        _id
        username
      }
    }
  }
}
`
export const User_Query = gql`
  query($username: String){

    find_user(username: $username) {
      email
      username
    }


}`
export const ALL_USERS = gql`
query{
  users {
  _id
  username
  email
  channelModel {
      _id
    }
  }
}
`
export const Channel_Data = gql`
query ($_id: ID!) {
  channel(_id: $_id) {
    _id
    users {
      _id
    }
    messages {
      _id
      textValue
      sender {
        username
      }
    }
  }
}
`

export const SEND_MESSAGE = gql`
  mutation sendMessage($_id:ID, $textValue: String!, $senderId: Userss!) {
    sendMessage(_id:$_id,textValue: $textValue, senderId: $senderId) {
      _id
    }
  }
`