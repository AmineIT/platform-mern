import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

import { RegisterForm, Label, RadioLabel, DragAndDropSection, DragAndDropContent, SelectFile } from './style'
import PrimaryButton from '../Primary-Button'
import { FiUploadCloud } from 'react-icons/fi'
// import { Ring } from 'react-spinners-css'

const FormPersonalDetails = ({customHandleChange, nextStep, prevStep, formik}) => {

    const { handleChange, values, setFieldError, errors } = formik;

    const prev = () => {
        prevStep()
    }

    const [fileName, setFileName] = useState('')

    const imageMaxSize = 5242880 // 5MB
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg'
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

    const verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert(`Maximum upload size is ${imageMaxSize} MB`)
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    const handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            verifyFile(rejectedFiles)
        }

        if (files && files.length > 0){
            const isVerified = verifyFile(files)
            if (isVerified){
                let formData = new FormData()
                const config = {
                    header: {'content-typy' : 'multipart/form-data'}
                }

                const currentFile = files[0]

                formData.append('profileImage', currentFile)

                axios.post('/users/uploads/userImage', formData, config)
                     .then(response => {
                         if (response.data.success) {
                            customHandleChange('profileImage', response.data.image)
                            setFileName(currentFile.path)
                         } else {
                             alert('Failed to save the image, please try again.')
                         }
                     })
            }
        }
    }

    const RegisterUser = () => {
        if (values.profileImage === '') {
            setFieldError('profileImage', 'Please upload an image.')
            return
        }

        axios.post('/users/register', values)
             .then(res => res)
             .catch(error => error)
        
        nextStep()
    }

    return (
        <RegisterForm>

            {values.role === 'employer' ? (<Label required>Company Logo</Label>) : (<Label>Photo Profile</Label>)}
            <Dropzone onDrop={handleOnDrop} accept={acceptedFileTypes} multiple={false}>
                {({getRootProps, getInputProps}) => (
                    <DragAndDropSection {...getRootProps()}>
                        <input {...getInputProps()} />
                        <DragAndDropContent>
                            <FiUploadCloud size="2em" className="mr-4"/> <span>Drag and Drop to upload 
                                <br />
                                {fileName}
                            </span>
                            <SelectFile>Select File</SelectFile>
                        </DragAndDropContent>
                    </DragAndDropSection>
                )}
            </Dropzone>
            {errors.profileImage ? <p className="help is-danger mt-1">{errors.profileImage}</p> : null}

            {values.role === 'employer' ? (
                <>
                    <Label className="mt-4">What's Your Role?</Label>
                    <div className="control mt-4">
                        <label className="radio" style={{width: '240px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input 
                                    className="inputRadio" 
                                    type="radio" 
                                    name="answer" 
                                    value="HR Manager" 
                                    onChange={handleChange('currentJobRole')} />
                                <RadioLabel>HR Manager</RadioLabel>
                            </div>
                        </label>
                        <label className="radio" style={{width: '240px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input 
                                    className="inputRadio" 
                                    type="radio" 
                                    name="answer" 
                                    value="Recruiter"
                                    onChange={handleChange('currentJobRole')} />
                                <RadioLabel>Recruiter</RadioLabel>
                            </div>
                        </label>
                    </div>
                    <div className="control mt-2 mb-4">
                        <label className="radio" style={{width: '240px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input 
                                    className="inputRadio" 
                                    type="radio" 
                                    name="answer"
                                    value="Head of Department" 
                                    onChange={handleChange('currentJobRole')} />
                                <RadioLabel>Head of Department</RadioLabel>
                            </div>
                        </label>
                        <label className="radio" style={{width: '240px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input 
                                    className="inputRadio" 
                                    type="radio" 
                                    name="answer" 
                                    value="Other"
                                    onChange={handleChange('currentJobRole')} />
                                <RadioLabel>Other</RadioLabel>
                            </div>
                        </label>
                    </div>
                </>
            ) : (
                <>
                    <Label className="mt-4">About You</Label>
                    <textarea 
                        className="textarea mt-4" 
                        placeholder="Tell us more about yourself"
                        onChange={handleChange('aboutMe')}
                        defaultValue={values.aboutMe}
                    ></textarea>
                </>
            )}

            <PrimaryButton className="mr-4 mt-4" onClick={prev} size="medium" text="Previous" transparent />
            <PrimaryButton onClick={RegisterUser} size="medium" text="Get Started" />
        </RegisterForm>
    )
}

export default FormPersonalDetails