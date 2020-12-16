import React from 'react'
import { useFormik } from 'formik'
import { editProfile } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { SettingsContainer, NotificationsWrapper, FieldControl } from './style'
import Button from '../Button'

toast.configure()

const Notifications = ({ user }) => {

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            ...user
        },
        enableReinitialize: true
    })

    const { handleChange, values } = formik
    const { notifyWhenCandidateApplies, notifyWhenCandidateCompleteAssessment } = values

    const saveNotifications = () => {
        toast.info('Your notifications settings have been updated!', {
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
        <>
            <SettingsContainer>
                <NotificationsWrapper>
                    <div>
                        <h1>Candidate applies</h1>
                        <p>When a candidate applies I will get notified.</p>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="applies"
                            value={notifyWhenCandidateApplies}
                            checked={notifyWhenCandidateApplies}
                            onChange={handleChange('notifyWhenCandidateApplies')} />
                        <label htmlFor="applies">Toggle</label>
                    </div>
                </NotificationsWrapper>
                <NotificationsWrapper>
                    <div>
                        <h1>Candidate finishes an assessment</h1>
                        <p>When a candidate finishes an assessment I will get notified.</p>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="assessment"
                            value={notifyWhenCandidateCompleteAssessment}
                            checked={notifyWhenCandidateCompleteAssessment}
                            onChange={handleChange('notifyWhenCandidateCompleteAssessment')} />
                        <label htmlFor="assessment">Toggle</label>
                    </div>
                </NotificationsWrapper>
                <FieldControl>
                    <Button primary size='small' onClick={saveNotifications}>Save</Button>
                </FieldControl>
            </SettingsContainer>
        </>
    )
}

export default Notifications