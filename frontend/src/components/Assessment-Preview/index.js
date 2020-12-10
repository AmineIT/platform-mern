import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { fetchAssessment } from '../../actions/assessmentActions'
import moment from 'moment'
import ReactQuill from 'react-quill'
import Editor from '@monaco-editor/react'
import WindowedSelect from "react-windowed-select"

import LoadingScreen from '../Loading-Screen'
import DashboardFooter from '../Dashboard-Footer'
import {
    GlobalStyle,
    Container,
    AssessmentDetails,
    HeaderContainer,
    FlexWrapper,
    AssessmentTitle,
    QuestionWrapper,
    QuestionText,
    RadioWrapper,
    Label
} from './style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import { RiArrowLeftLine } from 'react-icons/ri'
import { BsInfoCircle } from 'react-icons/bs'

const AssessmentPreview = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()
    const { companyAssessment } = useSelector(state => state.assessments)
    const { questions, assessmentTitle, status, createdAt } = companyAssessment

    useEffect(() => {
        dispatch(fetchAssessment(id))
    }, [dispatch, id])

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

    const [language, setLanguage] = useState('javascript')
    const [selectedOption, setSelectedOption] = useState({
        value: 'javascript', label: 'javascript'
    })
    const options = [
        { value: 'css', label: 'css' },
        { value: 'c', label: 'c' },
        { value: 'clojure', label: 'clojure' },
        { value: 'coffeescript', label: 'coffeescript' },
        { value: 'csharp', label: 'csharp' },
        { value: 'go', label: 'go' },
        { value: 'go', label: 'go' },
        { value: 'graphql', label: 'graphql' },
        { value: 'handlebars', label: 'handlebars' },
        { value: 'html', label: 'html' },
        { value: 'ini', label: 'ini' },
        { value: 'java', label: 'java' },
        { value: 'javascript', label: 'javascript' },
        { value: 'json', label: 'json' },
        { value: 'kotlin', label: 'kotlin' },
        { value: 'less', label: 'less' },
        { value: 'markdown', label: 'markdown' },
        { value: 'mysql', label: 'mysql' },
        { value: 'objective-c', label: 'objective-c' },
        { value: 'pascal', label: 'pascal' },
        { value: 'perl', label: 'perl' },
        { value: 'pgsql', label: 'pgsql' },
        { value: 'php', label: 'php' },
        { value: 'powerquery', label: 'powerquery' },
        { value: 'pug', label: 'pug' },
        { value: 'python', label: 'python' },
        { value: 'r', label: 'r' },
        { value: 'ruby', label: 'ruby' },
        { value: 'scss', label: 'scss' },
        { value: 'shell', label: 'shell' },
        { value: 'sol', label: 'sol' },
        { value: 'sql', label: 'sql' },
        { value: 'swift', label: 'swift' },
        { value: 'tcl', label: 'tcl' },
        { value: 'typescript', label: 'typescript' },
        { value: 'vb', label: 'vb' },
        { value: 'xml', label: 'xml' },
        { value: 'yaml', label: 'yaml' }
    ]

    const valueGetter = useRef()

    const handleEditorDidMount = (_valueGetter) => {
        valueGetter.current = _valueGetter;
    }

    const handleChange = (selectedOption) => {
        console.log(selectedOption)
        setLanguage(selectedOption.value)
        setSelectedOption(selectedOption)
    }

    const handleShowValue = () => {
        console.log(valueGetter.current());
    }

    return (
        <>
            {Object.keys(companyAssessment).length === 0 ? (
                <LoadingScreen />
            ) : (
                    <>
                        <GlobalStyle />

                        <Container>
                            <HeaderContainer>
                                <div onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                                    <RiArrowLeftLine size='24' />
                                    <span className='ml-1'>Back</span>
                                </div>
                                <img src={Logo} alt='Selfstarter Logo' />
                            </HeaderContainer>

                            <AssessmentDetails>
                                <FlexWrapper>
                                    <AssessmentTitle className='mr-4'>{assessmentTitle}</AssessmentTitle>
                                    <span className={`tag ${status === 'published' ? 'is-primary' : (status === 'draft' ? 'is-link' : 'is-light')}`}>
                                        {status}
                                    </span>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <p className='mr-4'>{questions && questions.length} Questions</p>
                                    <p className='dot'>Published on: {moment(createdAt).format('MMM D, YYYY')} |</p>
                                    <p className='info'>
                                        <BsInfoCircle className='mr-1' />
                                        <span>This is not an interactive preview.</span>
                                    </p>
                                </FlexWrapper>
                            </AssessmentDetails>

                            <div style={{ marginBottom: '120px', marginTop: '24px' }}>
                                {
                                    questions.map((question, index) => (
                                        <QuestionWrapper key={question.id}>
                                            <QuestionText>Q{index + 1} - {question.questionText}</QuestionText>
                                            {question.type === 'text' || question.type === 'email' ? (
                                                <ReactQuill
                                                    placeholder='Type your answer here...'
                                                    readOnly={true}
                                                    formats={formats}
                                                    modules={modules} />
                                            ) : question.type === 'choice' ? (
                                                question.options.map(option => (
                                                    <RadioWrapper key={option.id}>
                                                        <Label className="radio">
                                                            <input type="radio" name="answer" className='mr-2' />
                                                            <p style={{ fontSize: '18px', fontWeight: '500', color: 'white' }}>{option.text}</p>
                                                        </Label>
                                                    </RadioWrapper>
                                                ))
                                            ) : question.type === 'multi choice' ? (
                                                question.options.map(option => (
                                                    <RadioWrapper key={option.id}>
                                                        <Label className="radio">
                                                            <input type="checkbox" className='mr-2' />
                                                            <p style={{ fontSize: '18px', fontWeight: '500', color: 'white' }}>{option.text}</p>
                                                        </Label>
                                                    </RadioWrapper>
                                                ))
                                            ) : question.type === 'code' ? (
                                                <>
                                                    <div style={{ maxWidth: '200px' }}>
                                                        <WindowedSelect
                                                            options={options}
                                                            onChange={handleChange}
                                                            value={selectedOption} />
                                                    </div>
                                                    <br />
                                                    <Editor
                                                        height="200px"
                                                        theme='dark'
                                                        language={language}
                                                        options={{ readOnly: true }}
                                                        editorDidMount={handleEditorDidMount}
                                                    />
                                                </>
                                            ) : null}
                                        </QuestionWrapper>
                                    ))
                                }
                            </div>

                            <DashboardFooter />
                        </Container>
                    </>
                )}
        </>
    )
}

export default AssessmentPreview