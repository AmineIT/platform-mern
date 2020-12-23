import React, { useState, useRef, useCallback, useEffect } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import { ChromePicker } from 'react-color'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactTooltip from 'react-tooltip'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/lib/ReactCrop.scss'
import { base64StringtoFile, extractImageFileExtensionFromBase64 } from '../../utils'
import { editProfile } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { LogoContainer, FieldControl, FlexWrapper, SettingsContainer, ColorPreview, SocialMedia, DragAndDropSection, DragAndDropContent } from './style'
import Button from '../Button'
import { AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare, AiFillFacebook } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import { FiClipboard, FiUploadCloud } from 'react-icons/fi'

toast.configure()

const CompanySettings = ({ user }) => {

    const [country, setCountry] = useState(user.country || '')
    const [region, setRegion] = useState(user.city || '')
    const [color, setColor] = useState(user.brandColor || '#00000')
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [showSocialMedia, setShowSocialMedia] = useState(false)
    const inputRef = useRef()
    const previewCanvasRef = useRef()
    const imgRef = useRef(null)
    const [tooltipText, setTooltipText] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [upImg, setUpImg] = useState()
    const [crop, setCrop] = useState({ unit: "%", width: 30 })
    const [completedCrop, setCompletedCrop] = useState(null)
    const pixelRatio = window.devicePixelRatio || 1
    const dispatch = useDispatch()

    const imageMaxSize = 5242880 // 5MB
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg'
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

    const verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > imageMaxSize) {
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

        if (files && files.length > 0) {
            const isVerified = verifyFile(files)
            if (isVerified) {
                const currentFile = files[0]
                const reader = new FileReader()
                reader.addEventListener("load", () => {
                    const myResult = reader.result
                    setUpImg(myResult)
                }, false)
                reader.readAsDataURL(currentFile)
            }
        }
    }

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop, pixelRatio])

    const updateImage = () => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }
        const canvasRef = previewCanvasRef.current
        const fileExt = extractImageFileExtensionFromBase64(upImg)
        const myFileName = `previewFile.${fileExt}`
        const imageData64 = canvasRef.toDataURL('image/' + fileExt)
        const myNewCroppedFile = base64StringtoFile(imageData64, myFileName)
        let formData = new FormData()
        const config = {
            header: { 'content-typy': 'multipart/form-data' }
        }
        formData.append('profileImage', myNewCroppedFile)
        axios.post('/users/uploads/userImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setFieldValue('profileImage', response.data.image)
                    resetImageState()
                } else {
                    alert('Failed to save the image, please try again.')
                }
            })
    }

    const resetImageState = () => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            setShowModal(false)
            return;
        }
        const canvasRef = previewCanvasRef.current
        const ctx = canvasRef.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)
        setUpImg(null)
        setShowModal(false)
    }

    const selectCountry = (value) => {
        setCountry(value)
        setFieldValue('country', value)
    }

    const selectRegion = (value) => {
        setRegion(value)
        setFieldValue('city', value)
    }

    const handleOnChangeComplete = (color) => {
        setColor(color.hex)
        setFieldValue('brandColor', color.hex)
    }

    const handleColorChange = (color) => {
        setColor(color.hex)
    }

    const validationSchema = Yup.object({
        aboutMe: Yup.string().trim('Please type a description.'),
        city: Yup.string().trim().required('Please choose a city.'),
        country: Yup.string().trim().required('Please choose a country.'),
        companyWebsite: Yup.string().trim().required('Please type your company website.').url('Please type a valid URL. (e.g https://www.domain.com)')
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

    const [socialMedia, setSocialMedia] = useState(user.socialMediaAccounts)

    const handleURLChange = (type, value) => {
        socialMedia.map(account => {
            if (account.type === type) {
                account.URL = value
                setFieldValue('socialMediaAccounts', socialMedia)
            }
        })
    }

    const addSocialMedia = (type) => {
        const exist = socialMedia.find(account => account.type === type)
        if (!exist) {
            setSocialMedia([...socialMedia, { type: type, URL: '' }])
            setFieldValue('socialMediaAccounts', socialMedia)
        }
    }

    const copyText = () => {
        inputRef.current.select()
        inputRef.current.setSelectionRange(0, 99999) // for the mobile devices
        document.execCommand('copy')
        setTooltipText(true)
        setTimeout(() => {
            setTooltipText(false)
        }, 1500)
    }

    const saveNewUserData = () => {
        if (errors.companyWebsite || errors.country || errors.city) {
            setFieldTouched('companyWebsite', true, true)
            setFieldTouched('country', true, true)
            setFieldTouched('city', true, true)
            return
        }
        toast.info('Your company profile has been updated!', {
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
            <LogoContainer>
                <div style={{ textAlign: 'center', marginRight: '32px', paddingTop: '16px' }}>
                    <figure className="image is-96x96">
                        <img className='is-rounded' src={`http://localhost:5000/${values.profileImage}`} alt='Company Logo' />
                    </figure>
                    <p
                        style={{ color: '#1C65E3', cursor: 'pointer', marginTop: '8px', fontWeight: '700', textDecoration: 'underline' }}
                        onClick={() => setShowModal(true)}>Update</p>
                </div>
                <FieldControl>
                    <div className="field">
                        <label className="label">About {values.companyName}</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                onChange={handleChange('aboutMe')}
                                name='aboutMe'
                                defaultValue={values.aboutMe}
                                placeholder={`Describe what ${values.companyName} does in few lines...`} />
                        </div>
                    </div>
                </FieldControl>
            </LogoContainer>

            <FlexWrapper>
                <FieldControl className='mr-4'>
                    <div className="field">
                        <label className="label">Company website</label>
                        <div className="control">
                            <input
                                className="input"
                                type='text'
                                placeholder='Type your website'
                                name='companyWebsite'
                                onChange={handleChange('companyWebsite')}
                                onBlur={handleBlur('companyWebsite')}
                                defaultValue={values.companyWebsite} />
                            {touched.companyWebsite && errors.companyWebsite ? <p className="help is-danger mt-1">{errors.companyWebsite}</p> : null}
                        </div>
                    </div>
                </FieldControl>
                <FieldControl>
                    <div className="field">
                        {socialMedia.map((account, index) => (
                            <div className="field" key={index}>
                                <label className="label">{account.type} account</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type='text'
                                        defaultValue={account.URL}
                                        onChange={e => handleURLChange(account.type, e.target.value)}
                                        placeholder='Add a URL' />
                                </div>
                            </div>
                        ))}
                        <p
                            style={{ color: '#1C65E3', cursor: 'pointer', textDecoration: 'underline', marginTop: '8px', width: 'fit-content' }}
                            onClick={() => setShowSocialMedia(!showSocialMedia)}>Add another link</p>
                        {
                            showSocialMedia ? (
                                <SocialMedia>
                                    <div className='hideSocialMedia' onClick={() => setShowSocialMedia(false)}>
                                        <MdCancel size='20' />
                                    </div>
                                    <div onClick={addSocialMedia.bind(this, 'LinkdeIn')}>
                                        <AiFillLinkedin size='24' />
                                    </div>
                                    <div onClick={addSocialMedia.bind(this, 'Facebook')}>
                                        <AiFillFacebook size='24' />
                                    </div>
                                    <div onClick={addSocialMedia.bind(this, 'Instagram')}>
                                        <AiFillInstagram size='24' />
                                    </div>
                                    <div onClick={addSocialMedia.bind(this, 'Twitter')}>
                                        <AiFillTwitterSquare size='24' />
                                    </div>
                                </SocialMedia>
                            ) : null
                        }
                    </div>
                </FieldControl>
            </FlexWrapper>

            <FieldControl>
                <div className="field-body">
                    <div className="field">
                        <div className='control is-expended'>
                            <label className="label">Country</label>
                            <div className="field is-narrow">
                                <div className="select is-fullwidth">
                                    <CountryDropdown
                                        showDefaultOption={true}
                                        value={country}
                                        name='country'
                                        onBlur={() => setFieldTouched('country')}
                                        onChange={selectCountry} />
                                    {touched.country && errors.country ? <p className="help is-danger mt-1">{errors.country}</p> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control is-expanded">
                            <label className="label">City</label>
                            <div className="field is-narrow">
                                <div className="select is-fullwidth">
                                    <RegionDropdown
                                        blankOptionLabel="No country selected."
                                        country={country}
                                        onChange={selectRegion}
                                        name='city'
                                        onBlur={() => setFieldTouched('city')}
                                        value={region} />
                                    {touched.city && errors.city ? <p className="help is-danger mt-1">{errors.city}</p> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FieldControl>

            <FlexWrapper>
                <FieldControl className='mr-4'>
                    <ReactTooltip place='top' type='dark' effect='solid' />
                    <div className="field">
                        <label className="label">Public profile URL</label>
                        <div className="control has-icons-right">
                            <input
                                className="input"
                                value={`www.beselfstarter.com/${values.companyName.toLowerCase()}`}
                                type='text'
                                readOnly
                                ref={inputRef} />
                            <span
                                onClick={copyText}
                                className="icon is-right"
                                data-tip='Copy to clipboard'>
                                <FiClipboard size='20' color='#7E8BA2' />
                            </span>
                            {tooltipText ? <p class="help is-success">URL copied</p> : null}
                        </div>
                    </div>
                </FieldControl>
                <FieldControl>
                    <div className="field">
                        <label className="label">My brand color</label>
                        <div className="control">
                            <ColorPreview bg={color} onClick={() => setShowColorPicker(!showColorPicker)} />
                            {showColorPicker ?
                                <div>
                                    <div style={{ position: 'absolute', zIndex: '2' }}>
                                        <div
                                            style={{ position: 'fixed', top: '0', bottom: '0', left: '0', right: '0' }}
                                            onClick={() => setShowColorPicker(false)} />
                                        <ChromePicker
                                            color={color}
                                            onChangeComplete={handleOnChangeComplete}
                                            onChange={handleColorChange} />
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </FieldControl>
            </FlexWrapper>

            <FieldControl>
                <Button primary size='small' onClick={saveNewUserData}>Save</Button>
            </FieldControl>

            <div className={`modal ${showModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Update {values.companyName} logo</p>
                        <button onClick={() => resetImageState()} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        {
                            upImg ? (
                                <>
                                    <ReactCrop
                                        src={upImg}
                                        onImageLoaded={onLoad}
                                        crop={crop}
                                        onChange={(c) => setCrop(c)}
                                        onComplete={(c) => setCompletedCrop(c)}
                                    />
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{ display: 'none' }}
                                    />
                                </>
                            ) : (
                                    <Dropzone onDrop={handleOnDrop} accept={acceptedFileTypes} multiple={false}>
                                        {({ getRootProps, getInputProps }) => (
                                            <DragAndDropSection {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <DragAndDropContent>
                                                    <div>
                                                        <FiUploadCloud size="2em" className="mr-4" />
                                                        <p>Drop your image here or <b>browse</b></p>
                                                        <small>Max. file size: <b>5mb</b></small>
                                                    </div>
                                                </DragAndDropContent>
                                            </DragAndDropSection>
                                        )}
                                    </Dropzone>
                                )
                        }
                    </section>
                    <footer className="modal-card-foot">
                        <Button size='tiny' fit='stretched' primary onClick={updateImage}>Update</Button>
                        <Button size='tiny' fit='stretched' outline onClick={() => resetImageState()}>Cancel</Button>
                    </footer>
                </div>
            </div>
        </SettingsContainer>
    )
}

export default CompanySettings