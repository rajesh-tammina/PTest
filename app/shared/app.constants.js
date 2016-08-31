System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var sectionsArr, questionsArr, educationFieldsArr, EndUrlArr, returnUrl;
    return {
        setters:[],
        execute: function() {
            // Use the @Injectable decorator for your Constants class
            exports_1("sectionsArr", sectionsArr = [
                { routerLink: 'personalInfo', section: 'PersonalInfo', title: "Personal Info", icon: "fa-user" },
                { routerLink: 'careerGoals', section: 'CareerGoals', title: "Career Goals", icon: "fa-table" },
                { routerLink: 'educationPlans', section: 'EducationPlans', title: "Education Plans", icon: "fa-file-text-o" },
                { routerLink: 'careerAssessments', section: 'CareerAssessments', title: "Career Assessments", icon: "fa-cubes" },
                { routerLink: 'careerCluster', section: 'CareerCluster', title: "Career Cluster", icon: "fa-user" },
                { routerLink: 'occAndCluster', section: 'OccAndCluster', title: "Occ And Cluster", icon: "fa-table" },
                { routerLink: 'coursePlan', section: 'CoursePlan', title: "Course Plan", icon: "fa-file-text-o" },
                { routerLink: 'graduationRequirements', section: 'GraduationRequirements', title: "Graduation Requirements", icon: "fa-cubes" },
                { routerLink: 'testScores', section: 'TestScores', title: "Test Scores", icon: "fa-user" },
                { routerLink: 'studyOfInterest', section: 'StudyOfInterest', title: "Study Of Interest", icon: "fa-table" },
                { routerLink: 'schoolsOfInterest', section: 'SchoolsOfInterest', title: "Schools Of Interest", icon: "fa-file-text-o" },
                { routerLink: 'volunteerCommunityService', section: 'VolunteerCommunityService', title: "Volunteer Community Service", icon: "fa-cubes" },
                { routerLink: 'extraActivities', section: 'ExtraActivities', title: "Extra Activities", icon: "fa-user" },
                { routerLink: 'employmentHistory', section: 'EmploymentHistory', title: "Employment History", icon: "fa-table" },
                { routerLink: 'actionPlan', section: 'ActionPlan', title: "Action Plan", icon: "fa-file-text-o" },
                { routerLink: 'supportNetwork', section: 'SupportNetwork', title: "Support Network", icon: "fa-cubes" },
                { routerLink: 'experientialLearning', section: 'ExperientialLearning', title: "Experiential Learning", icon: "fa-user" },
                { routerLink: 'experLearningTypes', section: 'ExperientialLearningTypes', title: "Experiential Learning Types", icon: "fa-table" },
                { routerLink: 'commentsAndSignature', section: 'CommentsAndSignature', title: "Comments And Signature", icon: "fa-file-text-o" }
            ]);
            exports_1("questionsArr", questionsArr = [
                { section: 'CareerGoals', questions: ["What are your career goals?"] },
                { section: 'EducationPlans', questions: ["What are your educational plans after high school?",
                        "What other educational plans do you have?"] },
                { section: 'CareerCluster', questions: ["What career clusters interest you?"] },
                { section: 'GraduationRequirements', questions: ["Enter your planned and completed credits."] },
                { section: 'TestScores', questions: ["Enter up to 6 test names with test scores."] },
                { section: 'ActionPlan', questions: ["What is your action plan for this year?"] },
                { section: 'ExperientialLearning', questions: ["What is experiential learning?"] },
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
                { section: 'ExperientialLearning', endUrl: 'Reflection', fieldName: 'TBD' },
                { section: 'ExperientialLearningTypes',
                    endUrl: 'Reflection', fn1: 'ELPreApp', fn2: 'ELPreAppList',
                    fn3: 'ELCoopWork', fn4: 'ELCoopWorkList',
                    fn5: 'ELService', fn6: 'ELServiceList',
                    fn7: 'ELEpren', fn8: 'ELEprenList',
                    fn9: 'ELTour', fn10: 'ELTourList',
                    fn11: 'ELIntern', fn12: 'ELInternList',
                    fn13: 'ELShadow', fn14: 'ELShadowList',
                    fn15: 'ELMentor', fn16: 'ELMentorList',
                    fn17: 'ELWBLearn', fn18: 'ELWBLearnList' },
                { section: 'CommentsAndSignature', endUrl: 'CommentsAndSig' }
            ]);
            exports_1("returnUrl", returnUrl = {
                url: "http://localhost:3000/newPassword/uname/stateAbbr/token"
            });
        }
    }
});
//# sourceMappingURL=app.constants.js.map