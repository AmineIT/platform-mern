import React from 'react'
import ReactQuill from 'react-quill'
import { useFormik, getIn } from 'formik'
import * as Yup from 'yup'
import { cleanHtml } from '../../utils'
import { editProfile } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { SettingsContainer, FieldControl } from './style'
import Button from '../Button'

toast.configure()

const MessageSettings = ({ user }) => {

    const dispatch = useDispatch()

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'script',
        'link', 'image',
        'color', 'background',
        'font',
        'align',
        'clean'
    ]

    const validationSchema = Yup.object({
        feedbackMessage: Yup.object().shape({
            subjectLine: Yup.string().trim().required('Please type a subject line for your email.'),
            messageBody: Yup.string().trim().required('Please type your message body.')
        })
    })

    const formik = useFormik({
        initialValues: {
            ...user
        },
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true
    })

    const { handleChange, handleBlur, touched, errors, setFieldTouched, values, setFieldValue } = formik

    const { subjectLine, messageBody } = values.feedbackMessage

    const handleQuillChange = (e) => {
        setFieldValue('feedbackMessage.messageBody', cleanHtml(e))
    }

    const saveFeedbackMessage = () => {
        if (Object.keys(errors).length > 0) {
            setFieldTouched('feedbackMessage.subjectLine', true)
            setFieldTouched('feedbackMessage.messageBody', true)
            return
        }

        toast.info('Your message settings have been updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        dispatch(editProfile(values))
    }

    return (
        <SettingsContainer>
            <FieldControl>
                <div className="field">
                    <label className="label">Subject line</label>
                    <div className="control">
                        <input
                            className="input"
                            defaultValue={subjectLine}
                            onChange={handleChange('feedbackMessage.subjectLine')}
                            onBlur={handleBlur('feedbackMessage.subjectLine')}
                            placeholder="Type your Subject line" />
                        {
                            getIn(errors, 'feedbackMessage.subjectLine') && getIn(touched, 'feedbackMessage.subjectLine') ?
                                <p className="help is-danger mt-1">{errors.feedbackMessage.subjectLine}</p>
                                : null
                        }
                    </div>
                </div>
            </FieldControl>

            <FieldControl>
                <div className="field">
                    <label className="label">Message body</label>
                    <div className="control">
                        <ReactQuill
                            placeholder='Type your message body here'
                            defaultValue={messageBody}
                            onChange={e => handleQuillChange(e)}
                            onBlur={() => setFieldTouched('feedbackMessage.messageBody')}
                            formats={formats}
                            modules={modules}
                        />
                        {
                            getIn(errors, 'feedbackMessage.messageBody') && getIn(touched, 'feedbackMessage.messageBody') ?
                                <p className="help is-danger mt-1">{errors.feedbackMessage.messageBody}</p>
                                : null
                        }
                    </div>
                </div>
            </FieldControl>

            <FieldControl>
                <Button primary size='small' onClick={saveFeedbackMessage}>Save</Button>
            </FieldControl>
        </SettingsContainer>
    )
}

export default MessageSettings