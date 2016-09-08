System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var sectionsArr, questionsArr, educationFieldsArr, EndUrlArr, returnUrl, tableNoData, ExperientialLearningArr, successMessageArr;
    return {
        setters:[],
        execute: function() {
            // Use the @Injectable decorator for your Constants class
            exports_1("sectionsArr", sectionsArr = [
                { routerLink: 'personalInfo', section: 'PersonalInfo', title: "My Personal Information", icon: "icon-personal-info" },
                { routerLink: 'careerGoals', section: 'CareerGoals', title: "My Career Goals", icon: "icon-career-goals" },
                { routerLink: 'educationPlans', section: 'EducationPlans', title: "My Education Plans", icon: "icon-education-plans" },
                { routerLink: 'careerAssessments', section: 'CareerAssessments', title: "Self-knowledge and Career Assessments", icon: "icon-self-knowledge-career-assess" },
                { routerLink: 'careerCluster', section: 'CareerCluster', title: "Career Clusters of Interest", icon: "icon-career-clusters-interest" },
                { routerLink: 'occAndCluster', section: 'OccAndCluster', title: "Occupations and Clusters of Interest", icon: "icon-occ-and-clusters-interest" },
                { routerLink: 'coursePlan', section: 'CoursePlan', title: "Course Plan", icon: "icon-course-plan" },
                { routerLink: 'graduationRequirements', section: 'GraduationRequirements', title: "Graduation Requirements", icon: "icon-grad-requirement" },
                { routerLink: 'testScores', section: 'TestScores', title: "Test Scores", icon: "icon-test-scores" },
                { routerLink: 'studyOfInterest', section: 'StudyOfInterest', title: "Programs of Study of Interest", icon: "icon-prog-of-study-of-interest" },
                { routerLink: 'schoolsOfInterest', section: 'SchoolsOfInterest', title: "Post-secondary Schools of Interest", icon: "icon-postsecondary-schools" },
                { routerLink: 'volunteerCommunityService', section: 'VolunteerCommunityService', title: "Volunteer and Community Service", icon: "icon-volun-comm-service" },
                { routerLink: 'extraActivities', section: 'ExtraActivities', title: "Extracurricular Activities", icon: "icon-extracurricular-activities" },
                { routerLink: 'employmentHistory', section: 'EmploymentHistory', title: "Employment History and Work-based Learning Experience", icon: "icon-employment-historyWork" },
                { routerLink: 'actionPlan', section: 'ActionPlan', title: "My Action Plan for this Year", icon: "icon-action-plan" },
                { routerLink: 'supportNetwork', section: 'SupportNetwork', title: "My Support Network", icon: "icon-support-network" },
                { routerLink: 'experientialLearning', section: 'ExperientialLearning', title: "Experiential Learning", icon: "icon-experiential-learning" },
                { routerLink: 'commentsAndSignature', section: 'CommentsAndSignature', title: "Comments and Signatures", icon: "icon-comments-sign" }
            ]);
            exports_1("questionsArr", questionsArr = [
                { section: 'CareerGoals', questions: ["What are your career goals?"] },
                { section: 'EducationPlans', questions: ["What are your educational plans after high school?",
                        "What other educational plans do you have?"] },
                { section: 'CareerCluster', questions: ["What career clusters interest you?"] },
                { section: 'GraduationRequirements', questions: ["Enter your planned and completed credits."] },
                { section: 'TestScores', questions: ["Enter up to 6 test names with test scores."] },
                { section: 'ActionPlan', questions: ["What is your action plan for this year?"] },
                { section: 'SupportNetwork', questions: ["Who will encourage and support you to achieve your goals?"] }
            ]);
            exports_1("educationFieldsArr", educationFieldsArr = [
                { label: "Bachelor's degree (4 years)", value: 'BD', selected: false },
                { label: "Associate degree (2 years)", value: 'AD', selected: false },
                { label: "Certificate", value: 'Cer', selected: false },
                { label: "Apprenticeship", value: 'App', selected: false },
                { label: "Military", value: 'Mil', selected: false },
                { label: "Employment", value: 'Emp', selected: false },
                { label: "No plan at this time", value: 'None', selected: false },
                { label: "Other", value: 'Other', selected: false }
            ]);
            exports_1("EndUrlArr", EndUrlArr = [
                { section: 'NewPassword', endUrl: 'PasswordReset', tokenUrl: 'PasswordResetTokenValid' },
                { section: 'UsernameRecovery', endUrl: 'UsernameRecovery' },
                { section: 'PasswordRecovery', endUrl: 'PasswordResetSendEmail' },
                { section: 'PersonalInfo', endUrl: 'Account' },
                { section: 'CareerGoals', endUrl: 'Reflection', fieldName: 'CareerGoals' },
                { section: 'EducationPlans', endUrl: 'Reflection', fieldNameCheck: 'PSPlansList', fieldNameRef: 'PSPlans' },
                { section: 'CareerAssessments', endUrl: 'SavedAnswers', fieldName: '' },
                { section: 'CareerCluster', endUrl: 'Reflection', fieldName: 'CareerFields', secondRef: 'OccClusters' },
                { section: 'OccAndCluster', endUrl: 'SavedFiles', fileName: 'Occ' },
                { section: 'CoursePlan', endUrl: 'CoursePlan' },
                { section: 'GraduationRequirements', endUrl: 'GraduationRequirements' },
                { section: 'TestScores', endUrl: 'TestScores' },
                { section: 'StudyOfInterest', endUrl: 'SavedFiles', fileName: 'Prog' },
                { section: 'SchoolsOfInterest', endUrl: 'SavedFiles', fileName: 'NSch' },
                { section: 'VolunteerCommunityService', endUrl: 'VolunteerExperiences' },
                { section: 'ExtraActivities', endUrl: 'Extracurricular' },
                { section: 'EmploymentHistory', endUrl: 'Employment' },
                { section: 'ActionPlan', endUrl: 'Reflection', fieldName: 'ActionPlan' },
                { section: 'SupportNetwork', endUrl: 'Reflection', fieldName: 'Network' },
                { section: 'ExperientialLearning', endUrl: 'ExperientialLearning' },
                { section: 'CommentsAndSignature', endUrl: 'CommentsAndSig' }
            ]);
            exports_1("returnUrl", returnUrl = {
                url: window.location.protocol + "//" + window.location.host + "/login/newPassword"
            });
            exports_1("tableNoData", tableNoData = [
                { section: ['CareerAssessments', 'OccAndCluster', 'CoursePlan', 'StudyOfInterest', 'SchoolsOfInterest',
                        'ExtraActivities', 'EmploymentHistory', 'VolunteerCommunityService'], text: "You do not have any data" }
            ]);
            exports_1("ExperientialLearningArr", ExperientialLearningArr = [
                { name: 'Youth/Pre-Apprenticeship', subName: 'ELPreApp', subNameList: 'ELPreAppList',
                    Myself: false, Careers: false, Future: false, Try: false },
                { name: 'Cooperative work experience', subName: 'ELCoopWork', subNameList: 'ELCoopWorkList',
                    Myself: false, Careers: false, Future: false, Try: false },
                { name: 'Service Learning', subName: 'ELService', subNameList: 'ELServiceList',
                    Myself: false, Careers: false, Future: false, Try: false },
                { name: 'Entrepreneurship', subName: 'ELEpren', subNameList: 'ELEprenList',
                    Myself: false, Careers: false, Future: false, Try: false },
                { name: 'Rotation/tour/field trip', subName: 'ELTour', subNameList: 'ELTourList',
                    Myself: false, Careers: false, Future: false, Try: false },
                { name: 'Internship', subName: 'ELIntern', subNameList: 'ELInternList',
                    Myself: false, Careers: false, Future: false, Try: false },
                { name: 'Box shadow', subName: 'ELShadow', subNameList: 'ELShadowList',
                    Myself: false, Careers: false, Future: false, Try: false },
                { name: 'Mentoring', subName: 'ELMentor', subNameList: 'ELMentorList',
                    Myself: false, Careers: false, Future: false, Try: false },
                { name: 'Work-based Learning', subName: 'ELWBLearn', subNameList: 'ELWBLearnList',
                    Myself: false, Careers: false, Future: false, Try: false }
            ]);
            exports_1("successMessageArr", successMessageArr = [
                { section: ['CareerGoals', 'EducationPlans', 'CareerCluster',
                        'ActionPlan', 'SupportNetwork', 'ExperientialLearning', 'PersonalInfo', 'TestScores', 'CommentsAndSignature'
                    ], save: "Data has been successfully saved.", update: "Data has been successfully updated", error: "Error occured while submitting the data." },
            ]);
        }
    }
});
//# sourceMappingURL=app.constants.js.map