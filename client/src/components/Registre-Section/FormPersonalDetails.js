import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

import { RegistreForm, Label, RadioLabel, DragAndDropSection, DragAndDropContent, SelectFile } from './style'
import PrimaryBotton from '../Primary-Button'
import { FiUploadCloud } from 'react-icons/fi'

const FormPersonalDetails = ({customHandleChange, prevStep, formik}) => {

    const { handleChange, errors, handleBlur, values, touched } = formik;

    const prev = () => {
        prevStep()
    }

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
                const currentFile = files[0]
                customHandleChange(values.role === 'employer' ? 'companyLogo' : 'photoProfile', currentFile.path)
            }
        }
    }

    const registreUser = () => {
        axios.post('/users/registre', values)
             .then(res => console.log(res.data.message))
             .catch(error => console.log(error.response.data))
    }

    return (
        <RegistreForm>

            {values.role === 'employer' ? (<Label required>Company Logo</Label>) : (<Label>Photo Profile</Label>)}

            <Dropzone onDrop={handleOnDrop} accept={acceptedFileTypes} multiple={false}>
                {({getRootProps, getInputProps}) => (
                    <DragAndDropSection {...getRootProps()}>
                        <input {...getInputProps()} />
                        <DragAndDropContent>
                            <FiUploadCloud size="2em" className="mr-4"/> <span>Drag and Drop to upload 
                                <br />
                                {values.role === 'employer' ? values.companyLogo : values.photoProfile}
                            </span>
                            <SelectFile>Select File</SelectFile>
                        </DragAndDropContent>
                    </DragAndDropSection>
                )}
            </Dropzone>

            {values.role === 'employer' ? (
                <>
                    <Label>What's Your Role?</Label>
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
                    <Label>About You</Label>
                    <textarea 
                        className="textarea mt-4" 
                        placeholder="Tell us more about yourself"
                        onChange={handleChange('aboutMe')}
                        defaultValue={values.aboutMe}
                    ></textarea>
                </>
            )}

            <PrimaryBotton className="mr-4 mt-4" onClick={prev} size="medium" text="Previous" transparent />
            <PrimaryBotton onClick={registreUser} size="medium" text="Get Started" />
        </RegistreForm>
    )
}

export default FormPersonalDetails