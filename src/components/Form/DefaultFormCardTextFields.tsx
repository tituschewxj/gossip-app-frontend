import React from 'react'
import DefaultTextField from './DefaultTextField'

function DefaultFormCardTextFields(props: { forumObject: ForumObject, onChangeSetState: Function }) {
    // Contains all the text fields for forms
    return (
        <>
            <DefaultTextField
                isVisible={props.forumObject.hasOwnProperty("title")}
                textFieldProps={{
                    label: 'Title',
                    value: props.forumObject.title,
                    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        props.onChangeSetState({ ...props.forumObject, title: e.target.value }),
                }} />
            <DefaultTextField
                isVisible={props.forumObject.hasOwnProperty("content")}
                textFieldProps={{
                    label: 'Content',
                    value: props.forumObject.content,
                    multiline: true,
                    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        props.onChangeSetState({ ...props.forumObject, content: e.target.value }),
                }} />
            <DefaultTextField
                isVisible={props.forumObject.hasOwnProperty("username")}
                textFieldProps={{
                    label: 'Username',
                    value: props.forumObject.username,
                    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        props.onChangeSetState({ ...props.forumObject, username: e.target.value }),
                }} />
            <DefaultTextField
                isVisible={props.forumObject.hasOwnProperty("email")}
                textFieldProps={{
                    label: 'Email',
                    value: props.forumObject.email,
                    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        props.onChangeSetState({ ...props.forumObject, email: e.target.value }),
                }} />
            <DefaultTextField
                isVisible={props.forumObject.hasOwnProperty("password")}
                textFieldProps={{
                    label: 'Password',
                    value: props.forumObject.temp_password,
                    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        props.onChangeSetState({ ...props.forumObject, password: e.target.value }),
                }} />
            <DefaultTextField
                isVisible={props.forumObject.hasOwnProperty("confirm_password")}
                textFieldProps={{
                    label: 'Confirm Password',
                    value: props.forumObject.temp_password,
                    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        props.onChangeSetState({ ...props.forumObject, confirm_password: e.target.value }),
                }} />
            <DefaultTextField
                isVisible={props.forumObject.hasOwnProperty("description")}
                textFieldProps={{
                    label: 'Description',
                    value: props.forumObject.description,
                    multiline: true,
                    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        props.onChangeSetState({ ...props.forumObject, description: e.target.value }),
                }} />
        </>
    )
}

export default DefaultFormCardTextFields