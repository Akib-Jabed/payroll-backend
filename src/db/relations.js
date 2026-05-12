import { relations } from "drizzle-orm/relations";
import {
	accFiscalYear, accLedgers, accVoucher, banksOriginal, companies, costCenter, files, hrAbsentEntry, hrAbsentEntryFileUpload, hrAbsentSetup, hrAbsentTemplate, hrAccountingSetup, hrAdvance, hrAdvancePaymentHistory, hrAdvancePaymentTemplate, hrAttendance, hrAttendanceCalculationInfo, hrAttendanceCalendarFileImport, hrAttendanceEntry, hrAttendanceEntryError, hrAttendanceFileImport, hrAttendanceFileImportErrors, hrAttendanceMonthly, hrAttendanceUpdateHistory, hrBankBranchMaster, hrBankMaster, hrBonusSetup, hrBonusSetupHistory, hrBusinessUnit, hrCalendarSetup, hrCity, hrCompanySetup, hrCompensatoryLeave, hrContactEmployeeDetails, hrDeductionHeads, hrDeductionHeadsHistory, hrDenomination, hrDepartments, hrDesignationMaster, hrEarningHeads, hrEarningHeadsHistory, hrEducation, hrEducationConcentrations, hrEducationLevels, hrEmployee, hrEmployeeBonusInfo, hrEmployeeBonusInfoHistory, hrEmployeeBonusInfoIndividualHistory, hrEmployeeCostCenterSetup, hrEmployeeCostCenterSetupDetails, hrEmployeeDescription, hrEmployeeEducationFileImport, hrEmployeeExperienceFileImport, hrEmployeeHistory, hrEmployeeInsertFileImport, hrEmployeeNatureType, hrEmployeeSalaryBusinessUnit, hrEmployeeSalaryBusinessUnitHistory, hrEmployeeSalaryInfo, hrEmployeeSalaryInfoHistory, hrEmployeeTaxChangesHistory, hrEmployeeTaxInfo, hrEmployeeTaxInfoDetails, hrEmployeeTransfer, hrEmployeeUpdateFileImport, hrEmployeeWeekends, hrEquivalentDesignation, hrExamTitles, hrExperience, hrFarewell, hrFinalSettlement, hrFinalSettlementDetails, hrFinalSettlementHistory, hrFinalSettlementPerformanceStatusProviders, hrFingerPrintMargeFileImport, hrFingerPrintMargeRecord, hrFpMachineSyncLog, hrFpMachineUserTemplates, hrFpMachineUsers, hrFpMachines, hrFpPages, hrFpUserPermission, hrGrades, hrGroupSetup, hrHoldingHeads, hrHolidayType, hrHolidays, hrIncrementFileImport, hrIncrementRecords, hrInstitutes, hrJobDescription, hrJobPerformanceArea, hrLatePresent, hrLeaveApplication, hrLeaveApplicationFileImport, hrLeaveBalance, hrLeaveBalanceDetails, hrLeaveBalanceFileImport, hrLeaveCalculation, hrLeaveCalculationDetails, hrLeaveEncashment, hrLeaveEncashmentDetails, hrLeaveEncashmentHistory, hrLeaveEncashmentSetup, hrLeavePolicy, hrLeavePolicyTemplate, hrLeavePolicyUpdateHistory, hrLeaveType, hrLeaveYear, hrLeaveYearHistory, hrLeavingDates, hrManPowerBudget, hrManPowerBudgetFileImport, hrManualOvertime, hrManualOvertimeEntry, hrManualOvertimeHistory, hrMenu, hrMenuSubmenu, hrMobileBankingDetails, hrOrganizationSetup, hrOrganizationSetupChangeRecords, hrOrganizationSetupFileImport, hrOrganizationSetupHistory, hrOverStaySetupFileImport, hrOverstayEntryMonthly, hrOverstayEntryMonthlyHistory, hrOverstayFileImport, hrOverstaySetup, hrOverstaySetupHistory, hrOverstayTemplate, hrOvertime, hrOvertimeFileImport, hrOvertimeHistory, hrOvertimeSetupFileImport, hrOvertimeTemplate, hrPagePermission, hrPaySlipDetailsIndividualHistory, hrPaySlipEmployeeInfo, hrPaySlipGeneration, hrPaySlipGenerationDetails, hrPaySlipGenerationDetailsHistory, hrPaySlipGenerationHistory, hrPaySlipGenerationInfo, hrPayStructureAmountUpdateHistory, hrPayStructureRecordsHistory, hrPayStructureSetup, hrPayStructureSetupFileImport, hrPayStructureSetupHistory, hrPayStructureSetupRecords, hrPayStructureTemplate, hrPayStructureTemplateDetails, hrPayStructureTemplateDetailsHistory, hrPayStructureTemplateHistory, hrPayStructureVariableInput, hrPayment, hrPortalAccessRecords, hrPrefix, hrPresentCompany, hrPresentOffdayFileImport, hrPresentOffdayMaster, hrPresentOffdayMasterHistory, hrPresentOffdayMonthly, hrPresentOffdayMonthlyHistory, hrPresentOffdaySetupFileImport, hrPresentOffdayTemplate, hrProfessionType, hrProjectPermission, hrProjectwiseRoleAssign, hrProjectwiseTemplateAssign, hrPromotionInfo, hrProvidentFundDetails, hrProvidentFundSetup, hrProvidentFundTemplate, hrReference, hrSalaryBusinessUnit, hrShiftMaster, hrTaxArea, hrTaxAreaType, hrTaxBonusSetup, hrTaxCalculationRange, hrTaxCalculationRangeHistory, hrTaxChallanEmployee, hrTaxChallanEntry, hrTaxChallanEntryFileImport, hrTaxChallanEntryHistory, hrTaxPolicyEarningHeadWise, hrTaxPolicyEarningHeadWiseHistory, hrTaxRecalculate, hrTaxTemplate, hrTaxTemplateHistory, hrTrainingCertification, hrTransferredCompany, hrTransferredEmployeesSalary, hrVariableInputFileImport, hrVariableInputHistory, hrWeekend, hrWorkStation, hrisCandidateUserAddresses, hrisCandidateUserEducations, hrisCandidateUserExperiences, hrisCandidateUserReferences, hrisCandidateUserTrainings, hrisCandidateUsers, hrisCiteriaMaster, hrisDepartmentalBudget, hrisDepartmentalBudgetDetails, hrisDocumentMaster, hrisEmployeeSittingArragementDetails, hrisEmployeeStationaryRequisitionDetails, hrisEvaluationScoreMaster, hrisFileArchiveDocumentFor, hrisFileArchiveDocumentType, hrisFileArchiveEntry, hrisFileArchiveEntryDetails, hrisGuestInterViewerDetails, hrisInterViewBoard, hrisInterViewSetupDetails, hrisInterViewTimeScheduleDetails, hrisInterViewerDetails, hrisInterviewAppraise, hrisInterviewAppraisedCandidates, hrisInterviewAppraisedCharacteristics, hrisInterviewAppraisedRatings, hrisInterviewAppraisedReferences, hrisInterviewBoardMaster, hrisInterviewBoardMasterInterviewerDetails, hrisItGoodsDetails, hrisItGoodsItemsDetails, hrisJobAdvertisementBillEntry, hrisJobAdvertisements, hrisJobApplicationHistory, hrisJobApplications, hrisJobCreate, hrisJobCreateDetails, hrisJobDescription, hrisJobDescriptionDimension, hrisJobDescriptionExperience, hrisJobDescriptionExternalCustomer, hrisJobDescriptionInternalCustomer, hrisJobDescriptionNonPerformingAreas, hrisJobDescriptionPerformingArea, hrisJobDescriptionQualification, hrisJobDescriptionQualityParameter, hrisJobDescriptionSoftSkill, hrisJobDescriptionSpecialRequirement, hrisJobDescriptionTechnicalSkill, hrisJobRequisitionApprovalActivities, hrisJobRequisitionSummery, hrisJobRequisitionSummeryPotentialCandidateCv, hrisJobRequisitions, hrisJobResponsibilities, hrisManPowerPlanning, hrisManPowerPlanningDetails, hrisMarkingSystemMaster, hrisMediaMaster, hrisMediaType, hrisPerformanceAppraisalDateRanges, hrisPerformanceAppraisalSetup, hrisPmsScoreMaster, hrisRentAgreementBenificiaryDetails, hrisRentAgreementDetails, hrisRentAgreementLessorsDetails, hrisRentAgreementPaymentDetails, hrisRentAgreementRentDetails, hrisRentGenerationAttachmentsDetails, hrisRentGenerationDetails, hrisRentGenerationPaymentDetails, hrisResidentDetails, hrisResidentFlatDetails, hrisResidentFlatRoomDetails, hrisResidentFloorDetails, hrisResponsibilityMatrixFunction, hrisResponsibilityMatrixIncharge, hrisResponsibilityMatrixSubFunction, hrisResponsibilitySubFunctionDetails, hrisSpecialNotes, hrisTalentAcquisitionJoiningDetails, hrisTalentAcquisitionJoiningHandoverDocumentsDetails, hrisTalentAcquisitionJoiningReceiveDocumentsDetails, hrisTraitsMaster, hrisTraitsSetupDetails, hrisUtilityGenerationAttachmentsDetails, hrisUtilityGenerationChargeDetails, hrisUtilityGenerationDetails, hrisUtilityGenerationPaymentDetails, hrisUtilityService, hrisWorkStationDetails, hrisWorkStationFlatDetails, hrisWorkStationFlatRoomDetails, hrisWorkStationFloorDetails,
	personalInfo,
	porAdvance, porAppFcmTokens, porAttendance, porCertificateMaster, porCertificateRequest, porCompensatoryLeaves, porEmployee, porEmployeeAppraisalDetails, porEmployeeAppraisalTargetDetails, porEmployeeCarAit, porEmployeeHr, porEmployeeHrDetails, porEmployeeReview, porEmployeeSupervisor, porEmployeeTinInfo, porItGoodsDetails, porJobDescriptionAdditionalDimensions, porJobDescriptionAdditionalExperiences, porJobDescriptionAdditionalExternalCustomers, porJobDescriptionAdditionalInternalCustomers, porJobDescriptionAdditionalPerformingAreas, porJobDescriptionAdditionalPerformingAreasHistory, porJobDescriptionAdditionalQualifications, porJobDescriptionAdditionalQualificationsHistory, porJobDescriptionAdditionalQualityParameters, porJobDescriptionAdditionalQualityParametersHistory, porJobDescriptionAdditionalSoftSkills, porJobDescriptionAdditionalSoftSkillsHistory, porJobDescriptionAdditionalSpecialRequirements, porJobDescriptionAdditionalSpecialRequirementsHistory, porJobDescriptionAdditionalTechSkills, porJobDescriptionAdditionalTechSkillsHistory, porJobRequisitions, porLeave, porLeaveDetails, porPerformanceAppraise, porPerformanceAppraiseAchievements, porPerformanceAppraiseDetails, porPerformanceAppraiseTraits, projects, users
} from "./schema.js";


export const companiesRelations = relations(companies, ({ many }) => ({
	accVouchers: many(accVoucher),
	hrOrganizationSetups: many(hrOrganizationSetup),
	hrPromotionInfos: many(hrPromotionInfo),
	projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
	accVouchers: many(accVoucher),
	costCenters: many(costCenter),
	hrAbsentSetups: many(hrAbsentSetup),
	hrAdvances_idCurSalBusUnit: many(hrAdvance, {
		relationName: "hrAdvance_idCurSalBusUnit_projects_idProjects"
	}),
	hrAdvances_idCurBusinessUnit: many(hrAdvance, {
		relationName: "hrAdvance_idCurBusinessUnit_projects_idProjects"
	}),
	hrAdvancePaymentHistories: many(hrAdvancePaymentHistory),
	hrAttendances: many(hrAttendance),
	hrAttendanceCalculationInfos: many(hrAttendanceCalculationInfo),
	hrAttendanceCalendarFileImports: many(hrAttendanceCalendarFileImport),
	hrAttendanceEntries: many(hrAttendanceEntry),
	hrAttendanceMonthlies: many(hrAttendanceMonthly),
	hrBonusSetups: many(hrBonusSetup),
	hrCompensatoryLeaves: many(hrCompensatoryLeave),
	hrContactEmployeeDetails: many(hrContactEmployeeDetails),
	hrEmployeeCostCenterSetups: many(hrEmployeeCostCenterSetup),
	hrEmployeeEducationFileImports: many(hrEmployeeEducationFileImport),
	hrEmployeeExperienceFileImports: many(hrEmployeeExperienceFileImport),
	hrEmployeeInsertFileImports: many(hrEmployeeInsertFileImport),
	hrEmployeeSalaryBusinessUnits: many(hrEmployeeSalaryBusinessUnit),
	hrEmployeeTransfers_previousBusinessUnitId: many(hrEmployeeTransfer, {
		relationName: "hrEmployeeTransfer_previousBusinessUnitId_projects_idProjects"
	}),
	hrEmployeeTransfers_currentBusinessUnitId: many(hrEmployeeTransfer, {
		relationName: "hrEmployeeTransfer_currentBusinessUnitId_projects_idProjects"
	}),
	hrEmployeeUpdateFileImports: many(hrEmployeeUpdateFileImport),
	hrFinalSettlements: many(hrFinalSettlement),
	hrHoldingHeads: many(hrHoldingHeads),
	hrIncrementFileImports: many(hrIncrementFileImport),
	hrLeaveApplications: many(hrLeaveApplication),
	hrLeaveApplicationFileImports: many(hrLeaveApplicationFileImport),
	hrLeaveBalances: many(hrLeaveBalance),
	hrLeaveEncashments: many(hrLeaveEncashment),
	hrLeaveEncashmentHistories: many(hrLeaveEncashmentHistory),
	hrLeaveEncashmentSetups: many(hrLeaveEncashmentSetup),
	hrManPowerBudgets: many(hrManPowerBudget),
	hrManPowerBudgetFileImports: many(hrManPowerBudgetFileImport),
	hrManualOvertimes: many(hrManualOvertime),
	hrManualOvertimeEntries: many(hrManualOvertimeEntry),
	hrOrganizationSetups_idBusinessUnit: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_idBusinessUnit_projects_idProjects"
	}),
	hrOrganizationSetups_worksForBuId: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_worksForBuId_projects_idProjects"
	}),
	hrOrganizationSetupFileImports: many(hrOrganizationSetupFileImport),
	hrOverStaySetupFileImports: many(hrOverStaySetupFileImport),
	hrOverstayEntryMonthlies: many(hrOverstayEntryMonthly),
	hrOverstaySetups: many(hrOverstaySetup),
	hrOvertimes: many(hrOvertime),
	hrOvertimeSetupFileImports: many(hrOvertimeSetupFileImport),
	hrPagePermissions: many(hrPagePermission),
	hrPaySlipEmployeeInfos: many(hrPaySlipEmployeeInfo),
	hrPaySlipGenerations: many(hrPaySlipGeneration),
	hrPaySlipGenerationDetails: many(hrPaySlipGenerationDetails),
	hrPayStructureSetupFileImports: many(hrPayStructureSetupFileImport),
	hrPayStructureVariableInputs: many(hrPayStructureVariableInput),
	hrPrefixes: many(hrPrefix),
	hrPresentCompanies: many(hrPresentCompany),
	hrPresentOffdayMasters: many(hrPresentOffdayMaster),
	hrPresentOffdayMonthlies: many(hrPresentOffdayMonthly),
	hrPresentOffdaySetupFileImports: many(hrPresentOffdaySetupFileImport),
	hrProjectPermissions: many(hrProjectPermission),
	hrProjectwiseRoleAssigns: many(hrProjectwiseRoleAssign),
	hrProjectwiseTemplateAssigns: many(hrProjectwiseTemplateAssign),
	hrPromotionInfos: many(hrPromotionInfo),
	hrProvidentFundSetups: many(hrProvidentFundSetup),
	hrProvidentFundTemplates: many(hrProvidentFundTemplate),
	hrSalaryBusinessUnits: many(hrSalaryBusinessUnit),
	hrTaxChallanEntries: many(hrTaxChallanEntry),
	hrTransferredCompanies: many(hrTransferredCompany),
	hrTransferredEmployeesSalaries: many(hrTransferredEmployeesSalary),
	hrVariableInputFileImports: many(hrVariableInputFileImport),
	hrisCiteriaMasters: many(hrisCiteriaMaster),
	hrisDepartmentalBudgets: many(hrisDepartmentalBudget),
	hrisDocumentMasters: many(hrisDocumentMaster),
	hrisEmployeeSittingArragementDetails: many(hrisEmployeeSittingArragementDetails),
	hrisEmployeeStationaryRequisitionDetails: many(hrisEmployeeStationaryRequisitionDetails),
	hrisEvaluationScoreMasters: many(hrisEvaluationScoreMaster),
	hrisGuestInterViewerDetails: many(hrisGuestInterViewerDetails),
	hrisInterViewBoards: many(hrisInterViewBoard),
	hrisInterViewSetupDetails: many(hrisInterViewSetupDetails),
	hrisInterViewTimeScheduleDetails: many(hrisInterViewTimeScheduleDetails),
	hrisInterViewerDetails: many(hrisInterViewerDetails),
	hrisInterviewBoardMasters: many(hrisInterviewBoardMaster),
	hrisInterviewBoardMasterInterviewerDetails: many(hrisInterviewBoardMasterInterviewerDetails),
	hrisItGoodsDetails: many(hrisItGoodsDetails),
	hrisItGoodsItemsDetails: many(hrisItGoodsItemsDetails),
	hrisJobAdvertisementBillEntries: many(hrisJobAdvertisementBillEntry),
	hrisJobCreates: many(hrisJobCreate),
	hrisJobDescriptions: many(hrisJobDescription),
	hrisJobRequisitionSummeries: many(hrisJobRequisitionSummery),
	hrisManPowerPlannings: many(hrisManPowerPlanning),
	hrisMarkingSystemMasters: many(hrisMarkingSystemMaster),
	hrisPmsScoreMasters: many(hrisPmsScoreMaster),
	hrisRentAgreementBenificiaryDetails: many(hrisRentAgreementBenificiaryDetails),
	hrisRentAgreementDetails: many(hrisRentAgreementDetails),
	hrisTalentAcquisitionJoiningDetails: many(hrisTalentAcquisitionJoiningDetails),
	hrisTalentAcquisitionJoiningHandoverDocumentsDetails: many(hrisTalentAcquisitionJoiningHandoverDocumentsDetails),
	hrisTalentAcquisitionJoiningReceiveDocumentsDetails: many(hrisTalentAcquisitionJoiningReceiveDocumentsDetails),
	hrisTraitsMasters: many(hrisTraitsMaster),
	hrisTraitsSetupDetails: many(hrisTraitsSetupDetails),
	porAdvances: many(porAdvance),
	porCertificateMasters: many(porCertificateMaster),
	porEmployeeAppraisalDetails: many(porEmployeeAppraisalDetails),
	porEmployeeAppraisalTargetDetails: many(porEmployeeAppraisalTargetDetails),
	porItGoodsDetails: many(porItGoodsDetails),
	porJobRequisitions: many(porJobRequisitions),
	porLeaves: many(porLeave),
	company: one(companies, {
		fields: [projects.idCompanies],
		references: [companies.idCompanies]
	}),
}));

export const costCenterRelations = relations(costCenter, ({ one, many }) => ({
	project: one(projects, {
		fields: [costCenter.idProjects],
		references: [projects.idProjects]
	}),
	hrEmployeeCostCenterSetupDetails: many(hrEmployeeCostCenterSetupDetails),
	hrisRentAgreementBenificiaryDetails: many(hrisRentAgreementBenificiaryDetails),
}));

export const hrAbsentEntryRelations = relations(hrAbsentEntry, ({ one }) => ({
	hrAbsentEntryFileUpload: one(hrAbsentEntryFileUpload, {
		fields: [hrAbsentEntry.idHrAbsentEntryFileUpload],
		references: [hrAbsentEntryFileUpload.idHrAbsentEntryFileUpload]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrAbsentEntry.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrAbsentEntryFileUploadRelations = relations(hrAbsentEntryFileUpload, ({ many }) => ({
	hrAbsentEntries: many(hrAbsentEntry),
}));

export const hrEmployeeRelations = relations(hrEmployee, ({ many }) => ({
	hrAbsentEntries: many(hrAbsentEntry),
	hrAdvances: many(hrAdvance),
	hrAdvancePaymentHistories: many(hrAdvancePaymentHistory),
	hrAttendances: many(hrAttendance),
	hrAttendanceMonthlies: many(hrAttendanceMonthly),
	hrCompensatoryLeaves: many(hrCompensatoryLeave),
	hrContactEmployeeDetails: many(hrContactEmployeeDetails),
	hrEducations: many(hrEducation),
	hrEmployeeBonusInfos: many(hrEmployeeBonusInfo),
	hrEmployeeCostCenterSetups: many(hrEmployeeCostCenterSetup),
	hrEmployeeDescriptions: many(hrEmployeeDescription),
	hrEmployeeHistories: many(hrEmployeeHistory),
	hrEmployeeSalaryBusinessUnits: many(hrEmployeeSalaryBusinessUnit),
	hrEmployeeSalaryBusinessUnitHistories: many(hrEmployeeSalaryBusinessUnitHistory),
	hrEmployeeSalaryInfos: many(hrEmployeeSalaryInfo),
	hrEmployeeTaxChangesHistories: many(hrEmployeeTaxChangesHistory),
	hrEmployeeTaxInfos: many(hrEmployeeTaxInfo),
	hrEmployeeTaxInfoDetails: many(hrEmployeeTaxInfoDetails),
	hrEmployeeTransfers: many(hrEmployeeTransfer),
	hrEmployeeWeekends: many(hrEmployeeWeekends),
	hrExperiences: many(hrExperience),
	hrFarewells: many(hrFarewell),
	hrFinalSettlements: many(hrFinalSettlement),
	hrFinalSettlementDetails: many(hrFinalSettlementDetails),
	hrFinalSettlementPerformanceStatusProviders: many(hrFinalSettlementPerformanceStatusProviders),
	hrFingerPrintMargeRecords: many(hrFingerPrintMargeRecord),
	hrIncrementRecords: many(hrIncrementRecords),
	hrLeaveApplications: many(hrLeaveApplication),
	hrLeaveBalances: many(hrLeaveBalance),
	hrLeaveEncashmentDetails: many(hrLeaveEncashmentDetails),
	hrLeaveEncashmentHistories: many(hrLeaveEncashmentHistory),
	hrLeavingDates: many(hrLeavingDates),
	hrManualOvertimes: many(hrManualOvertime),
	hrManualOvertimeEntries: many(hrManualOvertimeEntry),
	hrManualOvertimeHistories: many(hrManualOvertimeHistory),
	hrOrganizationSetups_employeeId: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_employeeId_hrEmployee_employeeId"
	}),
	hrOrganizationSetups_reportingSupervisorId: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_reportingSupervisorId_hrEmployee_employeeId"
	}),
	hrOrganizationSetups_deptHeadId: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_deptHeadId_hrEmployee_employeeId"
	}),
	hrOrganizationSetups_lineSupervisorId: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_lineSupervisorId_hrEmployee_employeeId"
	}),
	hrOrganizationSetupChangeRecords: many(hrOrganizationSetupChangeRecords),
	hrOrganizationSetupHistories: many(hrOrganizationSetupHistory),
	hrOverstayEntryMonthlies: many(hrOverstayEntryMonthly),
	hrOverstayEntryMonthlyHistories: many(hrOverstayEntryMonthlyHistory),
	hrOverstaySetups: many(hrOverstaySetup),
	hrOverstaySetupHistories: many(hrOverstaySetupHistory),
	hrOvertimes: many(hrOvertime),
	hrOvertimeHistories: many(hrOvertimeHistory),
	hrPaySlipDetailsIndividualHistories: many(hrPaySlipDetailsIndividualHistory),
	hrPaySlipEmployeeInfos: many(hrPaySlipEmployeeInfo),
	hrPaySlipGenerationDetails: many(hrPaySlipGenerationDetails),
	hrPaySlipGenerationInfos: many(hrPaySlipGenerationInfo),
	hrPayStructureSetups: many(hrPayStructureSetup),
	hrPayStructureSetupRecords: many(hrPayStructureSetupRecords),
	hrPayStructureVariableInputs: many(hrPayStructureVariableInput),
	hrPortalAccessRecords: many(hrPortalAccessRecords),
	hrPresentCompanies: many(hrPresentCompany),
	hrPresentOffdayMasters: many(hrPresentOffdayMaster),
	hrPresentOffdayMasterHistories: many(hrPresentOffdayMasterHistory),
	hrPresentOffdayMonthlies: many(hrPresentOffdayMonthly),
	hrPresentOffdayMonthlyHistories: many(hrPresentOffdayMonthlyHistory),
	hrPromotionInfos: many(hrPromotionInfo),
	hrProvidentFundDetails: many(hrProvidentFundDetails),
	hrProvidentFundSetups: many(hrProvidentFundSetup),
	hrReferences: many(hrReference),
	hrTaxChallanEmployees: many(hrTaxChallanEmployee),
	hrTrainingCertifications: many(hrTrainingCertification),
	hrTransferredCompanies: many(hrTransferredCompany),
	hrTransferredEmployeesSalaries: many(hrTransferredEmployeesSalary),
	hrisEmployeeSittingArragementDetails: many(hrisEmployeeSittingArragementDetails),
	hrisEmployeeStationaryRequisitionDetails_employeeId: many(hrisEmployeeStationaryRequisitionDetails, {
		relationName: "hrisEmployeeStationaryRequisitionDetails_employeeId_hrEmployee_employeeId"
	}),
	hrisEmployeeStationaryRequisitionDetails_stationaryProductConcernEmployeeId: many(hrisEmployeeStationaryRequisitionDetails, {
		relationName: "hrisEmployeeStationaryRequisitionDetails_stationaryProductConcernEmployeeId_hrEmployee_employeeId"
	}),
	hrisFileArchiveEntries: many(hrisFileArchiveEntry),
	hrisInterViewerDetails: many(hrisInterViewerDetails),
	hrisInterviewAppraises: many(hrisInterviewAppraise),
	hrisInterviewBoardMasterInterviewerDetails: many(hrisInterviewBoardMasterInterviewerDetails),
	hrisItGoodsDetails_employeeId: many(hrisItGoodsDetails, {
		relationName: "hrisItGoodsDetails_employeeId_hrEmployee_employeeId"
	}),
	hrisItGoodsDetails_concernSupervisorId: many(hrisItGoodsDetails, {
		relationName: "hrisItGoodsDetails_concernSupervisorId_hrEmployee_employeeId"
	}),
	hrisItGoodsDetails_concernItPersonId: many(hrisItGoodsDetails, {
		relationName: "hrisItGoodsDetails_concernItPersonId_hrEmployee_employeeId"
	}),
	hrisJobAdvertisementBillEntries_approver1: many(hrisJobAdvertisementBillEntry, {
		relationName: "hrisJobAdvertisementBillEntry_approver1_hrEmployee_employeeId"
	}),
	hrisJobAdvertisementBillEntries_approver2: many(hrisJobAdvertisementBillEntry, {
		relationName: "hrisJobAdvertisementBillEntry_approver2_hrEmployee_employeeId"
	}),
	hrisJobAdvertisementBillEntries_accountPayable: many(hrisJobAdvertisementBillEntry, {
		relationName: "hrisJobAdvertisementBillEntry_accountPayable_hrEmployee_employeeId"
	}),
	hrisJobAdvertisementBillEntries_idUser: many(hrisJobAdvertisementBillEntry, {
		relationName: "hrisJobAdvertisementBillEntry_idUser_hrEmployee_employeeId"
	}),
	hrisJobApplicationHistories: many(hrisJobApplicationHistory),
	hrisJobCreates: many(hrisJobCreate),
	hrisJobDescriptions_reportingTo: many(hrisJobDescription, {
		relationName: "hrisJobDescription_reportingTo_hrEmployee_employeeId"
	}),
	hrisJobDescriptions_idUsers: many(hrisJobDescription, {
		relationName: "hrisJobDescription_idUsers_hrEmployee_employeeId"
	}),
	hrisJobDescriptionNonPerformingAreas: many(hrisJobDescriptionNonPerformingAreas),
	hrisJobRequisitions_idRecruitmentOfficer: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idRecruitmentOfficer_hrEmployee_employeeId"
	}),
	hrisJobRequisitions_idHrRecommendation: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idHrRecommendation_hrEmployee_employeeId"
	}),
	hrisJobRequisitions_idCooRecommendation: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idCooRecommendation_hrEmployee_employeeId"
	}),
	hrisJobRequisitions_idRequester: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idRequester_hrEmployee_employeeId"
	}),
	hrisJobRequisitions_idDivisionalHr: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idDivisionalHr_hrEmployee_employeeId"
	}),
	hrisJobRequisitions_idRecommender: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idRecommender_hrEmployee_employeeId"
	}),
	hrisJobRequisitions_idProjectHr: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idProjectHr_hrEmployee_employeeId"
	}),
	hrisJobRequisitions_idCooChro: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idCooChro_hrEmployee_employeeId"
	}),
	hrisJobRequisitions_idCeo: many(hrisJobRequisitions, {
		relationName: "hrisJobRequisitions_idCeo_hrEmployee_employeeId"
	}),
	hrisRentAgreementDetails_representorEmployeeId: many(hrisRentAgreementDetails, {
		relationName: "hrisRentAgreementDetails_representorEmployeeId_hrEmployee_employeeId"
	}),
	hrisRentAgreementDetails_apEmployeeId: many(hrisRentAgreementDetails, {
		relationName: "hrisRentAgreementDetails_apEmployeeId_hrEmployee_employeeId"
	}),
	hrisRentAgreementDetails_accountantEmployeeId: many(hrisRentAgreementDetails, {
		relationName: "hrisRentAgreementDetails_accountantEmployeeId_hrEmployee_employeeId"
	}),
	hrisRentGenerationDetails_approvedBy: many(hrisRentGenerationDetails, {
		relationName: "hrisRentGenerationDetails_approvedBy_hrEmployee_employeeId"
	}),
	hrisRentGenerationDetails_apEmployeeId: many(hrisRentGenerationDetails, {
		relationName: "hrisRentGenerationDetails_apEmployeeId_hrEmployee_employeeId"
	}),
	hrisRentGenerationDetails_accountantEmployeeId: many(hrisRentGenerationDetails, {
		relationName: "hrisRentGenerationDetails_accountantEmployeeId_hrEmployee_employeeId"
	}),
	hrisRentGenerationDetails_checkedBy: many(hrisRentGenerationDetails, {
		relationName: "hrisRentGenerationDetails_checkedBy_hrEmployee_employeeId"
	}),
	hrisRentGenerationDetails_submittedBy: many(hrisRentGenerationDetails, {
		relationName: "hrisRentGenerationDetails_submittedBy_hrEmployee_employeeId"
	}),
	hrisRentGenerationDetails_certifiedBy: many(hrisRentGenerationDetails, {
		relationName: "hrisRentGenerationDetails_certifiedBy_hrEmployee_employeeId"
	}),
	hrisTalentAcquisitionJoiningDetails_concernSuperVisorId: many(hrisTalentAcquisitionJoiningDetails, {
		relationName: "hrisTalentAcquisitionJoiningDetails_concernSuperVisorId_hrEmployee_employeeId"
	}),
	hrisTalentAcquisitionJoiningDetails_concernHrId: many(hrisTalentAcquisitionJoiningDetails, {
		relationName: "hrisTalentAcquisitionJoiningDetails_concernHrId_hrEmployee_employeeId"
	}),
	hrisUtilityGenerationDetails_approvedBy: many(hrisUtilityGenerationDetails, {
		relationName: "hrisUtilityGenerationDetails_approvedBy_hrEmployee_employeeId"
	}),
	hrisUtilityGenerationDetails_apEmployeeId: many(hrisUtilityGenerationDetails, {
		relationName: "hrisUtilityGenerationDetails_apEmployeeId_hrEmployee_employeeId"
	}),
	hrisUtilityGenerationDetails_accountantEmployeeId: many(hrisUtilityGenerationDetails, {
		relationName: "hrisUtilityGenerationDetails_accountantEmployeeId_hrEmployee_employeeId"
	}),
	hrisUtilityGenerationDetails_submittedBy: many(hrisUtilityGenerationDetails, {
		relationName: "hrisUtilityGenerationDetails_submittedBy_hrEmployee_employeeId"
	}),
	hrisUtilityGenerationDetails_checkedBy: many(hrisUtilityGenerationDetails, {
		relationName: "hrisUtilityGenerationDetails_checkedBy_hrEmployee_employeeId"
	}),
	hrisUtilityGenerationDetails_certifiedBy: many(hrisUtilityGenerationDetails, {
		relationName: "hrisUtilityGenerationDetails_certifiedBy_hrEmployee_employeeId"
	}),
	porAdvances_idEmployee: many(porAdvance, {
		relationName: "porAdvance_idEmployee_hrEmployee_employeeId"
	}),
	porAdvances_approvedSupervisorId: many(porAdvance, {
		relationName: "porAdvance_approvedSupervisorId_hrEmployee_employeeId"
	}),
	porAdvances_approvedHrId: many(porAdvance, {
		relationName: "porAdvance_approvedHrId_hrEmployee_employeeId"
	}),
	porAppFcmTokens: many(porAppFcmTokens),
	porAttendances_lineSupervisorId: many(porAttendance, {
		relationName: "porAttendance_lineSupervisorId_hrEmployee_employeeId"
	}),
	porAttendances_hrId: many(porAttendance, {
		relationName: "porAttendance_hrId_hrEmployee_employeeId"
	}),
	porCertificateRequests: many(porCertificateRequest),
	porCompensatoryLeaves_lineSupervisorId: many(porCompensatoryLeaves, {
		relationName: "porCompensatoryLeaves_lineSupervisorId_hrEmployee_employeeId"
	}),
	porCompensatoryLeaves_reportingSupervisorId: many(porCompensatoryLeaves, {
		relationName: "porCompensatoryLeaves_reportingSupervisorId_hrEmployee_employeeId"
	}),
	porCompensatoryLeaves_buHrId: many(porCompensatoryLeaves, {
		relationName: "porCompensatoryLeaves_buHrId_hrEmployee_employeeId"
	}),
	porEmployees: many(porEmployee),
	porEmployeeAppraisalDetails_employeeId: many(porEmployeeAppraisalDetails, {
		relationName: "porEmployeeAppraisalDetails_employeeId_hrEmployee_employeeId"
	}),
	porEmployeeAppraisalDetails_appraisalHeadPmPdCeoId: many(porEmployeeAppraisalDetails, {
		relationName: "porEmployeeAppraisalDetails_appraisalHeadPmPdCeoId_hrEmployee_employeeId"
	}),
	porEmployeeAppraisalTargetDetails: many(porEmployeeAppraisalTargetDetails),
	porEmployeeCarAits_employeeId: many(porEmployeeCarAit, {
		relationName: "porEmployeeCarAit_employeeId_hrEmployee_employeeId"
	}),
	porEmployeeCarAits_approverId: many(porEmployeeCarAit, {
		relationName: "porEmployeeCarAit_approverId_hrEmployee_employeeId"
	}),
	porEmployeeHrs: many(porEmployeeHr),
	porEmployeeHrDetails: many(porEmployeeHrDetails),
	porEmployeeReviews_employeeId: many(porEmployeeReview, {
		relationName: "porEmployeeReview_employeeId_hrEmployee_employeeId"
	}),
	porEmployeeReviews_reviewSubmittedBy: many(porEmployeeReview, {
		relationName: "porEmployeeReview_reviewSubmittedBy_hrEmployee_employeeId"
	}),
	porEmployeeSupervisors_employeeId: many(porEmployeeSupervisor, {
		relationName: "porEmployeeSupervisor_employeeId_hrEmployee_employeeId"
	}),
	porEmployeeSupervisors_supervisorId: many(porEmployeeSupervisor, {
		relationName: "porEmployeeSupervisor_supervisorId_hrEmployee_employeeId"
	}),
	porEmployeeTinInfos: many(porEmployeeTinInfo),
	porItGoodsDetails_idUsers: many(porItGoodsDetails, {
		relationName: "porItGoodsDetails_idUsers_hrEmployee_employeeId"
	}),
	porItGoodsDetails_employeeId: many(porItGoodsDetails, {
		relationName: "porItGoodsDetails_employeeId_hrEmployee_employeeId"
	}),
	porItGoodsDetails_concernItPersonId: many(porItGoodsDetails, {
		relationName: "porItGoodsDetails_concernItPersonId_hrEmployee_employeeId"
	}),
	porJobDescriptionAdditionalDimensions: many(porJobDescriptionAdditionalDimensions),
	porJobDescriptionAdditionalExperiences: many(porJobDescriptionAdditionalExperiences),
	porJobDescriptionAdditionalExternalCustomers: many(porJobDescriptionAdditionalExternalCustomers),
	porJobDescriptionAdditionalInternalCustomers: many(porJobDescriptionAdditionalInternalCustomers),
	porJobDescriptionAdditionalPerformingAreas: many(porJobDescriptionAdditionalPerformingAreas),
	porJobDescriptionAdditionalQualifications: many(porJobDescriptionAdditionalQualifications),
	porJobDescriptionAdditionalQualityParameters: many(porJobDescriptionAdditionalQualityParameters),
	porJobDescriptionAdditionalSoftSkills: many(porJobDescriptionAdditionalSoftSkills),
	porJobDescriptionAdditionalSpecialRequirements: many(porJobDescriptionAdditionalSpecialRequirements),
	porJobDescriptionAdditionalTechSkills: many(porJobDescriptionAdditionalTechSkills),
	porJobRequisitions: many(porJobRequisitions),
	porLeaves_idEmployee: many(porLeave, {
		relationName: "porLeave_idEmployee_hrEmployee_employeeId"
	}),
	porLeaves_hrId: many(porLeave, {
		relationName: "porLeave_hrId_hrEmployee_employeeId"
	}),
	porLeaves_lineSupervisorId: many(porLeave, {
		relationName: "porLeave_lineSupervisorId_hrEmployee_employeeId"
	}),
	porLeaves_leaveHrId: many(porLeave, {
		relationName: "porLeave_leaveHrId_hrEmployee_employeeId"
	}),
	porPerformanceAppraises: many(porPerformanceAppraise),
	porPerformanceAppraiseDetails: many(porPerformanceAppraiseDetails),
	users: many(users),
}));

export const hrAbsentSetupRelations = relations(hrAbsentSetup, ({ one }) => ({
	project: one(projects, {
		fields: [hrAbsentSetup.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrAbsentTemplate: one(hrAbsentTemplate, {
		fields: [hrAbsentSetup.hrAbsentTemplateId],
		references: [hrAbsentTemplate.hrAbsentTemplateId]
	}),
	user_idUsers: one(users, {
		fields: [hrAbsentSetup.idUsers],
		references: [users.idUsers],
		relationName: "hrAbsentSetup_idUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrAbsentSetup.changesBy],
		references: [users.idUsers],
		relationName: "hrAbsentSetup_changesBy_users_idUsers"
	}),
}));

export const hrAbsentTemplateRelations = relations(hrAbsentTemplate, ({ one, many }) => ({
	hrAbsentSetups: many(hrAbsentSetup),
	user: one(users, {
		fields: [hrAbsentTemplate.idUsers],
		references: [users.idUsers]
	}),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
	hrAbsentSetups_idUsers: many(hrAbsentSetup, {
		relationName: "hrAbsentSetup_idUsers_users_idUsers"
	}),
	hrAbsentSetups_changesBy: many(hrAbsentSetup, {
		relationName: "hrAbsentSetup_changesBy_users_idUsers"
	}),
	hrAbsentTemplates: many(hrAbsentTemplate),
	hrAccountingSetups: many(hrAccountingSetup),
	hrAdvancePaymentHistories: many(hrAdvancePaymentHistory),
	hrAdvancePaymentTemplates: many(hrAdvancePaymentTemplate),
	hrAttendances: many(hrAttendance),
	hrAttendanceCalculationInfos: many(hrAttendanceCalculationInfo),
	hrAttendanceCalendarFileImports: many(hrAttendanceCalendarFileImport),
	hrAttendanceEntries: many(hrAttendanceEntry),
	hrAttendanceEntryErrors: many(hrAttendanceEntryError),
	hrAttendanceFileImports: many(hrAttendanceFileImport),
	hrAttendanceFileImportErrors: many(hrAttendanceFileImportErrors),
	hrAttendanceMonthlies: many(hrAttendanceMonthly),
	hrAttendanceUpdateHistories: many(hrAttendanceUpdateHistory),
	hrBankBranchMasters: many(hrBankBranchMaster),
	hrBankMasters: many(hrBankMaster),
	hrBonusSetups: many(hrBonusSetup),
	hrBonusSetupHistories: many(hrBonusSetupHistory),
	hrBusinessUnits: many(hrBusinessUnit),
	hrCalendarSetups: many(hrCalendarSetup),
	hrCities: many(hrCity),
	hrCompanySetups: many(hrCompanySetup),
	hrCompensatoryLeaves: many(hrCompensatoryLeave),
	hrContactEmployeeDetails: many(hrContactEmployeeDetails),
	hrDeductionHeads: many(hrDeductionHeads),
	hrDeductionHeadsHistories: many(hrDeductionHeadsHistory),
	hrDenominations: many(hrDenomination),
	hrDepartments: many(hrDepartments),
	hrDesignationMasters: many(hrDesignationMaster),
	hrEarningHeadsHistories: many(hrEarningHeadsHistory),
	hrEducations: many(hrEducation),
	hrEducationConcentrations: many(hrEducationConcentrations),
	hrEducationLevels: many(hrEducationLevels),
	hrEmployeeBonusInfos: many(hrEmployeeBonusInfo),
	hrEmployeeBonusInfoIndividualHistories: many(hrEmployeeBonusInfoIndividualHistory),
	hrEmployeeCostCenterSetups: many(hrEmployeeCostCenterSetup),
	hrEmployeeCostCenterSetupDetails: many(hrEmployeeCostCenterSetupDetails),
	hrEmployeeEducationFileImports: many(hrEmployeeEducationFileImport),
	hrEmployeeExperienceFileImports: many(hrEmployeeExperienceFileImport),
	hrEmployeeHistories_previousIdUsers: many(hrEmployeeHistory, {
		relationName: "hrEmployeeHistory_previousIdUsers_users_idUsers"
	}),
	hrEmployeeHistories_changesBy: many(hrEmployeeHistory, {
		relationName: "hrEmployeeHistory_changesBy_users_idUsers"
	}),
	hrEmployeeInsertFileImports: many(hrEmployeeInsertFileImport),
	hrEmployeeNatureTypes: many(hrEmployeeNatureType),
	hrEmployeeSalaryBusinessUnits: many(hrEmployeeSalaryBusinessUnit),
	hrEmployeeSalaryBusinessUnitHistories: many(hrEmployeeSalaryBusinessUnitHistory),
	hrEmployeeSalaryInfos: many(hrEmployeeSalaryInfo),
	hrEmployeeSalaryInfoHistories: many(hrEmployeeSalaryInfoHistory),
	hrEmployeeTaxChangesHistories: many(hrEmployeeTaxChangesHistory),
	hrEmployeeTaxInfos: many(hrEmployeeTaxInfo),
	hrEmployeeTaxInfoDetails: many(hrEmployeeTaxInfoDetails),
	hrEmployeeTransfers: many(hrEmployeeTransfer),
	hrEmployeeUpdateFileImports: many(hrEmployeeUpdateFileImport),
	hrEmployeeWeekends: many(hrEmployeeWeekends),
	hrEquivalentDesignations: many(hrEquivalentDesignation),
	hrExamTitles: many(hrExamTitles),
	hrExperiences: many(hrExperience),
	hrFarewells: many(hrFarewell),
	hrFinalSettlements: many(hrFinalSettlement),
	hrFinalSettlementDetails: many(hrFinalSettlementDetails),
	hrFinalSettlementHistories: many(hrFinalSettlementHistory),
	hrFingerPrintMargeFileImports: many(hrFingerPrintMargeFileImport),
	hrFingerPrintMargeRecords: many(hrFingerPrintMargeRecord),
	hrFpUserPermissions: many(hrFpUserPermission),
	hrGrades: many(hrGrades),
	hrGroupSetups: many(hrGroupSetup),
	hrHoldingHeads: many(hrHoldingHeads),
	hrHolidayTypes: many(hrHolidayType),
	hrHolidays: many(hrHolidays),
	hrIncrementFileImports: many(hrIncrementFileImport),
	hrIncrementRecords: many(hrIncrementRecords),
	hrJobDescriptions: many(hrJobDescription),
	hrJobPerformanceAreas: many(hrJobPerformanceArea),
	hrLatePresents: many(hrLatePresent),
	hrLeaveApplicationFileImports: many(hrLeaveApplicationFileImport),
	hrLeaveBalanceFileImports: many(hrLeaveBalanceFileImport),
	hrLeaveEncashments: many(hrLeaveEncashment),
	hrLeaveEncashmentDetails: many(hrLeaveEncashmentDetails),
	hrLeaveEncashmentHistories: many(hrLeaveEncashmentHistory),
	hrLeaveEncashmentSetups: many(hrLeaveEncashmentSetup),
	hrLeavePolicies: many(hrLeavePolicy),
	hrLeaveTypes: many(hrLeaveType),
	hrLeaveYears: many(hrLeaveYear),
	hrLeaveYearHistories: many(hrLeaveYearHistory),
	hrManPowerBudgets: many(hrManPowerBudget),
	hrManPowerBudgetFileImports: many(hrManPowerBudgetFileImport),
	hrManualOvertimes: many(hrManualOvertime),
	hrManualOvertimeHistories_changesBy: many(hrManualOvertimeHistory, {
		relationName: "hrManualOvertimeHistory_changesBy_users_idUsers"
	}),
	hrManualOvertimeHistories_previousIdUser: many(hrManualOvertimeHistory, {
		relationName: "hrManualOvertimeHistory_previousIdUser_users_idUsers"
	}),
	hrMenus: many(hrMenu),
	hrMobileBankingDetails: many(hrMobileBankingDetails),
	hrOrganizationSetupChangeRecords_previousIdUsers: many(hrOrganizationSetupChangeRecords, {
		relationName: "hrOrganizationSetupChangeRecords_previousIdUsers_users_idUsers"
	}),
	hrOrganizationSetupChangeRecords_idUsers: many(hrOrganizationSetupChangeRecords, {
		relationName: "hrOrganizationSetupChangeRecords_idUsers_users_idUsers"
	}),
	hrOrganizationSetupFileImports: many(hrOrganizationSetupFileImport),
	hrOrganizationSetupHistories_previousIdUsers: many(hrOrganizationSetupHistory, {
		relationName: "hrOrganizationSetupHistory_previousIdUsers_users_idUsers"
	}),
	hrOrganizationSetupHistories_changesBy: many(hrOrganizationSetupHistory, {
		relationName: "hrOrganizationSetupHistory_changesBy_users_idUsers"
	}),
	hrOverStaySetupFileImports: many(hrOverStaySetupFileImport),
	hrOverstayEntryMonthlyHistories_changesBy: many(hrOverstayEntryMonthlyHistory, {
		relationName: "hrOverstayEntryMonthlyHistory_changesBy_users_idUsers"
	}),
	hrOverstayEntryMonthlyHistories_previousIdUser: many(hrOverstayEntryMonthlyHistory, {
		relationName: "hrOverstayEntryMonthlyHistory_previousIdUser_users_idUsers"
	}),
	hrOverstayFileImports: many(hrOverstayFileImport),
	hrOverstaySetups: many(hrOverstaySetup),
	hrOverstaySetupHistories: many(hrOverstaySetupHistory),
	hrOverstayTemplates: many(hrOverstayTemplate),
	hrOvertimes: many(hrOvertime),
	hrOvertimeFileImports: many(hrOvertimeFileImport),
	hrOvertimeHistories: many(hrOvertimeHistory),
	hrOvertimeSetupFileImports: many(hrOvertimeSetupFileImport),
	hrOvertimeTemplates: many(hrOvertimeTemplate),
	hrPagePermissions_idUser: many(hrPagePermission, {
		relationName: "hrPagePermission_idUser_users_idUsers"
	}),
	hrPagePermissions_idUserPermittedBy: many(hrPagePermission, {
		relationName: "hrPagePermission_idUserPermittedBy_users_idUsers"
	}),
	hrPaySlipDetailsIndividualHistories: many(hrPaySlipDetailsIndividualHistory),
	hrPaySlipGenerations_idUsers: many(hrPaySlipGeneration, {
		relationName: "hrPaySlipGeneration_idUsers_users_idUsers"
	}),
	hrPaySlipGenerations_approverId: many(hrPaySlipGeneration, {
		relationName: "hrPaySlipGeneration_approverId_users_idUsers"
	}),
	hrPaySlipGenerations_accountantId: many(hrPaySlipGeneration, {
		relationName: "hrPaySlipGeneration_accountantId_users_idUsers"
	}),
	hrPaySlipGenerationDetails: many(hrPaySlipGenerationDetails),
	hrPaySlipGenerationDetailsHistories: many(hrPaySlipGenerationDetailsHistory),
	hrPaySlipGenerationHistories: many(hrPaySlipGenerationHistory),
	hrPaySlipGenerationInfos: many(hrPaySlipGenerationInfo),
	hrPayStructureAmountUpdateHistories: many(hrPayStructureAmountUpdateHistory),
	hrPayStructureRecordsHistories_previousIdUsers: many(hrPayStructureRecordsHistory, {
		relationName: "hrPayStructureRecordsHistory_previousIdUsers_users_idUsers"
	}),
	hrPayStructureRecordsHistories_changesBy: many(hrPayStructureRecordsHistory, {
		relationName: "hrPayStructureRecordsHistory_changesBy_users_idUsers"
	}),
	hrPayStructureSetups: many(hrPayStructureSetup),
	hrPayStructureSetupFileImports: many(hrPayStructureSetupFileImport),
	hrPayStructureSetupHistories_previousIdUsers: many(hrPayStructureSetupHistory, {
		relationName: "hrPayStructureSetupHistory_previousIdUsers_users_idUsers"
	}),
	hrPayStructureSetupHistories_changesBy: many(hrPayStructureSetupHistory, {
		relationName: "hrPayStructureSetupHistory_changesBy_users_idUsers"
	}),
	hrPayStructureSetupRecords: many(hrPayStructureSetupRecords),
	hrPayStructureTemplates: many(hrPayStructureTemplate),
	hrPayStructureTemplateDetails: many(hrPayStructureTemplateDetails),
	hrPayStructureTemplateDetailsHistories_previousIdUsers: many(hrPayStructureTemplateDetailsHistory, {
		relationName: "hrPayStructureTemplateDetailsHistory_previousIdUsers_users_idUsers"
	}),
	hrPayStructureTemplateDetailsHistories_changesBy: many(hrPayStructureTemplateDetailsHistory, {
		relationName: "hrPayStructureTemplateDetailsHistory_changesBy_users_idUsers"
	}),
	hrPayStructureTemplateHistories_previousIdUsers: many(hrPayStructureTemplateHistory, {
		relationName: "hrPayStructureTemplateHistory_previousIdUsers_users_idUsers"
	}),
	hrPayStructureTemplateHistories_changesBy: many(hrPayStructureTemplateHistory, {
		relationName: "hrPayStructureTemplateHistory_changesBy_users_idUsers"
	}),
	hrPayStructureVariableInputs: many(hrPayStructureVariableInput),
	hrPayments: many(hrPayment),
	hrPortalAccessRecords: many(hrPortalAccessRecords),
	hrPrefixes: many(hrPrefix),
	hrPresentCompanies: many(hrPresentCompany),
	hrPresentOffdayFileImports: many(hrPresentOffdayFileImport),
	hrPresentOffdayMasters: many(hrPresentOffdayMaster),
	hrPresentOffdayMasterHistories_changesBy: many(hrPresentOffdayMasterHistory, {
		relationName: "hrPresentOffdayMasterHistory_changesBy_users_idUsers"
	}),
	hrPresentOffdayMasterHistories_previousIdUser: many(hrPresentOffdayMasterHistory, {
		relationName: "hrPresentOffdayMasterHistory_previousIdUser_users_idUsers"
	}),
	hrPresentOffdayMonthlies: many(hrPresentOffdayMonthly),
	hrPresentOffdayMonthlyHistories_changesBy: many(hrPresentOffdayMonthlyHistory, {
		relationName: "hrPresentOffdayMonthlyHistory_changesBy_users_idUsers"
	}),
	hrPresentOffdayMonthlyHistories_previousIdUser: many(hrPresentOffdayMonthlyHistory, {
		relationName: "hrPresentOffdayMonthlyHistory_previousIdUser_users_idUsers"
	}),
	hrPresentOffdaySetupFileImports: many(hrPresentOffdaySetupFileImport),
	hrPresentOffdayTemplates: many(hrPresentOffdayTemplate),
	hrProfessionTypes: many(hrProfessionType),
	hrProjectPermissions: many(hrProjectPermission),
	hrProjectwiseRoleAssigns: many(hrProjectwiseRoleAssign),
	hrProjectwiseTemplateAssigns: many(hrProjectwiseTemplateAssign),
	hrPromotionInfos: many(hrPromotionInfo),
	hrProvidentFundDetails: many(hrProvidentFundDetails),
	hrProvidentFundSetups: many(hrProvidentFundSetup),
	hrProvidentFundTemplates: many(hrProvidentFundTemplate),
	hrReferences: many(hrReference),
	hrSalaryBusinessUnits: many(hrSalaryBusinessUnit),
	hrShiftMasters: many(hrShiftMaster),
	hrTaxAreas: many(hrTaxArea),
	hrTaxBonusSetups: many(hrTaxBonusSetup),
	hrTaxCalculationRanges: many(hrTaxCalculationRange),
	hrTaxCalculationRangeHistories_previousIdUsers: many(hrTaxCalculationRangeHistory, {
		relationName: "hrTaxCalculationRangeHistory_previousIdUsers_users_idUsers"
	}),
	hrTaxCalculationRangeHistories_changesBy: many(hrTaxCalculationRangeHistory, {
		relationName: "hrTaxCalculationRangeHistory_changesBy_users_idUsers"
	}),
	hrTaxChallanEmployees: many(hrTaxChallanEmployee),
	hrTaxChallanEntries_idUsers: many(hrTaxChallanEntry, {
		relationName: "hrTaxChallanEntry_idUsers_users_idUsers"
	}),
	hrTaxChallanEntries_submittedById: many(hrTaxChallanEntry, {
		relationName: "hrTaxChallanEntry_submittedById_users_idUsers"
	}),
	hrTaxChallanEntries_approverId: many(hrTaxChallanEntry, {
		relationName: "hrTaxChallanEntry_approverId_users_idUsers"
	}),
	hrTaxChallanEntryFileImports: many(hrTaxChallanEntryFileImport),
	hrTaxChallanEntryHistories: many(hrTaxChallanEntryHistory),
	hrTaxPolicyEarningHeadWises: many(hrTaxPolicyEarningHeadWise),
	hrTaxPolicyEarningHeadWiseHistories_previousIdUsers: many(hrTaxPolicyEarningHeadWiseHistory, {
		relationName: "hrTaxPolicyEarningHeadWiseHistory_previousIdUsers_users_idUsers"
	}),
	hrTaxPolicyEarningHeadWiseHistories_changesBy: many(hrTaxPolicyEarningHeadWiseHistory, {
		relationName: "hrTaxPolicyEarningHeadWiseHistory_changesBy_users_idUsers"
	}),
	hrTaxRecalculates: many(hrTaxRecalculate),
	hrTaxTemplates: many(hrTaxTemplate),
	hrTaxTemplateHistories_previousIdUsers: many(hrTaxTemplateHistory, {
		relationName: "hrTaxTemplateHistory_previousIdUsers_users_idUsers"
	}),
	hrTaxTemplateHistories_changesBy: many(hrTaxTemplateHistory, {
		relationName: "hrTaxTemplateHistory_changesBy_users_idUsers"
	}),
	hrTrainingCertifications: many(hrTrainingCertification),
	hrTransferredCompanies: many(hrTransferredCompany),
	hrTransferredEmployeesSalaries: many(hrTransferredEmployeesSalary),
	hrVariableInputFileImports: many(hrVariableInputFileImport),
	hrVariableInputHistories: many(hrVariableInputHistory),
	hrWorkStations: many(hrWorkStation),
	hrisCiteriaMasters: many(hrisCiteriaMaster),
	hrisDepartmentalBudgets: many(hrisDepartmentalBudget),
	hrisDocumentMasters: many(hrisDocumentMaster),
	hrisEmployeeSittingArragementDetails: many(hrisEmployeeSittingArragementDetails),
	hrisEmployeeStationaryRequisitionDetails: many(hrisEmployeeStationaryRequisitionDetails),
	hrisEvaluationScoreMasters: many(hrisEvaluationScoreMaster),
	hrisFileArchiveDocumentFors: many(hrisFileArchiveDocumentFor),
	hrisFileArchiveDocumentTypes: many(hrisFileArchiveDocumentType),
	hrisFileArchiveEntries: many(hrisFileArchiveEntry),
	hrisFileArchiveEntryDetails: many(hrisFileArchiveEntryDetails),
	hrisGuestInterViewerDetails: many(hrisGuestInterViewerDetails),
	hrisInterViewBoards: many(hrisInterViewBoard),
	hrisInterViewSetupDetails: many(hrisInterViewSetupDetails),
	hrisInterViewTimeScheduleDetails: many(hrisInterViewTimeScheduleDetails),
	hrisInterViewerDetails: many(hrisInterViewerDetails),
	hrisInterviewBoardMasters: many(hrisInterviewBoardMaster),
	hrisInterviewBoardMasterInterviewerDetails: many(hrisInterviewBoardMasterInterviewerDetails),
	hrisItGoodsDetails: many(hrisItGoodsDetails),
	hrisItGoodsItemsDetails: many(hrisItGoodsItemsDetails),
	hrisJobRequisitionSummeries: many(hrisJobRequisitionSummery),
	hrisJobRequisitionSummeryPotentialCandidateCvs: many(hrisJobRequisitionSummeryPotentialCandidateCv),
	hrisManPowerPlannings: many(hrisManPowerPlanning),
	hrisMarkingSystemMasters: many(hrisMarkingSystemMaster),
	hrisPmsScoreMasters: many(hrisPmsScoreMaster),
	hrisRentAgreementBenificiaryDetails: many(hrisRentAgreementBenificiaryDetails),
	hrisRentAgreementDetails: many(hrisRentAgreementDetails),
	hrisRentAgreementLessorsDetails: many(hrisRentAgreementLessorsDetails),
	hrisRentAgreementPaymentDetails: many(hrisRentAgreementPaymentDetails),
	hrisRentAgreementRentDetails: many(hrisRentAgreementRentDetails),
	hrisRentGenerationAttachmentsDetails: many(hrisRentGenerationAttachmentsDetails),
	hrisRentGenerationPaymentDetails: many(hrisRentGenerationPaymentDetails),
	hrisResidentDetails: many(hrisResidentDetails),
	hrisResidentFlatDetails: many(hrisResidentFlatDetails),
	hrisResidentFlatRoomDetails: many(hrisResidentFlatRoomDetails),
	hrisResidentFloorDetails: many(hrisResidentFloorDetails),
	hrisResponsibilityMatrixFunctions: many(hrisResponsibilityMatrixFunction),
	hrisResponsibilityMatrixIncharges: many(hrisResponsibilityMatrixIncharge),
	hrisResponsibilitySubFunctionDetails: many(hrisResponsibilitySubFunctionDetails),
	hrisTalentAcquisitionJoiningDetails: many(hrisTalentAcquisitionJoiningDetails),
	hrisTalentAcquisitionJoiningHandoverDocumentsDetails: many(hrisTalentAcquisitionJoiningHandoverDocumentsDetails),
	hrisTalentAcquisitionJoiningReceiveDocumentsDetails: many(hrisTalentAcquisitionJoiningReceiveDocumentsDetails),
	hrisTraitsMasters: many(hrisTraitsMaster),
	hrisTraitsSetupDetails: many(hrisTraitsSetupDetails),
	hrisUtilityGenerationAttachmentsDetails: many(hrisUtilityGenerationAttachmentsDetails),
	hrisUtilityGenerationChargeDetails: many(hrisUtilityGenerationChargeDetails),
	hrisUtilityGenerationPaymentDetails: many(hrisUtilityGenerationPaymentDetails),
	hrisUtilityServices: many(hrisUtilityService),
	hrisWorkStationDetails: many(hrisWorkStationDetails),
	hrisWorkStationFlatDetails: many(hrisWorkStationFlatDetails),
	hrisWorkStationFlatRoomDetails: many(hrisWorkStationFlatRoomDetails),
	hrisWorkStationFloorDetails: many(hrisWorkStationFloorDetails),
	porCertificateMasters: many(porCertificateMaster),
	porEmployeeHrDetails_deletedBy: many(porEmployeeHrDetails, {
		relationName: "porEmployeeHrDetails_deletedBy_users_idUsers"
	}),
	porEmployeeHrDetails_idUsers: many(porEmployeeHrDetails, {
		relationName: "porEmployeeHrDetails_idUsers_users_idUsers"
	}),
	hrEmployee: one(hrEmployee, {
		fields: [users.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrAccountingSetupRelations = relations(hrAccountingSetup, ({ one }) => ({
	accLedger: one(accLedgers, {
		fields: [hrAccountingSetup.idLedger],
		references: [accLedgers.idLedgers]
	}),
	user: one(users, {
		fields: [hrAccountingSetup.idUser],
		references: [users.idUsers]
	}),
}));

export const accLedgersRelations = relations(accLedgers, ({ many }) => ({
	hrAccountingSetups: many(hrAccountingSetup),
	hrPayments: many(hrPayment),
	hrisRentAgreementPaymentDetails: many(hrisRentAgreementPaymentDetails),
	hrisRentGenerationPaymentDetails: many(hrisRentGenerationPaymentDetails),
	hrisUtilityGenerationPaymentDetails: many(hrisUtilityGenerationPaymentDetails),
}));

export const hrAdvanceRelations = relations(hrAdvance, ({ one, many }) => ({
	hrAdvancePaymentTemplate: one(hrAdvancePaymentTemplate, {
		fields: [hrAdvance.idAdvanceTemplate],
		references: [hrAdvancePaymentTemplate.idAdvancePaymentTemplate]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrAdvance.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	project_idCurSalBusUnit: one(projects, {
		fields: [hrAdvance.idCurSalBusUnit],
		references: [projects.idProjects],
		relationName: "hrAdvance_idCurSalBusUnit_projects_idProjects"
	}),
	accVoucher: one(accVoucher, {
		fields: [hrAdvance.idVoucher],
		references: [accVoucher.idVoucher]
	}),
	porAdvance: one(porAdvance, {
		fields: [hrAdvance.idPorAdvance],
		references: [porAdvance.idPorAdvance]
	}),
	project_idCurBusinessUnit: one(projects, {
		fields: [hrAdvance.idCurBusinessUnit],
		references: [projects.idProjects],
		relationName: "hrAdvance_idCurBusinessUnit_projects_idProjects"
	}),
	hrAdvancePaymentHistories: many(hrAdvancePaymentHistory),
}));

export const hrAdvancePaymentTemplateRelations = relations(hrAdvancePaymentTemplate, ({ one, many }) => ({
	hrAdvances: many(hrAdvance),
	user: one(users, {
		fields: [hrAdvancePaymentTemplate.idUser],
		references: [users.idUsers]
	}),
}));

export const porAdvanceRelations = relations(porAdvance, ({ one, many }) => ({
	hrAdvances: many(hrAdvance),
	hrEmployee_idEmployee: one(hrEmployee, {
		fields: [porAdvance.idEmployee],
		references: [hrEmployee.employeeId],
		relationName: "porAdvance_idEmployee_hrEmployee_employeeId"
	}),
	project: one(projects, {
		fields: [porAdvance.idCurBusinessUnit],
		references: [projects.idProjects]
	}),
	hrEmployee_approvedSupervisorId: one(hrEmployee, {
		fields: [porAdvance.approvedSupervisorId],
		references: [hrEmployee.employeeId],
		relationName: "porAdvance_approvedSupervisorId_hrEmployee_employeeId"
	}),
	hrEmployee_approvedHrId: one(hrEmployee, {
		fields: [porAdvance.approvedHrId],
		references: [hrEmployee.employeeId],
		relationName: "porAdvance_approvedHrId_hrEmployee_employeeId"
	}),
}));

export const hrAdvancePaymentHistoryRelations = relations(hrAdvancePaymentHistory, ({ one }) => ({
	hrAdvance: one(hrAdvance, {
		fields: [hrAdvancePaymentHistory.idAdvance],
		references: [hrAdvance.idAdvance]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrAdvancePaymentHistory.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrAdvancePaymentHistory.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrAdvancePaymentHistory.idUser],
		references: [users.idUsers]
	}),
}));

export const hrAttendanceRelations = relations(hrAttendance, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrAttendance.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrAttendance.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrAttendance.idUserOperator],
		references: [users.idUsers]
	}),
}));

export const hrAttendanceCalculationInfoRelations = relations(hrAttendanceCalculationInfo, ({ one }) => ({
	user: one(users, {
		fields: [hrAttendanceCalculationInfo.idUser],
		references: [users.idUsers]
	}),
	hrCalendarSetup: one(hrCalendarSetup, {
		fields: [hrAttendanceCalculationInfo.idCalendarSetup],
		references: [hrCalendarSetup.idCalendarSetup]
	}),
	project: one(projects, {
		fields: [hrAttendanceCalculationInfo.idBusinessUnit],
		references: [projects.idProjects]
	}),
}));

export const hrCalendarSetupRelations = relations(hrCalendarSetup, ({ one, many }) => ({
	hrAttendanceCalculationInfos: many(hrAttendanceCalculationInfo),
	user: one(users, {
		fields: [hrCalendarSetup.idUser],
		references: [users.idUsers]
	}),
	hrPaySlipGenerations: many(hrPaySlipGeneration),
}));

export const hrAttendanceCalendarFileImportRelations = relations(hrAttendanceCalendarFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrAttendanceCalendarFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrAttendanceCalendarFileImport.idProject],
		references: [projects.idProjects]
	}),
}));

export const hrAttendanceEntryRelations = relations(hrAttendanceEntry, ({ one }) => ({
	project: one(projects, {
		fields: [hrAttendanceEntry.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrAttendanceEntry.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrAttendanceEntryErrorRelations = relations(hrAttendanceEntryError, ({ one }) => ({
	hrAttendanceFileImport: one(hrAttendanceFileImport, {
		fields: [hrAttendanceEntryError.idHrAttendanceFileImport],
		references: [hrAttendanceFileImport.idHrAttendanceFileImport]
	}),
	user: one(users, {
		fields: [hrAttendanceEntryError.idUser],
		references: [users.idUsers]
	}),
}));

export const hrAttendanceFileImportRelations = relations(hrAttendanceFileImport, ({ one, many }) => ({
	hrAttendanceEntryErrors: many(hrAttendanceEntryError),
	user: one(users, {
		fields: [hrAttendanceFileImport.idUser],
		references: [users.idUsers]
	}),
	hrAttendanceFileImportErrors: many(hrAttendanceFileImportErrors),
}));

export const hrAttendanceFileImportErrorsRelations = relations(hrAttendanceFileImportErrors, ({ one }) => ({
	hrAttendanceFileImport: one(hrAttendanceFileImport, {
		fields: [hrAttendanceFileImportErrors.hrAttendanceFileImportId],
		references: [hrAttendanceFileImport.idHrAttendanceFileImport]
	}),
	user: one(users, {
		fields: [hrAttendanceFileImportErrors.idUser],
		references: [users.idUsers]
	}),
}));

export const hrAttendanceMonthlyRelations = relations(hrAttendanceMonthly, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrAttendanceMonthly.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrAttendanceMonthly.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrAttendanceMonthly.idUser],
		references: [users.idUsers]
	}),
}));

export const hrAttendanceUpdateHistoryRelations = relations(hrAttendanceUpdateHistory, ({ one }) => ({
	user: one(users, {
		fields: [hrAttendanceUpdateHistory.idUser],
		references: [users.idUsers]
	}),
}));

export const hrBankBranchMasterRelations = relations(hrBankBranchMaster, ({ one, many }) => ({
	user: one(users, {
		fields: [hrBankBranchMaster.idUsers],
		references: [users.idUsers]
	}),
	hrSalaryBusinessUnits: many(hrSalaryBusinessUnit),
	hrTaxChallanEntries: many(hrTaxChallanEntry),
	hrisRentAgreementDetails: many(hrisRentAgreementDetails),
}));

export const hrBankMasterRelations = relations(hrBankMaster, ({ one }) => ({
	user: one(users, {
		fields: [hrBankMaster.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrBonusSetupRelations = relations(hrBonusSetup, ({ one, many }) => ({
	hrEarningHead: one(hrEarningHeads, {
		fields: [hrBonusSetup.bonusTypeId],
		references: [hrEarningHeads.earningHeadsId]
	}),
	project: one(projects, {
		fields: [hrBonusSetup.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrBonusSetup.idUsers],
		references: [users.idUsers]
	}),
	accVoucher: one(accVoucher, {
		fields: [hrBonusSetup.idVoucher],
		references: [accVoucher.idVoucher]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrBonusSetup.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	hrBonusSetupHistories: many(hrBonusSetupHistory),
	hrEmployeeBonusInfos: many(hrEmployeeBonusInfo),
	hrEmployeeBonusInfoHistories: many(hrEmployeeBonusInfoHistory),
}));

export const hrEarningHeadsRelations = relations(hrEarningHeads, ({ many }) => ({
	hrBonusSetups: many(hrBonusSetup),
	hrEarningHeadsHistories: many(hrEarningHeadsHistory),
	hrManPowerBudgets: many(hrManPowerBudget),
	hrPayStructureTemplates: many(hrPayStructureTemplate),
	hrTaxPolicyEarningHeadWises: many(hrTaxPolicyEarningHeadWise),
}));

export const accFiscalYearRelations = relations(accFiscalYear, ({ many }) => ({
	hrBonusSetups: many(hrBonusSetup),
	hrEmployeeTaxChangesHistories: many(hrEmployeeTaxChangesHistory),
	hrEmployeeTaxInfos: many(hrEmployeeTaxInfo),
	hrIncrementFileImports: many(hrIncrementFileImport),
	hrPayStructureSetups: many(hrPayStructureSetup),
	hrPayStructureSetupRecords: many(hrPayStructureSetupRecords),
	hrProvidentFundDetails: many(hrProvidentFundDetails),
	hrTaxBonusSetups: many(hrTaxBonusSetup),
	hrTaxChallanEntries: many(hrTaxChallanEntry),
	hrTaxRecalculates: many(hrTaxRecalculate),
	hrTaxTemplates: many(hrTaxTemplate),
	hrisPerformanceAppraisalSetups: many(hrisPerformanceAppraisalSetup),
	porEmployeeCarAits: many(porEmployeeCarAit),
}));

export const hrBonusSetupHistoryRelations = relations(hrBonusSetupHistory, ({ one }) => ({
	hrBonusSetup: one(hrBonusSetup, {
		fields: [hrBonusSetupHistory.bonusSetupId],
		references: [hrBonusSetup.bonusSetupId]
	}),
	user: one(users, {
		fields: [hrBonusSetupHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrBusinessUnitRelations = relations(hrBusinessUnit, ({ one }) => ({
	hrCompanySetup: one(hrCompanySetup, {
		fields: [hrBusinessUnit.idCompany],
		references: [hrCompanySetup.companySetupId]
	}),
	hrCity: one(hrCity, {
		fields: [hrBusinessUnit.idCity],
		references: [hrCity.idCity]
	}),
	user: one(users, {
		fields: [hrBusinessUnit.idUser],
		references: [users.idUsers]
	}),
}));

export const hrCompanySetupRelations = relations(hrCompanySetup, ({ one, many }) => ({
	hrBusinessUnits: many(hrBusinessUnit),
	user: one(users, {
		fields: [hrCompanySetup.idUsers],
		references: [users.idUsers]
	}),
	hrGroupSetup: one(hrGroupSetup, {
		fields: [hrCompanySetup.groupId],
		references: [hrGroupSetup.groupId]
	}),
}));

export const hrCityRelations = relations(hrCity, ({ one, many }) => ({
	hrBusinessUnits: many(hrBusinessUnit),
	user: one(users, {
		fields: [hrCity.idUser],
		references: [users.idUsers]
	}),
}));

export const hrGroupSetupRelations = relations(hrGroupSetup, ({ one, many }) => ({
	hrCompanySetups: many(hrCompanySetup),
	user: one(users, {
		fields: [hrGroupSetup.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrCompensatoryLeaveRelations = relations(hrCompensatoryLeave, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrCompensatoryLeave.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrCompensatoryLeave.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrCompensatoryLeave.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrContactEmployeeDetailsRelations = relations(hrContactEmployeeDetails, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrContactEmployeeDetails.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrContactEmployeeDetails.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrContactEmployeeDetails.idBusinessUnit],
		references: [projects.idProjects]
	}),
}));

export const hrDeductionHeadsRelations = relations(hrDeductionHeads, ({ one, many }) => ({
	user: one(users, {
		fields: [hrDeductionHeads.idUsers],
		references: [users.idUsers]
	}),
	hrDeductionHeadsHistories: many(hrDeductionHeadsHistory),
}));

export const hrDeductionHeadsHistoryRelations = relations(hrDeductionHeadsHistory, ({ one }) => ({
	hrDeductionHead: one(hrDeductionHeads, {
		fields: [hrDeductionHeadsHistory.deductionHeadsId],
		references: [hrDeductionHeads.deductionHeadsId]
	}),
	user: one(users, {
		fields: [hrDeductionHeadsHistory.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrDenominationRelations = relations(hrDenomination, ({ one }) => ({
	user: one(users, {
		fields: [hrDenomination.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrDepartmentsRelations = relations(hrDepartments, ({ one, many }) => ({
	user: one(users, {
		fields: [hrDepartments.idUser],
		references: [users.idUsers]
	}),
	hrOrganizationSetups_idSubFunction: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_idSubFunction_hrDepartments_idDepartment"
	}),
	hrOrganizationSetups_idDepartment: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_idDepartment_hrDepartments_idDepartment"
	}),
	hrPresentCompanies: many(hrPresentCompany),
	hrPromotionInfos: many(hrPromotionInfo),
	hrTransferredCompanies: many(hrTransferredCompany),
	hrisDepartmentalBudgets: many(hrisDepartmentalBudget),
	hrisEmployeeSittingArragementDetails: many(hrisEmployeeSittingArragementDetails),
	hrisEmployeeStationaryRequisitionDetails: many(hrisEmployeeStationaryRequisitionDetails),
	hrisInterviewBoardMasters: many(hrisInterviewBoardMaster),
	hrisItGoodsDetails: many(hrisItGoodsDetails),
	hrisJobCreates: many(hrisJobCreate),
	hrisJobDescriptions: many(hrisJobDescription),
	hrisJobRequisitionSummeries: many(hrisJobRequisitionSummery),
	hrisJobRequisitions: many(hrisJobRequisitions),
	hrisManPowerPlannings: many(hrisManPowerPlanning),
	porItGoodsDetails: many(porItGoodsDetails),
}));

export const hrDesignationMasterRelations = relations(hrDesignationMaster, ({ one, many }) => ({
	user: one(users, {
		fields: [hrDesignationMaster.idUsers],
		references: [users.idUsers]
	}),
	hrOrganizationSetups_reportingSupervisorDesigId: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_reportingSupervisorDesigId_hrDesignationMaster_designationId"
	}),
	hrOrganizationSetups_employeeDesigId: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_employeeDesigId_hrDesignationMaster_designationId"
	}),
	hrOrganizationSetups_lineSupervisorDesigId: many(hrOrganizationSetup, {
		relationName: "hrOrganizationSetup_lineSupervisorDesigId_hrDesignationMaster_designationId"
	}),
	hrPaySlipEmployeeInfos: many(hrPaySlipEmployeeInfo),
	hrPresentCompanies: many(hrPresentCompany),
	hrPromotionInfos_idDesignation: many(hrPromotionInfo, {
		relationName: "hrPromotionInfo_idDesignation_hrDesignationMaster_designationId"
	}),
	hrPromotionInfos_idPrevDesignation: many(hrPromotionInfo, {
		relationName: "hrPromotionInfo_idPrevDesignation_hrDesignationMaster_designationId"
	}),
	hrTransferredCompanies: many(hrTransferredCompany),
	hrisDepartmentalBudgets: many(hrisDepartmentalBudget),
	hrisEmployeeSittingArragementDetails: many(hrisEmployeeSittingArragementDetails),
	hrisEmployeeStationaryRequisitionDetails: many(hrisEmployeeStationaryRequisitionDetails),
	hrisItGoodsDetails: many(hrisItGoodsDetails),
	hrisJobCreates: many(hrisJobCreate),
	hrisJobDescriptions: many(hrisJobDescription),
	hrisJobRequisitionSummeries: many(hrisJobRequisitionSummery),
	hrisJobRequisitions: many(hrisJobRequisitions),
	hrisManPowerPlanningDetails: many(hrisManPowerPlanningDetails),
	hrisTraitsSetupDetails: many(hrisTraitsSetupDetails),
	porItGoodsDetails: many(porItGoodsDetails),
}));

export const hrEarningHeadsHistoryRelations = relations(hrEarningHeadsHistory, ({ one }) => ({
	hrEarningHead: one(hrEarningHeads, {
		fields: [hrEarningHeadsHistory.earningHeadsId],
		references: [hrEarningHeads.earningHeadsId]
	}),
	user: one(users, {
		fields: [hrEarningHeadsHistory.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrEducationRelations = relations(hrEducation, ({ one }) => ({
	user: one(users, {
		fields: [hrEducation.idUsers],
		references: [users.idUsers]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrEducation.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrEducationConcentrationsRelations = relations(hrEducationConcentrations, ({ one }) => ({
	user: one(users, {
		fields: [hrEducationConcentrations.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrEducationLevelsRelations = relations(hrEducationLevels, ({ one, many }) => ({
	user: one(users, {
		fields: [hrEducationLevels.idUsers],
		references: [users.idUsers]
	}),
	hrExamTitles: many(hrExamTitles),
}));

export const hrEmployeeBonusInfoRelations = relations(hrEmployeeBonusInfo, ({ one, many }) => ({
	hrBonusSetup: one(hrBonusSetup, {
		fields: [hrEmployeeBonusInfo.bonusSetupId],
		references: [hrBonusSetup.bonusSetupId]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeBonusInfo.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrEmployeeBonusInfo.idUsers],
		references: [users.idUsers]
	}),
	hrEmployeeBonusInfoIndividualHistories: many(hrEmployeeBonusInfoIndividualHistory),
}));

export const hrEmployeeBonusInfoHistoryRelations = relations(hrEmployeeBonusInfoHistory, ({ one }) => ({
	hrBonusSetup: one(hrBonusSetup, {
		fields: [hrEmployeeBonusInfoHistory.bonusSetupId],
		references: [hrBonusSetup.bonusSetupId]
	}),
}));

export const hrEmployeeBonusInfoIndividualHistoryRelations = relations(hrEmployeeBonusInfoIndividualHistory, ({ one }) => ({
	hrEmployeeBonusInfo: one(hrEmployeeBonusInfo, {
		fields: [hrEmployeeBonusInfoIndividualHistory.employeeBonusInfoId],
		references: [hrEmployeeBonusInfo.employeeBonusInfoId]
	}),
	user: one(users, {
		fields: [hrEmployeeBonusInfoIndividualHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrEmployeeCostCenterSetupRelations = relations(hrEmployeeCostCenterSetup, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeCostCenterSetup.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrEmployeeCostCenterSetup.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrEmployeeCostCenterSetup.idUsers],
		references: [users.idUsers]
	}),
	hrEmployeeCostCenterSetupDetails: many(hrEmployeeCostCenterSetupDetails),
}));

export const hrEmployeeCostCenterSetupDetailsRelations = relations(hrEmployeeCostCenterSetupDetails, ({ one }) => ({
	costCenter: one(costCenter, {
		fields: [hrEmployeeCostCenterSetupDetails.idCostCenter],
		references: [costCenter.idCostCenter]
	}),
	user: one(users, {
		fields: [hrEmployeeCostCenterSetupDetails.idUsers],
		references: [users.idUsers]
	}),
	hrEmployeeCostCenterSetup: one(hrEmployeeCostCenterSetup, {
		fields: [hrEmployeeCostCenterSetupDetails.idHrEmployeeCostCenterSetup],
		references: [hrEmployeeCostCenterSetup.idHrEmployeeCostCenterSetup]
	}),
}));

export const hrEmployeeDescriptionRelations = relations(hrEmployeeDescription, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeDescription.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrEmployeeEducationFileImportRelations = relations(hrEmployeeEducationFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrEmployeeEducationFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrEmployeeEducationFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrEmployeeExperienceFileImportRelations = relations(hrEmployeeExperienceFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrEmployeeExperienceFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrEmployeeExperienceFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrEmployeeHistoryRelations = relations(hrEmployeeHistory, ({ one }) => ({
	user_previousIdUsers: one(users, {
		fields: [hrEmployeeHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrEmployeeHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrEmployeeHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrEmployeeHistory_changesBy_users_idUsers"
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrEmployeeInsertFileImportRelations = relations(hrEmployeeInsertFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrEmployeeInsertFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrEmployeeInsertFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrEmployeeNatureTypeRelations = relations(hrEmployeeNatureType, ({ one, many }) => ({
	user: one(users, {
		fields: [hrEmployeeNatureType.idUsers],
		references: [users.idUsers]
	}),
	hrOrganizationSetups: many(hrOrganizationSetup),
	hrPaySlipEmployeeInfos: many(hrPaySlipEmployeeInfo),
	hrisJobRequisitionSummeries: many(hrisJobRequisitionSummery),
	hrisJobRequisitions: many(hrisJobRequisitions),
}));

export const hrEmployeeSalaryBusinessUnitRelations = relations(hrEmployeeSalaryBusinessUnit, ({ one }) => ({
	hrOrganizationSetup: one(hrOrganizationSetup, {
		fields: [hrEmployeeSalaryBusinessUnit.organizationSetupId],
		references: [hrOrganizationSetup.organizationSetupId]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeSalaryBusinessUnit.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrEmployeeSalaryBusinessUnit.salaryBusinessUnitId],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrEmployeeSalaryBusinessUnit.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrOrganizationSetupRelations = relations(hrOrganizationSetup, ({ one, many }) => ({
	hrEmployeeSalaryBusinessUnits: many(hrEmployeeSalaryBusinessUnit),
	hrEmployeeSalaryBusinessUnitHistories: many(hrEmployeeSalaryBusinessUnitHistory),
	hrEmployee_employeeId: one(hrEmployee, {
		fields: [hrOrganizationSetup.employeeId],
		references: [hrEmployee.employeeId],
		relationName: "hrOrganizationSetup_employeeId_hrEmployee_employeeId"
	}),
	hrEmployee_reportingSupervisorId: one(hrEmployee, {
		fields: [hrOrganizationSetup.reportingSupervisorId],
		references: [hrEmployee.employeeId],
		relationName: "hrOrganizationSetup_reportingSupervisorId_hrEmployee_employeeId"
	}),
	hrDesignationMaster_reportingSupervisorDesigId: one(hrDesignationMaster, {
		fields: [hrOrganizationSetup.reportingSupervisorDesigId],
		references: [hrDesignationMaster.designationId],
		relationName: "hrOrganizationSetup_reportingSupervisorDesigId_hrDesignationMaster_designationId"
	}),
	hrEquivalentDesignation: one(hrEquivalentDesignation, {
		fields: [hrOrganizationSetup.equivalentDesignationId],
		references: [hrEquivalentDesignation.equivalentDesignationId]
	}),
	hrEmployee_deptHeadId: one(hrEmployee, {
		fields: [hrOrganizationSetup.deptHeadId],
		references: [hrEmployee.employeeId],
		relationName: "hrOrganizationSetup_deptHeadId_hrEmployee_employeeId"
	}),
	project_idBusinessUnit: one(projects, {
		fields: [hrOrganizationSetup.idBusinessUnit],
		references: [projects.idProjects],
		relationName: "hrOrganizationSetup_idBusinessUnit_projects_idProjects"
	}),
	company: one(companies, {
		fields: [hrOrganizationSetup.companySetupId],
		references: [companies.idCompanies]
	}),
	hrDepartment_idSubFunction: one(hrDepartments, {
		fields: [hrOrganizationSetup.idSubFunction],
		references: [hrDepartments.idDepartment],
		relationName: "hrOrganizationSetup_idSubFunction_hrDepartments_idDepartment"
	}),
	hrProfessionType: one(hrProfessionType, {
		fields: [hrOrganizationSetup.idHrProfessionType],
		references: [hrProfessionType.idHrProfessionType]
	}),
	project_worksForBuId: one(projects, {
		fields: [hrOrganizationSetup.worksForBuId],
		references: [projects.idProjects],
		relationName: "hrOrganizationSetup_worksForBuId_projects_idProjects"
	}),
	hrDesignationMaster_employeeDesigId: one(hrDesignationMaster, {
		fields: [hrOrganizationSetup.employeeDesigId],
		references: [hrDesignationMaster.designationId],
		relationName: "hrOrganizationSetup_employeeDesigId_hrDesignationMaster_designationId"
	}),
	hrDepartment_idDepartment: one(hrDepartments, {
		fields: [hrOrganizationSetup.idDepartment],
		references: [hrDepartments.idDepartment],
		relationName: "hrOrganizationSetup_idDepartment_hrDepartments_idDepartment"
	}),
	hrWorkStation: one(hrWorkStation, {
		fields: [hrOrganizationSetup.workStationId],
		references: [hrWorkStation.workStationId]
	}),
	hrEmployeeNatureType: one(hrEmployeeNatureType, {
		fields: [hrOrganizationSetup.idEmployeeNatureType],
		references: [hrEmployeeNatureType.idEmployeeNatureType]
	}),
	hrShiftMaster: one(hrShiftMaster, {
		fields: [hrOrganizationSetup.shiftId],
		references: [hrShiftMaster.shiftId]
	}),
	hrEmployee_lineSupervisorId: one(hrEmployee, {
		fields: [hrOrganizationSetup.lineSupervisorId],
		references: [hrEmployee.employeeId],
		relationName: "hrOrganizationSetup_lineSupervisorId_hrEmployee_employeeId"
	}),
	hrDesignationMaster_lineSupervisorDesigId: one(hrDesignationMaster, {
		fields: [hrOrganizationSetup.lineSupervisorDesigId],
		references: [hrDesignationMaster.designationId],
		relationName: "hrOrganizationSetup_lineSupervisorDesigId_hrDesignationMaster_designationId"
	}),
	hrOrganizationSetupChangeRecords: many(hrOrganizationSetupChangeRecords),
	hrOrganizationSetupHistories: many(hrOrganizationSetupHistory),
}));

export const hrEmployeeSalaryBusinessUnitHistoryRelations = relations(hrEmployeeSalaryBusinessUnitHistory, ({ one }) => ({
	hrOrganizationSetup: one(hrOrganizationSetup, {
		fields: [hrEmployeeSalaryBusinessUnitHistory.organizationSetupId],
		references: [hrOrganizationSetup.organizationSetupId]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeSalaryBusinessUnitHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrEmployeeSalaryBusinessUnitHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrEmployeeSalaryInfoRelations = relations(hrEmployeeSalaryInfo, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeSalaryInfo.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrPayStructureTemplate: one(hrPayStructureTemplate, {
		fields: [hrEmployeeSalaryInfo.payStructureTemplateId],
		references: [hrPayStructureTemplate.payStructureTemplateId]
	}),
	user: one(users, {
		fields: [hrEmployeeSalaryInfo.idUsers],
		references: [users.idUsers]
	}),
	hrPayStructureSetupRecord: one(hrPayStructureSetupRecords, {
		fields: [hrEmployeeSalaryInfo.payStructureSetupRecordsId],
		references: [hrPayStructureSetupRecords.payStructureSetupRecordsId]
	}),
	hrManualOvertimes: many(hrManualOvertime),
	hrOverstayEntryMonthlies: many(hrOverstayEntryMonthly),
}));

export const hrPayStructureTemplateRelations = relations(hrPayStructureTemplate, ({ one, many }) => ({
	hrEmployeeSalaryInfos: many(hrEmployeeSalaryInfo),
	hrEarningHead: one(hrEarningHeads, {
		fields: [hrPayStructureTemplate.primaryEarningsHeadId],
		references: [hrEarningHeads.earningHeadsId]
	}),
	user: one(users, {
		fields: [hrPayStructureTemplate.idUsers],
		references: [users.idUsers]
	}),
	hrPayStructureTemplateDetails: many(hrPayStructureTemplateDetails),
	hrPayStructureTemplateDetailsHistories: many(hrPayStructureTemplateDetailsHistory),
	hrPayStructureTemplateHistories: many(hrPayStructureTemplateHistory),
	hrTransferredEmployeesSalaries: many(hrTransferredEmployeesSalary),
}));

export const hrPayStructureSetupRecordsRelations = relations(hrPayStructureSetupRecords, ({ one, many }) => ({
	hrEmployeeSalaryInfos: many(hrEmployeeSalaryInfo),
	hrEmployeeSalaryInfoHistories: many(hrEmployeeSalaryInfoHistory),
	hrEmployeeTaxChangesHistories: many(hrEmployeeTaxChangesHistory),
	hrLeaveEncashmentDetails: many(hrLeaveEncashmentDetails),
	hrPayStructureSetupHistories: many(hrPayStructureSetupHistory),
	hrEmployee: one(hrEmployee, {
		fields: [hrPayStructureSetupRecords.employeeId],
		references: [hrEmployee.employeeId]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrPayStructureSetupRecords.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	user: one(users, {
		fields: [hrPayStructureSetupRecords.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrEmployeeSalaryInfoHistoryRelations = relations(hrEmployeeSalaryInfoHistory, ({ one }) => ({
	hrPayStructureSetupRecord: one(hrPayStructureSetupRecords, {
		fields: [hrEmployeeSalaryInfoHistory.payStructureSetupRecordsId],
		references: [hrPayStructureSetupRecords.payStructureSetupRecordsId]
	}),
	user: one(users, {
		fields: [hrEmployeeSalaryInfoHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrEmployeeTaxChangesHistoryRelations = relations(hrEmployeeTaxChangesHistory, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeTaxChangesHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrEmployeeTaxChangesHistory.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	hrTaxRecalculate: one(hrTaxRecalculate, {
		fields: [hrEmployeeTaxChangesHistory.idHrTaxRecalculate],
		references: [hrTaxRecalculate.idHrTaxRecalculate]
	}),
	user: one(users, {
		fields: [hrEmployeeTaxChangesHistory.idUsers],
		references: [users.idUsers]
	}),
	hrPayStructureSetupRecord: one(hrPayStructureSetupRecords, {
		fields: [hrEmployeeTaxChangesHistory.payStructureSetupRecordsId],
		references: [hrPayStructureSetupRecords.payStructureSetupRecordsId]
	}),
}));

export const hrTaxRecalculateRelations = relations(hrTaxRecalculate, ({ one, many }) => ({
	hrEmployeeTaxChangesHistories: many(hrEmployeeTaxChangesHistory),
	hrTaxTemplate: one(hrTaxTemplate, {
		fields: [hrTaxRecalculate.idHrTaxTemplate],
		references: [hrTaxTemplate.idHrTaxTemplate]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrTaxRecalculate.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	user: one(users, {
		fields: [hrTaxRecalculate.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrEmployeeTaxInfoRelations = relations(hrEmployeeTaxInfo, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeTaxInfo.employeeId],
		references: [hrEmployee.employeeId]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrEmployeeTaxInfo.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	user: one(users, {
		fields: [hrEmployeeTaxInfo.idUsers],
		references: [users.idUsers]
	}),
	hrEmployeeTaxInfoDetails: many(hrEmployeeTaxInfoDetails),
}));

export const hrEmployeeTaxInfoDetailsRelations = relations(hrEmployeeTaxInfoDetails, ({ one }) => ({
	hrEmployeeTaxInfo: one(hrEmployeeTaxInfo, {
		fields: [hrEmployeeTaxInfoDetails.idHrEmployeeTaxInfo],
		references: [hrEmployeeTaxInfo.idHrEmployeeTaxInfo]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeTaxInfoDetails.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrEmployeeTaxInfoDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrEmployeeTransferRelations = relations(hrEmployeeTransfer, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeTransfer.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project_previousBusinessUnitId: one(projects, {
		fields: [hrEmployeeTransfer.previousBusinessUnitId],
		references: [projects.idProjects],
		relationName: "hrEmployeeTransfer_previousBusinessUnitId_projects_idProjects"
	}),
	project_currentBusinessUnitId: one(projects, {
		fields: [hrEmployeeTransfer.currentBusinessUnitId],
		references: [projects.idProjects],
		relationName: "hrEmployeeTransfer_currentBusinessUnitId_projects_idProjects"
	}),
	user: one(users, {
		fields: [hrEmployeeTransfer.idUsers],
		references: [users.idUsers]
	}),
	hrTransferredEmployeesSalaries: many(hrTransferredEmployeesSalary),
}));

export const hrEmployeeUpdateFileImportRelations = relations(hrEmployeeUpdateFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrEmployeeUpdateFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrEmployeeUpdateFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrEmployeeWeekendsRelations = relations(hrEmployeeWeekends, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrEmployeeWeekends.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrWeekend: one(hrWeekend, {
		fields: [hrEmployeeWeekends.idHrWeekend],
		references: [hrWeekend.idHrWeekend]
	}),
	user: one(users, {
		fields: [hrEmployeeWeekends.idUser],
		references: [users.idUsers]
	}),
}));

export const hrWeekendRelations = relations(hrWeekend, ({ many }) => ({
	hrEmployeeWeekends: many(hrEmployeeWeekends),
}));

export const hrEquivalentDesignationRelations = relations(hrEquivalentDesignation, ({ one, many }) => ({
	user: one(users, {
		fields: [hrEquivalentDesignation.idUsers],
		references: [users.idUsers]
	}),
	hrOrganizationSetups: many(hrOrganizationSetup),
	hrPromotionInfos: many(hrPromotionInfo),
}));

export const hrExamTitlesRelations = relations(hrExamTitles, ({ one }) => ({
	hrEducationLevel: one(hrEducationLevels, {
		fields: [hrExamTitles.idHrEducationLevels],
		references: [hrEducationLevels.idHrEducationLevels]
	}),
	user: one(users, {
		fields: [hrExamTitles.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrExperienceRelations = relations(hrExperience, ({ one }) => ({
	user: one(users, {
		fields: [hrExperience.idUsers],
		references: [users.idUsers]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrExperience.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrFarewellRelations = relations(hrFarewell, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrFarewell.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrFarewell.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrFinalSettlementRelations = relations(hrFinalSettlement, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrFinalSettlement.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrFinalSettlement.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrFinalSettlement.idUsers],
		references: [users.idUsers]
	}),
	accVoucher_idEarningVoucher: one(accVoucher, {
		fields: [hrFinalSettlement.idEarningVoucher],
		references: [accVoucher.idVoucher],
		relationName: "hrFinalSettlement_idEarningVoucher_accVoucher_idVoucher"
	}),
	accVoucher_idDeductionVoucher: one(accVoucher, {
		fields: [hrFinalSettlement.idDeductionVoucher],
		references: [accVoucher.idVoucher],
		relationName: "hrFinalSettlement_idDeductionVoucher_accVoucher_idVoucher"
	}),
	hrFinalSettlementDetails: many(hrFinalSettlementDetails),
	hrFinalSettlementHistories: many(hrFinalSettlementHistory),
	hrFinalSettlementPerformanceStatusProviders: many(hrFinalSettlementPerformanceStatusProviders),
}));

export const hrFinalSettlementDetailsRelations = relations(hrFinalSettlementDetails, ({ one }) => ({
	hrFinalSettlement: one(hrFinalSettlement, {
		fields: [hrFinalSettlementDetails.finalSettlementId],
		references: [hrFinalSettlement.finalSettlementId]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrFinalSettlementDetails.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrFinalSettlementDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrFinalSettlementHistoryRelations = relations(hrFinalSettlementHistory, ({ one }) => ({
	hrFinalSettlement: one(hrFinalSettlement, {
		fields: [hrFinalSettlementHistory.finalSettlementId],
		references: [hrFinalSettlement.finalSettlementId]
	}),
	user: one(users, {
		fields: [hrFinalSettlementHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrFinalSettlementPerformanceStatusProvidersRelations = relations(hrFinalSettlementPerformanceStatusProviders, ({ one }) => ({
	hrFinalSettlement: one(hrFinalSettlement, {
		fields: [hrFinalSettlementPerformanceStatusProviders.idHrFinalSettlement],
		references: [hrFinalSettlement.finalSettlementId]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrFinalSettlementPerformanceStatusProviders.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrFingerPrintMargeFileImportRelations = relations(hrFingerPrintMargeFileImport, ({ one, many }) => ({
	user: one(users, {
		fields: [hrFingerPrintMargeFileImport.idUsers],
		references: [users.idUsers]
	}),
	hrFingerPrintMargeRecords: many(hrFingerPrintMargeRecord),
}));

export const hrFingerPrintMargeRecordRelations = relations(hrFingerPrintMargeRecord, ({ one }) => ({
	user: one(users, {
		fields: [hrFingerPrintMargeRecord.idUsers],
		references: [users.idUsers]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrFingerPrintMargeRecord.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrFingerPrintMargeFileImport: one(hrFingerPrintMargeFileImport, {
		fields: [hrFingerPrintMargeRecord.idFingerPrintMargeFileImport],
		references: [hrFingerPrintMargeFileImport.idFingerPrintMargeFileImport]
	}),
}));

export const hrFpMachineSyncLogRelations = relations(hrFpMachineSyncLog, ({ one }) => ({
	hrFpMachine: one(hrFpMachines, {
		fields: [hrFpMachineSyncLog.idHrFpMachines],
		references: [hrFpMachines.idHrFpMachines]
	}),
}));

export const hrFpMachinesRelations = relations(hrFpMachines, ({ one, many }) => ({
	hrFpMachineSyncLogs: many(hrFpMachineSyncLog),
	hrFpMachineUsers: many(hrFpMachineUsers),
	hrWorkStation: one(hrWorkStation, {
		fields: [hrFpMachines.workStationId],
		references: [hrWorkStation.workStationId]
	}),
}));

export const hrFpMachineUserTemplatesRelations = relations(hrFpMachineUserTemplates, ({ one }) => ({
	hrFpMachineUser: one(hrFpMachineUsers, {
		fields: [hrFpMachineUserTemplates.idHrFpMachineUsers],
		references: [hrFpMachineUsers.idHrFpMachineUsers]
	}),
}));

export const hrFpMachineUsersRelations = relations(hrFpMachineUsers, ({ one, many }) => ({
	hrFpMachineUserTemplates: many(hrFpMachineUserTemplates),
	hrFpMachine: one(hrFpMachines, {
		fields: [hrFpMachineUsers.idHrFpMachines],
		references: [hrFpMachines.idHrFpMachines]
	}),
}));

export const hrWorkStationRelations = relations(hrWorkStation, ({ one, many }) => ({
	hrFpMachines: many(hrFpMachines),
	hrOrganizationSetups: many(hrOrganizationSetup),
	hrPaySlipEmployeeInfos: many(hrPaySlipEmployeeInfo),
	user: one(users, {
		fields: [hrWorkStation.idUsers],
		references: [users.idUsers]
	}),
	hrisJobDescriptions: many(hrisJobDescription),
	hrisJobRequisitions: many(hrisJobRequisitions),
	hrisWorkStationDetails: many(hrisWorkStationDetails),
}));

export const hrFpUserPermissionRelations = relations(hrFpUserPermission, ({ one }) => ({
	hrFpPage: one(hrFpPages, {
		fields: [hrFpUserPermission.idHrFpPages],
		references: [hrFpPages.idHrFpPages]
	}),
	user: one(users, {
		fields: [hrFpUserPermission.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrFpPagesRelations = relations(hrFpPages, ({ many }) => ({
	hrFpUserPermissions: many(hrFpUserPermission),
}));

export const hrGradesRelations = relations(hrGrades, ({ one, many }) => ({
	user: one(users, {
		fields: [hrGrades.idUser],
		references: [users.idUsers]
	}),
	hrPresentCompanies: many(hrPresentCompany),
	hrTransferredCompanies: many(hrTransferredCompany),
	hrisJobDescriptions: many(hrisJobDescription),
	hrisJobRequisitions: many(hrisJobRequisitions),
}));

export const hrHoldingHeadsRelations = relations(hrHoldingHeads, ({ one }) => ({
	project: one(projects, {
		fields: [hrHoldingHeads.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrHoldingHeads.idUser],
		references: [users.idUsers]
	}),
}));

export const hrHolidayTypeRelations = relations(hrHolidayType, ({ one, many }) => ({
	user: one(users, {
		fields: [hrHolidayType.idUsers],
		references: [users.idUsers]
	}),
	hrHolidays: many(hrHolidays),
}));

export const hrHolidaysRelations = relations(hrHolidays, ({ one }) => ({
	hrHolidayType: one(hrHolidayType, {
		fields: [hrHolidays.idHolidayType],
		references: [hrHolidayType.holidayTypeId]
	}),
	user: one(users, {
		fields: [hrHolidays.idUser],
		references: [users.idUsers]
	}),
}));

export const hrIncrementFileImportRelations = relations(hrIncrementFileImport, ({ one, many }) => ({
	user: one(users, {
		fields: [hrIncrementFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrIncrementFileImport.idProject],
		references: [projects.idProjects]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrIncrementFileImport.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	hrIncrementRecords: many(hrIncrementRecords),
}));

export const hrIncrementRecordsRelations = relations(hrIncrementRecords, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrIncrementRecords.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrIncrementRecords.idUser],
		references: [users.idUsers]
	}),
	hrIncrementFileImport: one(hrIncrementFileImport, {
		fields: [hrIncrementRecords.idIncrementFileImport],
		references: [hrIncrementFileImport.idIncrementFileImport]
	}),
}));

export const hrJobDescriptionRelations = relations(hrJobDescription, ({ one, many }) => ({
	user: one(users, {
		fields: [hrJobDescription.idUsers],
		references: [users.idUsers]
	}),
	hrJobPerformanceAreas: many(hrJobPerformanceArea),
}));

export const hrJobPerformanceAreaRelations = relations(hrJobPerformanceArea, ({ one }) => ({
	hrJobDescription: one(hrJobDescription, {
		fields: [hrJobPerformanceArea.idJobDescription],
		references: [hrJobDescription.idJobDescription]
	}),
	user: one(users, {
		fields: [hrJobPerformanceArea.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrLatePresentRelations = relations(hrLatePresent, ({ one }) => ({
	user: one(users, {
		fields: [hrLatePresent.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrLeaveApplicationRelations = relations(hrLeaveApplication, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrLeaveApplication.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrLeaveApplication.idProject],
		references: [projects.idProjects]
	}),
	hrLeavePolicy: one(hrLeavePolicy, {
		fields: [hrLeaveApplication.idLeavePolicy],
		references: [hrLeavePolicy.idLeavePolicy]
	}),
	hrLeaveType: one(hrLeaveType, {
		fields: [hrLeaveApplication.idLeaveType],
		references: [hrLeaveType.idLeaveType]
	}),
	porLeave: one(porLeave, {
		fields: [hrLeaveApplication.idPorLeave],
		references: [porLeave.idPorLeave]
	}),
	hrLeavingDates: many(hrLeavingDates),
}));

export const hrLeavePolicyRelations = relations(hrLeavePolicy, ({ one, many }) => ({
	hrLeaveApplications: many(hrLeaveApplication),
	hrLeaveBalances: many(hrLeaveBalance),
	hrLeaveType: one(hrLeaveType, {
		fields: [hrLeavePolicy.idLeaveType],
		references: [hrLeaveType.idLeaveType]
	}),
	user: one(users, {
		fields: [hrLeavePolicy.idUser],
		references: [users.idUsers]
	}),
	hrLeavePolicyTemplate: one(hrLeavePolicyTemplate, {
		fields: [hrLeavePolicy.idLeavePolicyTemplate],
		references: [hrLeavePolicyTemplate.idHrLeavePolicyTemplate]
	}),
	hrLeavePolicyUpdateHistories: many(hrLeavePolicyUpdateHistory),
}));

export const hrLeaveTypeRelations = relations(hrLeaveType, ({ one, many }) => ({
	hrLeaveApplications: many(hrLeaveApplication),
	hrLeaveEncashments: many(hrLeaveEncashment),
	hrLeaveEncashmentHistories: many(hrLeaveEncashmentHistory),
	hrLeaveEncashmentSetups: many(hrLeaveEncashmentSetup),
	hrLeavePolicies: many(hrLeavePolicy),
	user: one(users, {
		fields: [hrLeaveType.idUsers],
		references: [users.idUsers]
	}),
	hrLeavingDates: many(hrLeavingDates),
	porLeaves: many(porLeave),
}));

export const porLeaveRelations = relations(porLeave, ({ one, many }) => ({
	hrLeaveApplications: many(hrLeaveApplication),
	hrEmployee_idEmployee: one(hrEmployee, {
		fields: [porLeave.idEmployee],
		references: [hrEmployee.employeeId],
		relationName: "porLeave_idEmployee_hrEmployee_employeeId"
	}),
	project: one(projects, {
		fields: [porLeave.idProject],
		references: [projects.idProjects]
	}),
	hrLeaveType: one(hrLeaveType, {
		fields: [porLeave.idLeaveType],
		references: [hrLeaveType.idLeaveType]
	}),
	hrEmployee_hrId: one(hrEmployee, {
		fields: [porLeave.hrId],
		references: [hrEmployee.employeeId],
		relationName: "porLeave_hrId_hrEmployee_employeeId"
	}),
	hrEmployee_lineSupervisorId: one(hrEmployee, {
		fields: [porLeave.lineSupervisorId],
		references: [hrEmployee.employeeId],
		relationName: "porLeave_lineSupervisorId_hrEmployee_employeeId"
	}),
	hrEmployee_leaveHrId: one(hrEmployee, {
		fields: [porLeave.leaveHrId],
		references: [hrEmployee.employeeId],
		relationName: "porLeave_leaveHrId_hrEmployee_employeeId"
	}),
	porLeaveDetails: many(porLeaveDetails),
}));

export const hrLeaveApplicationFileImportRelations = relations(hrLeaveApplicationFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrLeaveApplicationFileImport.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrLeaveApplicationFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrLeaveBalanceRelations = relations(hrLeaveBalance, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrLeaveBalance.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrLeaveBalance.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrLeavePolicy: one(hrLeavePolicy, {
		fields: [hrLeaveBalance.idLeavePolicy],
		references: [hrLeavePolicy.idLeavePolicy]
	}),
	hrLeaveBalanceDetails: many(hrLeaveBalanceDetails),
}));

export const hrLeaveBalanceDetailsRelations = relations(hrLeaveBalanceDetails, ({ one }) => ({
	hrLeaveBalance: one(hrLeaveBalance, {
		fields: [hrLeaveBalanceDetails.idHrLeaveBalance],
		references: [hrLeaveBalance.idHrLeaveBalance]
	}),
}));

export const hrLeaveBalanceFileImportRelations = relations(hrLeaveBalanceFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrLeaveBalanceFileImport.idUser],
		references: [users.idUsers]
	}),
}));

export const hrLeaveCalculationDetailsRelations = relations(hrLeaveCalculationDetails, ({ one }) => ({
	hrLeaveCalculation: one(hrLeaveCalculation, {
		fields: [hrLeaveCalculationDetails.idLeaveCalculation],
		references: [hrLeaveCalculation.idLeaveCalculation]
	}),
}));

export const hrLeaveCalculationRelations = relations(hrLeaveCalculation, ({ many }) => ({
	hrLeaveCalculationDetails: many(hrLeaveCalculationDetails),
}));

export const hrLeaveEncashmentRelations = relations(hrLeaveEncashment, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrLeaveEncashment.idProjects],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrLeaveEncashment.idUsers],
		references: [users.idUsers]
	}),
	hrLeaveType: one(hrLeaveType, {
		fields: [hrLeaveEncashment.idHrLeaveType],
		references: [hrLeaveType.idLeaveType]
	}),
	accVoucher: one(accVoucher, {
		fields: [hrLeaveEncashment.idVoucher],
		references: [accVoucher.idVoucher]
	}),
	hrLeaveEncashmentDetails: many(hrLeaveEncashmentDetails),
}));

export const hrLeaveEncashmentDetailsRelations = relations(hrLeaveEncashmentDetails, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrLeaveEncashmentDetails.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrLeaveEncashment: one(hrLeaveEncashment, {
		fields: [hrLeaveEncashmentDetails.idHrLeaveEncashment],
		references: [hrLeaveEncashment.idHrLeaveEncashment]
	}),
	user: one(users, {
		fields: [hrLeaveEncashmentDetails.idUsers],
		references: [users.idUsers]
	}),
	hrPayStructureSetupRecord: one(hrPayStructureSetupRecords, {
		fields: [hrLeaveEncashmentDetails.payStructureSetupRecordsId],
		references: [hrPayStructureSetupRecords.payStructureSetupRecordsId]
	}),
}));

export const hrLeaveEncashmentHistoryRelations = relations(hrLeaveEncashmentHistory, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrLeaveEncashmentHistory.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrLeaveEncashmentHistory.idUser],
		references: [users.idUsers]
	}),
	hrLeaveType: one(hrLeaveType, {
		fields: [hrLeaveEncashmentHistory.idLeaveType],
		references: [hrLeaveType.idLeaveType]
	}),
	project: one(projects, {
		fields: [hrLeaveEncashmentHistory.idProject],
		references: [projects.idProjects]
	}),
}));

export const hrLeaveEncashmentSetupRelations = relations(hrLeaveEncashmentSetup, ({ one }) => ({
	project: one(projects, {
		fields: [hrLeaveEncashmentSetup.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrLeaveType: one(hrLeaveType, {
		fields: [hrLeaveEncashmentSetup.idLeaveType],
		references: [hrLeaveType.idLeaveType]
	}),
	user: one(users, {
		fields: [hrLeaveEncashmentSetup.idUser],
		references: [users.idUsers]
	}),
}));

export const hrLeavePolicyTemplateRelations = relations(hrLeavePolicyTemplate, ({ many }) => ({
	hrLeavePolicies: many(hrLeavePolicy),
}));

export const hrLeavePolicyUpdateHistoryRelations = relations(hrLeavePolicyUpdateHistory, ({ one }) => ({
	hrLeavePolicy: one(hrLeavePolicy, {
		fields: [hrLeavePolicyUpdateHistory.idLeavePolicy],
		references: [hrLeavePolicy.idLeavePolicy]
	}),
}));

export const hrLeaveYearRelations = relations(hrLeaveYear, ({ one, many }) => ({
	user: one(users, {
		fields: [hrLeaveYear.idUser],
		references: [users.idUsers]
	}),
	hrLeaveYearHistories: many(hrLeaveYearHistory),
}));

export const hrLeaveYearHistoryRelations = relations(hrLeaveYearHistory, ({ one }) => ({
	hrLeaveYear: one(hrLeaveYear, {
		fields: [hrLeaveYearHistory.idHrLeaveYear],
		references: [hrLeaveYear.idLeaveYear]
	}),
	user: one(users, {
		fields: [hrLeaveYearHistory.idUser],
		references: [users.idUsers]
	}),
}));

export const hrLeavingDatesRelations = relations(hrLeavingDates, ({ one }) => ({
	hrLeaveApplication: one(hrLeaveApplication, {
		fields: [hrLeavingDates.idLeaveApplication],
		references: [hrLeaveApplication.idLeaveApplication]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrLeavingDates.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	hrLeaveType: one(hrLeaveType, {
		fields: [hrLeavingDates.idLeaveType],
		references: [hrLeaveType.idLeaveType]
	}),
}));

export const hrManPowerBudgetRelations = relations(hrManPowerBudget, ({ one }) => ({
	user: one(users, {
		fields: [hrManPowerBudget.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrManPowerBudget.idProjects],
		references: [projects.idProjects]
	}),
	hrManPowerBudgetFileImport: one(hrManPowerBudgetFileImport, {
		fields: [hrManPowerBudget.idHrManPowerBudgetFileImport],
		references: [hrManPowerBudgetFileImport.idHrManPowerBudgetFileImport]
	}),
	hrEarningHead: one(hrEarningHeads, {
		fields: [hrManPowerBudget.earningHeadsId],
		references: [hrEarningHeads.earningHeadsId]
	}),
}));

export const hrManPowerBudgetFileImportRelations = relations(hrManPowerBudgetFileImport, ({ one, many }) => ({
	hrManPowerBudgets: many(hrManPowerBudget),
	user: one(users, {
		fields: [hrManPowerBudgetFileImport.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrManPowerBudgetFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrManualOvertimeRelations = relations(hrManualOvertime, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrManualOvertime.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrManualOvertime.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrManualOvertime.idUsers],
		references: [users.idUsers]
	}),
	hrManualOvertimeEntry: one(hrManualOvertimeEntry, {
		fields: [hrManualOvertime.idHrManualOvertimeEntry],
		references: [hrManualOvertimeEntry.idHrManualOvertimeEntry]
	}),
	hrEmployeeSalaryInfo: one(hrEmployeeSalaryInfo, {
		fields: [hrManualOvertime.employeeSalaryInfoId],
		references: [hrEmployeeSalaryInfo.employeeSalaryInfoId]
	}),
	hrOvertimeFileImport: one(hrOvertimeFileImport, {
		fields: [hrManualOvertime.idHrOvertimeFileImport],
		references: [hrOvertimeFileImport.idHrOvertimeFileImport]
	}),
	hrManualOvertimeHistories: many(hrManualOvertimeHistory),
}));

export const hrManualOvertimeEntryRelations = relations(hrManualOvertimeEntry, ({ one, many }) => ({
	hrManualOvertimes: many(hrManualOvertime),
	accVoucher: one(accVoucher, {
		fields: [hrManualOvertimeEntry.idVoucher],
		references: [accVoucher.idVoucher]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrManualOvertimeEntry.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrManualOvertimeEntry.idProject],
		references: [projects.idProjects]
	}),
}));

export const hrOvertimeFileImportRelations = relations(hrOvertimeFileImport, ({ one, many }) => ({
	hrManualOvertimes: many(hrManualOvertime),
	user: one(users, {
		fields: [hrOvertimeFileImport.idUser],
		references: [users.idUsers]
	}),
}));

export const hrManualOvertimeHistoryRelations = relations(hrManualOvertimeHistory, ({ one }) => ({
	hrManualOvertime: one(hrManualOvertime, {
		fields: [hrManualOvertimeHistory.overtimeEntryId],
		references: [hrManualOvertime.overtimeEntryId]
	}),
	user_changesBy: one(users, {
		fields: [hrManualOvertimeHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrManualOvertimeHistory_changesBy_users_idUsers"
	}),
	user_previousIdUser: one(users, {
		fields: [hrManualOvertimeHistory.previousIdUser],
		references: [users.idUsers],
		relationName: "hrManualOvertimeHistory_previousIdUser_users_idUsers"
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrManualOvertimeHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrMenuRelations = relations(hrMenu, ({ one, many }) => ({
	user: one(users, {
		fields: [hrMenu.idUser],
		references: [users.idUsers]
	}),
	hrMenuSubmenus: many(hrMenuSubmenu),
}));

export const hrMenuSubmenuRelations = relations(hrMenuSubmenu, ({ one, many }) => ({
	hrMenu: one(hrMenu, {
		fields: [hrMenuSubmenu.idHrMenu],
		references: [hrMenu.idHrMenu]
	}),
	hrPagePermissions: many(hrPagePermission),
}));

export const hrMobileBankingDetailsRelations = relations(hrMobileBankingDetails, ({ one }) => ({
	user: one(users, {
		fields: [hrMobileBankingDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrProfessionTypeRelations = relations(hrProfessionType, ({ one, many }) => ({
	hrOrganizationSetups: many(hrOrganizationSetup),
	user: one(users, {
		fields: [hrProfessionType.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrShiftMasterRelations = relations(hrShiftMaster, ({ one, many }) => ({
	hrOrganizationSetups: many(hrOrganizationSetup),
	user: one(users, {
		fields: [hrShiftMaster.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrOrganizationSetupChangeRecordsRelations = relations(hrOrganizationSetupChangeRecords, ({ one }) => ({
	hrOrganizationSetup: one(hrOrganizationSetup, {
		fields: [hrOrganizationSetupChangeRecords.organizationSetupId],
		references: [hrOrganizationSetup.organizationSetupId]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrOrganizationSetupChangeRecords.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user_previousIdUsers: one(users, {
		fields: [hrOrganizationSetupChangeRecords.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrOrganizationSetupChangeRecords_previousIdUsers_users_idUsers"
	}),
	user_idUsers: one(users, {
		fields: [hrOrganizationSetupChangeRecords.idUsers],
		references: [users.idUsers],
		relationName: "hrOrganizationSetupChangeRecords_idUsers_users_idUsers"
	}),
}));

export const hrOrganizationSetupFileImportRelations = relations(hrOrganizationSetupFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrOrganizationSetupFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrOrganizationSetupFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrOrganizationSetupHistoryRelations = relations(hrOrganizationSetupHistory, ({ one }) => ({
	hrOrganizationSetup: one(hrOrganizationSetup, {
		fields: [hrOrganizationSetupHistory.organizationSetupId],
		references: [hrOrganizationSetup.organizationSetupId]
	}),
	user_previousIdUsers: one(users, {
		fields: [hrOrganizationSetupHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrOrganizationSetupHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrOrganizationSetupHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrOrganizationSetupHistory_changesBy_users_idUsers"
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrOrganizationSetupHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrOverStaySetupFileImportRelations = relations(hrOverStaySetupFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrOverStaySetupFileImport.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrOverStaySetupFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrOverstayEntryMonthlyRelations = relations(hrOverstayEntryMonthly, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrOverstayEntryMonthly.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrOverstayEntryMonthly.idBusinessUnit],
		references: [projects.idProjects]
	}),
	accVoucher: one(accVoucher, {
		fields: [hrOverstayEntryMonthly.idVoucher],
		references: [accVoucher.idVoucher]
	}),
	hrEmployeeSalaryInfo: one(hrEmployeeSalaryInfo, {
		fields: [hrOverstayEntryMonthly.employeeSalaryInfoId],
		references: [hrEmployeeSalaryInfo.employeeSalaryInfoId]
	}),
	hrOverstayFileImport: one(hrOverstayFileImport, {
		fields: [hrOverstayEntryMonthly.idHrOverstayFileImport],
		references: [hrOverstayFileImport.idHrOverstayFileImport]
	}),
	hrOverstayEntryMonthlyHistories: many(hrOverstayEntryMonthlyHistory),
}));

export const hrOverstayFileImportRelations = relations(hrOverstayFileImport, ({ one, many }) => ({
	hrOverstayEntryMonthlies: many(hrOverstayEntryMonthly),
	user: one(users, {
		fields: [hrOverstayFileImport.idUser],
		references: [users.idUsers]
	}),
}));

export const hrOverstayEntryMonthlyHistoryRelations = relations(hrOverstayEntryMonthlyHistory, ({ one }) => ({
	hrOverstayEntryMonthly: one(hrOverstayEntryMonthly, {
		fields: [hrOverstayEntryMonthlyHistory.idOverstayEntryMonthly],
		references: [hrOverstayEntryMonthly.idOverstayEntryMonthly]
	}),
	user_changesBy: one(users, {
		fields: [hrOverstayEntryMonthlyHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrOverstayEntryMonthlyHistory_changesBy_users_idUsers"
	}),
	user_previousIdUser: one(users, {
		fields: [hrOverstayEntryMonthlyHistory.previousIdUser],
		references: [users.idUsers],
		relationName: "hrOverstayEntryMonthlyHistory_previousIdUser_users_idUsers"
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrOverstayEntryMonthlyHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrOverstaySetupRelations = relations(hrOverstaySetup, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrOverstaySetup.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrOverstaySetup.idUsers],
		references: [users.idUsers]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrOverstaySetup.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrOverstayTemplate: one(hrOverstayTemplate, {
		fields: [hrOverstaySetup.overstayTemplateId],
		references: [hrOverstayTemplate.overstayTemplateId]
	}),
	hrOverstaySetupHistories: many(hrOverstaySetupHistory),
}));

export const hrOverstayTemplateRelations = relations(hrOverstayTemplate, ({ one, many }) => ({
	hrOverstaySetups: many(hrOverstaySetup),
	hrOverstaySetupHistories: many(hrOverstaySetupHistory),
	user: one(users, {
		fields: [hrOverstayTemplate.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrOverstaySetupHistoryRelations = relations(hrOverstaySetupHistory, ({ one }) => ({
	hrOverstaySetup: one(hrOverstaySetup, {
		fields: [hrOverstaySetupHistory.overstaySetupId],
		references: [hrOverstaySetup.overstaySetupId]
	}),
	hrOverstayTemplate: one(hrOverstayTemplate, {
		fields: [hrOverstaySetupHistory.overstayTemplateId],
		references: [hrOverstayTemplate.overstayTemplateId]
	}),
	user: one(users, {
		fields: [hrOverstaySetupHistory.changesBy],
		references: [users.idUsers]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrOverstaySetupHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrOvertimeRelations = relations(hrOvertime, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrOvertime.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrOvertimeTemplate: one(hrOvertimeTemplate, {
		fields: [hrOvertime.overtimeTemplateId],
		references: [hrOvertimeTemplate.overtimeTemplateId]
	}),
	user: one(users, {
		fields: [hrOvertime.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrOvertime.idProject],
		references: [projects.idProjects]
	}),
	hrOvertimeHistories: many(hrOvertimeHistory),
}));

export const hrOvertimeTemplateRelations = relations(hrOvertimeTemplate, ({ one, many }) => ({
	hrOvertimes: many(hrOvertime),
	hrOvertimeHistories: many(hrOvertimeHistory),
	user: one(users, {
		fields: [hrOvertimeTemplate.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrOvertimeHistoryRelations = relations(hrOvertimeHistory, ({ one }) => ({
	hrOvertime: one(hrOvertime, {
		fields: [hrOvertimeHistory.overtimeId],
		references: [hrOvertime.overtimeId]
	}),
	hrOvertimeTemplate: one(hrOvertimeTemplate, {
		fields: [hrOvertimeHistory.overtimeTemplateId],
		references: [hrOvertimeTemplate.overtimeTemplateId]
	}),
	user: one(users, {
		fields: [hrOvertimeHistory.previousIdUser],
		references: [users.idUsers]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrOvertimeHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrOvertimeSetupFileImportRelations = relations(hrOvertimeSetupFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrOvertimeSetupFileImport.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrOvertimeSetupFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrPagePermissionRelations = relations(hrPagePermission, ({ one }) => ({
	hrMenuSubmenu: one(hrMenuSubmenu, {
		fields: [hrPagePermission.idMenuSubmenu],
		references: [hrMenuSubmenu.idMenuSubmenu]
	}),
	user_idUser: one(users, {
		fields: [hrPagePermission.idUser],
		references: [users.idUsers],
		relationName: "hrPagePermission_idUser_users_idUsers"
	}),
	project: one(projects, {
		fields: [hrPagePermission.idProject],
		references: [projects.idProjects]
	}),
	user_idUserPermittedBy: one(users, {
		fields: [hrPagePermission.idUserPermittedBy],
		references: [users.idUsers],
		relationName: "hrPagePermission_idUserPermittedBy_users_idUsers"
	}),
}));

export const hrPaySlipDetailsIndividualHistoryRelations = relations(hrPaySlipDetailsIndividualHistory, ({ one }) => ({
	hrPaySlipGeneration: one(hrPaySlipGeneration, {
		fields: [hrPaySlipDetailsIndividualHistory.paySlipGenerationId],
		references: [hrPaySlipGeneration.paySlipGenerationId]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrPaySlipDetailsIndividualHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrPaySlipDetailsIndividualHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrPaySlipGenerationRelations = relations(hrPaySlipGeneration, ({ one, many }) => ({
	hrPaySlipDetailsIndividualHistories: many(hrPaySlipDetailsIndividualHistory),
	hrPaySlipEmployeeInfos: many(hrPaySlipEmployeeInfo),
	project: one(projects, {
		fields: [hrPaySlipGeneration.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user_idUsers: one(users, {
		fields: [hrPaySlipGeneration.idUsers],
		references: [users.idUsers],
		relationName: "hrPaySlipGeneration_idUsers_users_idUsers"
	}),
	accVoucher: one(accVoucher, {
		fields: [hrPaySlipGeneration.idVoucher],
		references: [accVoucher.idVoucher]
	}),
	hrCalendarSetup: one(hrCalendarSetup, {
		fields: [hrPaySlipGeneration.idCalendarSetup],
		references: [hrCalendarSetup.idCalendarSetup]
	}),
	user_approverId: one(users, {
		fields: [hrPaySlipGeneration.approverId],
		references: [users.idUsers],
		relationName: "hrPaySlipGeneration_approverId_users_idUsers"
	}),
	user_accountantId: one(users, {
		fields: [hrPaySlipGeneration.accountantId],
		references: [users.idUsers],
		relationName: "hrPaySlipGeneration_accountantId_users_idUsers"
	}),
	hrPaySlipGenerationDetails: many(hrPaySlipGenerationDetails),
	hrPaySlipGenerationDetailsHistories: many(hrPaySlipGenerationDetailsHistory),
	hrPaySlipGenerationHistories: many(hrPaySlipGenerationHistory),
	hrPaySlipGenerationInfos: many(hrPaySlipGenerationInfo),
	hrProvidentFundDetails: many(hrProvidentFundDetails),
	hrTaxChallanEntries: many(hrTaxChallanEntry),
}));

export const hrPaySlipEmployeeInfoRelations = relations(hrPaySlipEmployeeInfo, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrPaySlipEmployeeInfo.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrPaySlipEmployeeInfo.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrPaySlipEmployeeInfo.employeeDesigId],
		references: [hrDesignationMaster.designationId]
	}),
	hrWorkStation: one(hrWorkStation, {
		fields: [hrPaySlipEmployeeInfo.workStationId],
		references: [hrWorkStation.workStationId]
	}),
	hrEmployeeNatureType: one(hrEmployeeNatureType, {
		fields: [hrPaySlipEmployeeInfo.idEmployeeNatureType],
		references: [hrEmployeeNatureType.idEmployeeNatureType]
	}),
	hrPaySlipGeneration: one(hrPaySlipGeneration, {
		fields: [hrPaySlipEmployeeInfo.idPaySlipGeneration],
		references: [hrPaySlipGeneration.paySlipGenerationId]
	}),
}));

export const hrPaySlipGenerationDetailsRelations = relations(hrPaySlipGenerationDetails, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrPaySlipGenerationDetails.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrPaySlipGeneration: one(hrPaySlipGeneration, {
		fields: [hrPaySlipGenerationDetails.paySlipGenerationId],
		references: [hrPaySlipGeneration.paySlipGenerationId]
	}),
	project: one(projects, {
		fields: [hrPaySlipGenerationDetails.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrPaySlipGenerationDetails.idUsers],
		references: [users.idUsers]
	}),
	hrProvidentFundDetails: many(hrProvidentFundDetails),
}));

export const hrPaySlipGenerationDetailsHistoryRelations = relations(hrPaySlipGenerationDetailsHistory, ({ one }) => ({
	hrPaySlipGeneration: one(hrPaySlipGeneration, {
		fields: [hrPaySlipGenerationDetailsHistory.paySlipGenerationId],
		references: [hrPaySlipGeneration.paySlipGenerationId]
	}),
	user: one(users, {
		fields: [hrPaySlipGenerationDetailsHistory.changesBy],
		references: [users.idUsers]
	}),
}));

export const hrPaySlipGenerationHistoryRelations = relations(hrPaySlipGenerationHistory, ({ one }) => ({
	hrPaySlipGeneration: one(hrPaySlipGeneration, {
		fields: [hrPaySlipGenerationHistory.paySlipGenerationId],
		references: [hrPaySlipGeneration.paySlipGenerationId]
	}),
	user: one(users, {
		fields: [hrPaySlipGenerationHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrPaySlipGenerationInfoRelations = relations(hrPaySlipGenerationInfo, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrPaySlipGenerationInfo.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrPaySlipGeneration: one(hrPaySlipGeneration, {
		fields: [hrPaySlipGenerationInfo.paySlipGenerationId],
		references: [hrPaySlipGeneration.paySlipGenerationId]
	}),
	user: one(users, {
		fields: [hrPaySlipGenerationInfo.idUsers],
		references: [users.idUsers]
	}),
	hrProvidentFundDetails: many(hrProvidentFundDetails),
}));

export const hrPayStructureAmountUpdateHistoryRelations = relations(hrPayStructureAmountUpdateHistory, ({ one }) => ({
	hrPayStructureSetup: one(hrPayStructureSetup, {
		fields: [hrPayStructureAmountUpdateHistory.payStructureSetupId],
		references: [hrPayStructureSetup.payStructureSetupId]
	}),
	user: one(users, {
		fields: [hrPayStructureAmountUpdateHistory.changesBy],
		references: [users.idUsers]
	}),
}));

export const hrPayStructureSetupRelations = relations(hrPayStructureSetup, ({ one, many }) => ({
	hrPayStructureAmountUpdateHistories: many(hrPayStructureAmountUpdateHistory),
	hrEmployee: one(hrEmployee, {
		fields: [hrPayStructureSetup.employeeId],
		references: [hrEmployee.employeeId]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrPayStructureSetup.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	hrPayStructureTemplateDetail: one(hrPayStructureTemplateDetails, {
		fields: [hrPayStructureSetup.payStructureTemplateDetailsId],
		references: [hrPayStructureTemplateDetails.payStructureTemplateDetailsId]
	}),
	user: one(users, {
		fields: [hrPayStructureSetup.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrPayStructureRecordsHistoryRelations = relations(hrPayStructureRecordsHistory, ({ one }) => ({
	user_previousIdUsers: one(users, {
		fields: [hrPayStructureRecordsHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrPayStructureRecordsHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrPayStructureRecordsHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrPayStructureRecordsHistory_changesBy_users_idUsers"
	}),
}));

export const hrPayStructureTemplateDetailsRelations = relations(hrPayStructureTemplateDetails, ({ one, many }) => ({
	hrPayStructureSetups: many(hrPayStructureSetup),
	hrPayStructureTemplate: one(hrPayStructureTemplate, {
		fields: [hrPayStructureTemplateDetails.payStructureTemplateId],
		references: [hrPayStructureTemplate.payStructureTemplateId]
	}),
	user: one(users, {
		fields: [hrPayStructureTemplateDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrPayStructureSetupFileImportRelations = relations(hrPayStructureSetupFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrPayStructureSetupFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrPayStructureSetupFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrPayStructureSetupHistoryRelations = relations(hrPayStructureSetupHistory, ({ one }) => ({
	hrPayStructureSetupRecord: one(hrPayStructureSetupRecords, {
		fields: [hrPayStructureSetupHistory.payStructureSetupRecordsId],
		references: [hrPayStructureSetupRecords.payStructureSetupRecordsId]
	}),
	user_previousIdUsers: one(users, {
		fields: [hrPayStructureSetupHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrPayStructureSetupHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrPayStructureSetupHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrPayStructureSetupHistory_changesBy_users_idUsers"
	}),
}));

export const hrPayStructureTemplateDetailsHistoryRelations = relations(hrPayStructureTemplateDetailsHistory, ({ one }) => ({
	hrPayStructureTemplate: one(hrPayStructureTemplate, {
		fields: [hrPayStructureTemplateDetailsHistory.payStructureTemplateId],
		references: [hrPayStructureTemplate.payStructureTemplateId]
	}),
	user_previousIdUsers: one(users, {
		fields: [hrPayStructureTemplateDetailsHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrPayStructureTemplateDetailsHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrPayStructureTemplateDetailsHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrPayStructureTemplateDetailsHistory_changesBy_users_idUsers"
	}),
}));

export const hrPayStructureTemplateHistoryRelations = relations(hrPayStructureTemplateHistory, ({ one }) => ({
	hrPayStructureTemplate: one(hrPayStructureTemplate, {
		fields: [hrPayStructureTemplateHistory.payStructureTemplateId],
		references: [hrPayStructureTemplate.payStructureTemplateId]
	}),
	user_previousIdUsers: one(users, {
		fields: [hrPayStructureTemplateHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrPayStructureTemplateHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrPayStructureTemplateHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrPayStructureTemplateHistory_changesBy_users_idUsers"
	}),
}));

export const hrPayStructureVariableInputRelations = relations(hrPayStructureVariableInput, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrPayStructureVariableInput.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrPayStructureVariableInput.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrPayStructureVariableInput.idUsers],
		references: [users.idUsers]
	}),
	hrVariableInputHistories: many(hrVariableInputHistory),
}));

export const hrPaymentRelations = relations(hrPayment, ({ one }) => ({
	user: one(users, {
		fields: [hrPayment.idUsers],
		references: [users.idUsers]
	}),
	accLedger: one(accLedgers, {
		fields: [hrPayment.idLedger],
		references: [accLedgers.idLedgers]
	}),
}));

export const hrPortalAccessRecordsRelations = relations(hrPortalAccessRecords, ({ one }) => ({
	user: one(users, {
		fields: [hrPortalAccessRecords.idUsers],
		references: [users.idUsers]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrPortalAccessRecords.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrPrefixRelations = relations(hrPrefix, ({ one }) => ({
	project: one(projects, {
		fields: [hrPrefix.projectId],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrPrefix.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrPresentCompanyRelations = relations(hrPresentCompany, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrPresentCompany.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrPresentCompany.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	project: one(projects, {
		fields: [hrPresentCompany.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrGrade: one(hrGrades, {
		fields: [hrPresentCompany.idGrade],
		references: [hrGrades.idGrade]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrPresentCompany.idDesignation],
		references: [hrDesignationMaster.designationId]
	}),
	user: one(users, {
		fields: [hrPresentCompany.idUser],
		references: [users.idUsers]
	}),
}));

export const hrPresentOffdayFileImportRelations = relations(hrPresentOffdayFileImport, ({ one, many }) => ({
	user: one(users, {
		fields: [hrPresentOffdayFileImport.idUser],
		references: [users.idUsers]
	}),
	hrPresentOffdayMonthlies: many(hrPresentOffdayMonthly),
}));

export const hrPresentOffdayMasterRelations = relations(hrPresentOffdayMaster, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrPresentOffdayMaster.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrPresentOffdayMaster.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrPresentOffdayMaster.idUsers],
		references: [users.idUsers]
	}),
	hrPresentOffdayTemplate: one(hrPresentOffdayTemplate, {
		fields: [hrPresentOffdayMaster.presentOffdayTemplateId],
		references: [hrPresentOffdayTemplate.presentOffdayTemplateId]
	}),
	hrPresentOffdayMasterHistories: many(hrPresentOffdayMasterHistory),
}));

export const hrPresentOffdayTemplateRelations = relations(hrPresentOffdayTemplate, ({ one, many }) => ({
	hrPresentOffdayMasters: many(hrPresentOffdayMaster),
	hrPresentOffdayMasterHistories: many(hrPresentOffdayMasterHistory),
	user: one(users, {
		fields: [hrPresentOffdayTemplate.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrPresentOffdayMasterHistoryRelations = relations(hrPresentOffdayMasterHistory, ({ one }) => ({
	hrPresentOffdayMaster: one(hrPresentOffdayMaster, {
		fields: [hrPresentOffdayMasterHistory.presentOffdayId],
		references: [hrPresentOffdayMaster.presentOffdayId]
	}),
	hrPresentOffdayTemplate: one(hrPresentOffdayTemplate, {
		fields: [hrPresentOffdayMasterHistory.presentOffdayTemplateId],
		references: [hrPresentOffdayTemplate.presentOffdayTemplateId]
	}),
	user_changesBy: one(users, {
		fields: [hrPresentOffdayMasterHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrPresentOffdayMasterHistory_changesBy_users_idUsers"
	}),
	user_previousIdUser: one(users, {
		fields: [hrPresentOffdayMasterHistory.previousIdUser],
		references: [users.idUsers],
		relationName: "hrPresentOffdayMasterHistory_previousIdUser_users_idUsers"
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrPresentOffdayMasterHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrPresentOffdayMonthlyRelations = relations(hrPresentOffdayMonthly, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrPresentOffdayMonthly.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrPresentOffdayMonthly.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrPresentOffdayMonthly.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrPresentOffdayFileImport: one(hrPresentOffdayFileImport, {
		fields: [hrPresentOffdayMonthly.idHrPresentOffdayFileImport],
		references: [hrPresentOffdayFileImport.idHrPresentOffdayFileImport]
	}),
}));

export const hrPresentOffdayMonthlyHistoryRelations = relations(hrPresentOffdayMonthlyHistory, ({ one }) => ({
	user_changesBy: one(users, {
		fields: [hrPresentOffdayMonthlyHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrPresentOffdayMonthlyHistory_changesBy_users_idUsers"
	}),
	user_previousIdUser: one(users, {
		fields: [hrPresentOffdayMonthlyHistory.previousIdUser],
		references: [users.idUsers],
		relationName: "hrPresentOffdayMonthlyHistory_previousIdUser_users_idUsers"
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrPresentOffdayMonthlyHistory.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const hrPresentOffdaySetupFileImportRelations = relations(hrPresentOffdaySetupFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrPresentOffdaySetupFileImport.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrPresentOffdaySetupFileImport.idProjects],
		references: [projects.idProjects]
	}),
}));

export const hrProjectPermissionRelations = relations(hrProjectPermission, ({ one }) => ({
	project: one(projects, {
		fields: [hrProjectPermission.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrProjectPermission.idUser],
		references: [users.idUsers]
	}),
}));

export const hrProjectwiseRoleAssignRelations = relations(hrProjectwiseRoleAssign, ({ one }) => ({
	project: one(projects, {
		fields: [hrProjectwiseRoleAssign.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrProjectwiseRoleAssign.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrProjectwiseTemplateAssignRelations = relations(hrProjectwiseTemplateAssign, ({ one }) => ({
	user: one(users, {
		fields: [hrProjectwiseTemplateAssign.idUsers],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrProjectwiseTemplateAssign.idBusinessUnit],
		references: [projects.idProjects]
	}),
}));

export const hrPromotionInfoRelations = relations(hrPromotionInfo, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrPromotionInfo.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrDesignationMaster_idDesignation: one(hrDesignationMaster, {
		fields: [hrPromotionInfo.idDesignation],
		references: [hrDesignationMaster.designationId],
		relationName: "hrPromotionInfo_idDesignation_hrDesignationMaster_designationId"
	}),
	user: one(users, {
		fields: [hrPromotionInfo.idUsers],
		references: [users.idUsers]
	}),
	hrEquivalentDesignation: one(hrEquivalentDesignation, {
		fields: [hrPromotionInfo.idEquivalentDesignation],
		references: [hrEquivalentDesignation.equivalentDesignationId]
	}),
	company: one(companies, {
		fields: [hrPromotionInfo.idPrevCompany],
		references: [companies.idCompanies]
	}),
	project: one(projects, {
		fields: [hrPromotionInfo.idPrevBusinessUnit],
		references: [projects.idProjects]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrPromotionInfo.idPrevDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrDesignationMaster_idPrevDesignation: one(hrDesignationMaster, {
		fields: [hrPromotionInfo.idPrevDesignation],
		references: [hrDesignationMaster.designationId],
		relationName: "hrPromotionInfo_idPrevDesignation_hrDesignationMaster_designationId"
	}),
}));

export const hrProvidentFundDetailsRelations = relations(hrProvidentFundDetails, ({ one }) => ({
	hrProvidentFundSetup: one(hrProvidentFundSetup, {
		fields: [hrProvidentFundDetails.idHrProvidentFundSetup],
		references: [hrProvidentFundSetup.idHrProvidentFundSetup]
	}),
	hrProvidentFundTemplate: one(hrProvidentFundTemplate, {
		fields: [hrProvidentFundDetails.idHrProvidentFundTemplate],
		references: [hrProvidentFundTemplate.idHrProvidentFundTemplate]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrProvidentFundDetails.employeeId],
		references: [hrEmployee.employeeId]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrProvidentFundDetails.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	hrPaySlipGeneration: one(hrPaySlipGeneration, {
		fields: [hrProvidentFundDetails.paySlipGenerationId],
		references: [hrPaySlipGeneration.paySlipGenerationId]
	}),
	hrPaySlipGenerationDetail: one(hrPaySlipGenerationDetails, {
		fields: [hrProvidentFundDetails.generationDetailsId],
		references: [hrPaySlipGenerationDetails.generationDetailsId]
	}),
	hrPaySlipGenerationInfo: one(hrPaySlipGenerationInfo, {
		fields: [hrProvidentFundDetails.idPaySlipGenerationInfo],
		references: [hrPaySlipGenerationInfo.idPaySlipGenerationInfo]
	}),
	user: one(users, {
		fields: [hrProvidentFundDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrProvidentFundSetupRelations = relations(hrProvidentFundSetup, ({ one, many }) => ({
	hrProvidentFundDetails: many(hrProvidentFundDetails),
	hrProvidentFundTemplate: one(hrProvidentFundTemplate, {
		fields: [hrProvidentFundSetup.idHrProvidentFundTemplate],
		references: [hrProvidentFundTemplate.idHrProvidentFundTemplate]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrProvidentFundSetup.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrProvidentFundSetup.idProjects],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrProvidentFundSetup.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrProvidentFundTemplateRelations = relations(hrProvidentFundTemplate, ({ one, many }) => ({
	hrProvidentFundDetails: many(hrProvidentFundDetails),
	hrProvidentFundSetups: many(hrProvidentFundSetup),
	project: one(projects, {
		fields: [hrProvidentFundTemplate.idProjects],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrProvidentFundTemplate.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrReferenceRelations = relations(hrReference, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrReference.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrReference.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrSalaryBusinessUnitRelations = relations(hrSalaryBusinessUnit, ({ one }) => ({
	project: one(projects, {
		fields: [hrSalaryBusinessUnit.idBusinessUnit],
		references: [projects.idProjects]
	}),
	banksOriginal: one(banksOriginal, {
		fields: [hrSalaryBusinessUnit.bankId],
		references: [banksOriginal.idBanks]
	}),
	hrBankBranchMaster: one(hrBankBranchMaster, {
		fields: [hrSalaryBusinessUnit.branchId],
		references: [hrBankBranchMaster.branchId]
	}),
	user: one(users, {
		fields: [hrSalaryBusinessUnit.idUsers],
		references: [users.idUsers]
	}),
}));

export const banksOriginalRelations = relations(banksOriginal, ({ many }) => ({
	hrSalaryBusinessUnits: many(hrSalaryBusinessUnit),
	hrisRentAgreementDetails: many(hrisRentAgreementDetails),
}));

export const hrTaxAreaRelations = relations(hrTaxArea, ({ one }) => ({
	hrTaxTemplate: one(hrTaxTemplate, {
		fields: [hrTaxArea.idHrTaxTemplate],
		references: [hrTaxTemplate.idHrTaxTemplate]
	}),
	hrTaxAreaType: one(hrTaxAreaType, {
		fields: [hrTaxArea.idHrTaxAreaType],
		references: [hrTaxAreaType.idHrTaxAreaType]
	}),
	user: one(users, {
		fields: [hrTaxArea.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrTaxTemplateRelations = relations(hrTaxTemplate, ({ one, many }) => ({
	hrTaxAreas: many(hrTaxArea),
	hrTaxBonusSetups: many(hrTaxBonusSetup),
	hrTaxCalculationRanges: many(hrTaxCalculationRange),
	hrTaxCalculationRangeHistories: many(hrTaxCalculationRangeHistory),
	hrTaxPolicyEarningHeadWises: many(hrTaxPolicyEarningHeadWise),
	hrTaxPolicyEarningHeadWiseHistories: many(hrTaxPolicyEarningHeadWiseHistory),
	hrTaxRecalculates: many(hrTaxRecalculate),
	user: one(users, {
		fields: [hrTaxTemplate.idUsers],
		references: [users.idUsers]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrTaxTemplate.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	hrTaxTemplateHistories: many(hrTaxTemplateHistory),
}));

export const hrTaxAreaTypeRelations = relations(hrTaxAreaType, ({ many }) => ({
	hrTaxAreas: many(hrTaxArea),
	porEmployeeTinInfos: many(porEmployeeTinInfo),
}));

export const hrTaxBonusSetupRelations = relations(hrTaxBonusSetup, ({ one }) => ({
	hrTaxTemplate: one(hrTaxTemplate, {
		fields: [hrTaxBonusSetup.idHrTaxTemplate],
		references: [hrTaxTemplate.idHrTaxTemplate]
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrTaxBonusSetup.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	user: one(users, {
		fields: [hrTaxBonusSetup.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrTaxCalculationRangeRelations = relations(hrTaxCalculationRange, ({ one }) => ({
	hrTaxTemplate: one(hrTaxTemplate, {
		fields: [hrTaxCalculationRange.idHrTaxTemplate],
		references: [hrTaxTemplate.idHrTaxTemplate]
	}),
	user: one(users, {
		fields: [hrTaxCalculationRange.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrTaxCalculationRangeHistoryRelations = relations(hrTaxCalculationRangeHistory, ({ one }) => ({
	hrTaxTemplate: one(hrTaxTemplate, {
		fields: [hrTaxCalculationRangeHistory.idHrTaxTemplate],
		references: [hrTaxTemplate.idHrTaxTemplate]
	}),
	user_previousIdUsers: one(users, {
		fields: [hrTaxCalculationRangeHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrTaxCalculationRangeHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrTaxCalculationRangeHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrTaxCalculationRangeHistory_changesBy_users_idUsers"
	}),
}));

export const hrTaxChallanEmployeeRelations = relations(hrTaxChallanEmployee, ({ one }) => ({
	hrTaxChallanEntry: one(hrTaxChallanEntry, {
		fields: [hrTaxChallanEmployee.idHrTaxChallanEntry],
		references: [hrTaxChallanEntry.idHrTaxChallanEntry]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrTaxChallanEmployee.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrTaxChallanEmployee.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrTaxChallanEntryRelations = relations(hrTaxChallanEntry, ({ one, many }) => ({
	hrTaxChallanEmployees: many(hrTaxChallanEmployee),
	project: one(projects, {
		fields: [hrTaxChallanEntry.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrBankBranchMaster: one(hrBankBranchMaster, {
		fields: [hrTaxChallanEntry.branchId],
		references: [hrBankBranchMaster.branchId]
	}),
	user_idUsers: one(users, {
		fields: [hrTaxChallanEntry.idUsers],
		references: [users.idUsers],
		relationName: "hrTaxChallanEntry_idUsers_users_idUsers"
	}),
	user_submittedById: one(users, {
		fields: [hrTaxChallanEntry.submittedById],
		references: [users.idUsers],
		relationName: "hrTaxChallanEntry_submittedById_users_idUsers"
	}),
	user_approverId: one(users, {
		fields: [hrTaxChallanEntry.approverId],
		references: [users.idUsers],
		relationName: "hrTaxChallanEntry_approverId_users_idUsers"
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrTaxChallanEntry.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	hrPaySlipGeneration: one(hrPaySlipGeneration, {
		fields: [hrTaxChallanEntry.paySlipGenerationId],
		references: [hrPaySlipGeneration.paySlipGenerationId]
	}),
	hrTaxChallanEntryHistories: many(hrTaxChallanEntryHistory),
}));

export const hrTaxChallanEntryFileImportRelations = relations(hrTaxChallanEntryFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrTaxChallanEntryFileImport.idUser],
		references: [users.idUsers]
	}),
}));

export const hrTaxChallanEntryHistoryRelations = relations(hrTaxChallanEntryHistory, ({ one }) => ({
	hrTaxChallanEntry: one(hrTaxChallanEntry, {
		fields: [hrTaxChallanEntryHistory.idHrTaxChallanEntry],
		references: [hrTaxChallanEntry.idHrTaxChallanEntry]
	}),
	user: one(users, {
		fields: [hrTaxChallanEntryHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrTaxPolicyEarningHeadWiseRelations = relations(hrTaxPolicyEarningHeadWise, ({ one }) => ({
	user: one(users, {
		fields: [hrTaxPolicyEarningHeadWise.idUsers],
		references: [users.idUsers]
	}),
	hrEarningHead: one(hrEarningHeads, {
		fields: [hrTaxPolicyEarningHeadWise.earningHeadsId],
		references: [hrEarningHeads.earningHeadsId]
	}),
	hrTaxTemplate: one(hrTaxTemplate, {
		fields: [hrTaxPolicyEarningHeadWise.idHrTaxTemplate],
		references: [hrTaxTemplate.idHrTaxTemplate]
	}),
}));

export const hrTaxPolicyEarningHeadWiseHistoryRelations = relations(hrTaxPolicyEarningHeadWiseHistory, ({ one }) => ({
	hrTaxTemplate: one(hrTaxTemplate, {
		fields: [hrTaxPolicyEarningHeadWiseHistory.idHrTaxTemplate],
		references: [hrTaxTemplate.idHrTaxTemplate]
	}),
	user_previousIdUsers: one(users, {
		fields: [hrTaxPolicyEarningHeadWiseHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrTaxPolicyEarningHeadWiseHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrTaxPolicyEarningHeadWiseHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrTaxPolicyEarningHeadWiseHistory_changesBy_users_idUsers"
	}),
}));

export const hrTaxTemplateHistoryRelations = relations(hrTaxTemplateHistory, ({ one }) => ({
	hrTaxTemplate: one(hrTaxTemplate, {
		fields: [hrTaxTemplateHistory.idHrTaxTemplate],
		references: [hrTaxTemplate.idHrTaxTemplate]
	}),
	user_previousIdUsers: one(users, {
		fields: [hrTaxTemplateHistory.previousIdUsers],
		references: [users.idUsers],
		relationName: "hrTaxTemplateHistory_previousIdUsers_users_idUsers"
	}),
	user_changesBy: one(users, {
		fields: [hrTaxTemplateHistory.changesBy],
		references: [users.idUsers],
		relationName: "hrTaxTemplateHistory_changesBy_users_idUsers"
	}),
}));

export const hrTrainingCertificationRelations = relations(hrTrainingCertification, ({ one }) => ({
	hrInstitute: one(hrInstitutes, {
		fields: [hrTrainingCertification.idHrInstitutes],
		references: [hrInstitutes.idHrInstitutes]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrTrainingCertification.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrTrainingCertification.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrInstitutesRelations = relations(hrInstitutes, ({ many }) => ({
	hrTrainingCertifications: many(hrTrainingCertification),
}));

export const hrTransferredCompanyRelations = relations(hrTransferredCompany, ({ one }) => ({
	user: one(users, {
		fields: [hrTransferredCompany.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrTransferredCompany.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrTransferredCompany.idEmployee],
		references: [hrEmployee.employeeId]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrTransferredCompany.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrGrade: one(hrGrades, {
		fields: [hrTransferredCompany.idGrade],
		references: [hrGrades.idGrade]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrTransferredCompany.idDesignation],
		references: [hrDesignationMaster.designationId]
	}),
}));

export const hrTransferredEmployeesSalaryRelations = relations(hrTransferredEmployeesSalary, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrTransferredEmployeesSalary.employeeId],
		references: [hrEmployee.employeeId]
	}),
	project: one(projects, {
		fields: [hrTransferredEmployeesSalary.idBusinessUnit],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrTransferredEmployeesSalary.idUsers],
		references: [users.idUsers]
	}),
	hrPayStructureTemplate: one(hrPayStructureTemplate, {
		fields: [hrTransferredEmployeesSalary.payStructureTemplateId],
		references: [hrPayStructureTemplate.payStructureTemplateId]
	}),
	hrEmployeeTransfer: one(hrEmployeeTransfer, {
		fields: [hrTransferredEmployeesSalary.transferId],
		references: [hrEmployeeTransfer.employeeTransferId]
	}),
}));

export const hrVariableInputFileImportRelations = relations(hrVariableInputFileImport, ({ one }) => ({
	user: one(users, {
		fields: [hrVariableInputFileImport.idUser],
		references: [users.idUsers]
	}),
	project: one(projects, {
		fields: [hrVariableInputFileImport.idBusinessUnit],
		references: [projects.idProjects]
	}),
}));

export const hrVariableInputHistoryRelations = relations(hrVariableInputHistory, ({ one }) => ({
	hrPayStructureVariableInput: one(hrPayStructureVariableInput, {
		fields: [hrVariableInputHistory.payStructureVariableInputId],
		references: [hrPayStructureVariableInput.payStructureVariableInputId]
	}),
	user: one(users, {
		fields: [hrVariableInputHistory.previousIdUsers],
		references: [users.idUsers]
	}),
}));

export const hrisCandidateUserAddressesRelations = relations(hrisCandidateUserAddresses, ({ one }) => ({
	hrisCandidateUser: one(hrisCandidateUsers, {
		fields: [hrisCandidateUserAddresses.idCandidateUser],
		references: [hrisCandidateUsers.idCandidateUser]
	}),
}));

export const hrisCandidateUsersRelations = relations(hrisCandidateUsers, ({ many }) => ({
	hrisCandidateUserAddresses: many(hrisCandidateUserAddresses),
	hrisCandidateUserEducations: many(hrisCandidateUserEducations),
	hrisCandidateUserExperiences: many(hrisCandidateUserExperiences),
	hrisCandidateUserReferences: many(hrisCandidateUserReferences),
	hrisCandidateUserTrainings: many(hrisCandidateUserTrainings),
	hrisInterViewSetupDetails: many(hrisInterViewSetupDetails),
	hrisJobApplications: many(hrisJobApplications),
	hrisTalentAcquisitionJoiningDetails: many(hrisTalentAcquisitionJoiningDetails),
}));

export const hrisCandidateUserEducationsRelations = relations(hrisCandidateUserEducations, ({ one }) => ({
	hrisCandidateUser: one(hrisCandidateUsers, {
		fields: [hrisCandidateUserEducations.idCandidateUser],
		references: [hrisCandidateUsers.idCandidateUser]
	}),
}));

export const hrisCandidateUserExperiencesRelations = relations(hrisCandidateUserExperiences, ({ one }) => ({
	hrisCandidateUser: one(hrisCandidateUsers, {
		fields: [hrisCandidateUserExperiences.idCandidateUser],
		references: [hrisCandidateUsers.idCandidateUser]
	}),
}));

export const hrisCandidateUserReferencesRelations = relations(hrisCandidateUserReferences, ({ one }) => ({
	hrisCandidateUser: one(hrisCandidateUsers, {
		fields: [hrisCandidateUserReferences.idCandidateUser],
		references: [hrisCandidateUsers.idCandidateUser]
	}),
}));

export const hrisCandidateUserTrainingsRelations = relations(hrisCandidateUserTrainings, ({ one }) => ({
	hrisCandidateUser: one(hrisCandidateUsers, {
		fields: [hrisCandidateUserTrainings.idCandidateUser],
		references: [hrisCandidateUsers.idCandidateUser]
	}),
}));

export const hrisCiteriaMasterRelations = relations(hrisCiteriaMaster, ({ one }) => ({
	project: one(projects, {
		fields: [hrisCiteriaMaster.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisCiteriaMaster.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisDepartmentalBudgetRelations = relations(hrisDepartmentalBudget, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisDepartmentalBudget.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisDepartmentalBudget.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisDepartmentalBudget.idDesignation],
		references: [hrDesignationMaster.designationId]
	}),
	user: one(users, {
		fields: [hrisDepartmentalBudget.idUsers],
		references: [users.idUsers]
	}),
	hrisDepartmentalBudgetDetails: many(hrisDepartmentalBudgetDetails),
}));

export const hrisDepartmentalBudgetDetailsRelations = relations(hrisDepartmentalBudgetDetails, ({ one }) => ({
	hrisDepartmentalBudget: one(hrisDepartmentalBudget, {
		fields: [hrisDepartmentalBudgetDetails.idHrisDepartmentalBudget],
		references: [hrisDepartmentalBudget.idHrisDepartmentalBudget]
	}),
	hrisJobCreateDetail: one(hrisJobCreateDetails, {
		fields: [hrisDepartmentalBudgetDetails.idHrisJobCreateDetails],
		references: [hrisJobCreateDetails.idHrisJobCreateDetails]
	}),
}));

export const hrisJobCreateDetailsRelations = relations(hrisJobCreateDetails, ({ one, many }) => ({
	hrisDepartmentalBudgetDetails: many(hrisDepartmentalBudgetDetails),
	hrisJobCreate: one(hrisJobCreate, {
		fields: [hrisJobCreateDetails.idHrisJobCreate],
		references: [hrisJobCreate.idHrisJobCreate]
	}),
}));

export const hrisDocumentMasterRelations = relations(hrisDocumentMaster, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisDocumentMaster.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisDocumentMaster.idUsers],
		references: [users.idUsers]
	}),
	hrisTalentAcquisitionJoiningHandoverDocumentsDetails: many(hrisTalentAcquisitionJoiningHandoverDocumentsDetails),
	hrisTalentAcquisitionJoiningReceiveDocumentsDetails: many(hrisTalentAcquisitionJoiningReceiveDocumentsDetails),
}));

export const hrisEmployeeSittingArragementDetailsRelations = relations(hrisEmployeeSittingArragementDetails, ({ one }) => ({
	project: one(projects, {
		fields: [hrisEmployeeSittingArragementDetails.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisEmployeeSittingArragementDetails.idUsers],
		references: [users.idUsers]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrisEmployeeSittingArragementDetails.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisEmployeeSittingArragementDetails.designationId],
		references: [hrDesignationMaster.designationId]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisEmployeeSittingArragementDetails.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrisWorkStationFlatRoomDetail: one(hrisWorkStationFlatRoomDetails, {
		fields: [hrisEmployeeSittingArragementDetails.idHrisWorkStationFlatRoomDetails],
		references: [hrisWorkStationFlatRoomDetails.idHrisWorkStationFlatRoomDetails]
	}),
	hrisWorkStationFlatDetail: one(hrisWorkStationFlatDetails, {
		fields: [hrisEmployeeSittingArragementDetails.idHrisWorkStationFlatDetails],
		references: [hrisWorkStationFlatDetails.idHrisWorkStationFlatDetails]
	}),
}));

export const hrisWorkStationFlatRoomDetailsRelations = relations(hrisWorkStationFlatRoomDetails, ({ one, many }) => ({
	hrisEmployeeSittingArragementDetails: many(hrisEmployeeSittingArragementDetails),
	hrisWorkStationFlatDetail: one(hrisWorkStationFlatDetails, {
		fields: [hrisWorkStationFlatRoomDetails.idHrisWorkStationFlatDetails],
		references: [hrisWorkStationFlatDetails.idHrisWorkStationFlatDetails]
	}),
	user: one(users, {
		fields: [hrisWorkStationFlatRoomDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisWorkStationFlatDetailsRelations = relations(hrisWorkStationFlatDetails, ({ one, many }) => ({
	hrisEmployeeSittingArragementDetails: many(hrisEmployeeSittingArragementDetails),
	hrisWorkStationFloorDetail: one(hrisWorkStationFloorDetails, {
		fields: [hrisWorkStationFlatDetails.idHrisWorkStationFloorDetails],
		references: [hrisWorkStationFloorDetails.idHrisWorkStationFloorDetails]
	}),
	user: one(users, {
		fields: [hrisWorkStationFlatDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisWorkStationFlatRoomDetails: many(hrisWorkStationFlatRoomDetails),
}));

export const hrisEmployeeStationaryRequisitionDetailsRelations = relations(hrisEmployeeStationaryRequisitionDetails, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisEmployeeStationaryRequisitionDetails.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisEmployeeStationaryRequisitionDetails.idUsers],
		references: [users.idUsers]
	}),
	hrEmployee_employeeId: one(hrEmployee, {
		fields: [hrisEmployeeStationaryRequisitionDetails.employeeId],
		references: [hrEmployee.employeeId],
		relationName: "hrisEmployeeStationaryRequisitionDetails_employeeId_hrEmployee_employeeId"
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisEmployeeStationaryRequisitionDetails.designationId],
		references: [hrDesignationMaster.designationId]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisEmployeeStationaryRequisitionDetails.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrEmployee_stationaryProductConcernEmployeeId: one(hrEmployee, {
		fields: [hrisEmployeeStationaryRequisitionDetails.stationaryProductConcernEmployeeId],
		references: [hrEmployee.employeeId],
		relationName: "hrisEmployeeStationaryRequisitionDetails_stationaryProductConcernEmployeeId_hrEmployee_employeeId"
	}),
}));

export const hrisEvaluationScoreMasterRelations = relations(hrisEvaluationScoreMaster, ({ one }) => ({
	project: one(projects, {
		fields: [hrisEvaluationScoreMaster.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisEvaluationScoreMaster.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisFileArchiveDocumentForRelations = relations(hrisFileArchiveDocumentFor, ({ one }) => ({
	hrisFileArchiveDocumentType: one(hrisFileArchiveDocumentType, {
		fields: [hrisFileArchiveDocumentFor.idHrisFileArchiveDocumentType],
		references: [hrisFileArchiveDocumentType.idHrisFileArchiveDocumentType]
	}),
	user: one(users, {
		fields: [hrisFileArchiveDocumentFor.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisFileArchiveDocumentTypeRelations = relations(hrisFileArchiveDocumentType, ({ one, many }) => ({
	hrisFileArchiveDocumentFors: many(hrisFileArchiveDocumentFor),
	user: one(users, {
		fields: [hrisFileArchiveDocumentType.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisFileArchiveEntryRelations = relations(hrisFileArchiveEntry, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrisFileArchiveEntry.employeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrisFileArchiveEntry.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisFileArchiveEntryDetailsRelations = relations(hrisFileArchiveEntryDetails, ({ one }) => ({
	user: one(users, {
		fields: [hrisFileArchiveEntryDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisGuestInterViewerDetailsRelations = relations(hrisGuestInterViewerDetails, ({ one }) => ({
	project: one(projects, {
		fields: [hrisGuestInterViewerDetails.idProject],
		references: [projects.idProjects]
	}),
	hrisInterViewBoard: one(hrisInterViewBoard, {
		fields: [hrisGuestInterViewerDetails.idHrisInterViewBoard],
		references: [hrisInterViewBoard.idHrisInterViewBoard]
	}),
	user: one(users, {
		fields: [hrisGuestInterViewerDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisInterViewBoardRelations = relations(hrisInterViewBoard, ({ one, many }) => ({
	hrisGuestInterViewerDetails: many(hrisGuestInterViewerDetails),
	project: one(projects, {
		fields: [hrisInterViewBoard.idProject],
		references: [projects.idProjects]
	}),
	hrisJobRequisition: one(hrisJobRequisitions, {
		fields: [hrisInterViewBoard.hrisJobRequisitionId],
		references: [hrisJobRequisitions.idJobRequisition]
	}),
	user: one(users, {
		fields: [hrisInterViewBoard.idUsers],
		references: [users.idUsers]
	}),
	hrisInterViewTimeScheduleDetails: many(hrisInterViewTimeScheduleDetails),
	hrisInterViewerDetails: many(hrisInterViewerDetails),
}));

export const hrisJobRequisitionsRelations = relations(hrisJobRequisitions, ({ one, many }) => ({
	hrisInterViewBoards: many(hrisInterViewBoard),
	hrisInterViewSetupDetails: many(hrisInterViewSetupDetails),
	hrisJobAdvertisements: many(hrisJobAdvertisements),
	hrisJobApplicationHistories_previousJobRequisitionId: many(hrisJobApplicationHistory, {
		relationName: "hrisJobApplicationHistory_previousJobRequisitionId_hrisJobRequisitions_idJobRequisition"
	}),
	hrisJobApplicationHistories_currentJobRequisitionId: many(hrisJobApplicationHistory, {
		relationName: "hrisJobApplicationHistory_currentJobRequisitionId_hrisJobRequisitions_idJobRequisition"
	}),
	hrisJobApplications: many(hrisJobApplications),
	hrisJobRequisitionApprovalActivities: many(hrisJobRequisitionApprovalActivities),
	hrDepartment: one(hrDepartments, {
		fields: [hrisJobRequisitions.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrEmployee_idRecruitmentOfficer: one(hrEmployee, {
		fields: [hrisJobRequisitions.idRecruitmentOfficer],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idRecruitmentOfficer_hrEmployee_employeeId"
	}),
	hrEmployee_idHrRecommendation: one(hrEmployee, {
		fields: [hrisJobRequisitions.idHrRecommendation],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idHrRecommendation_hrEmployee_employeeId"
	}),
	hrEmployee_idCooRecommendation: one(hrEmployee, {
		fields: [hrisJobRequisitions.idCooRecommendation],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idCooRecommendation_hrEmployee_employeeId"
	}),
	hrEmployee_idRequester: one(hrEmployee, {
		fields: [hrisJobRequisitions.idRequester],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idRequester_hrEmployee_employeeId"
	}),
	hrEmployee_idDivisionalHr: one(hrEmployee, {
		fields: [hrisJobRequisitions.idDivisionalHr],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idDivisionalHr_hrEmployee_employeeId"
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisJobRequisitions.idDesignation],
		references: [hrDesignationMaster.designationId]
	}),
	hrGrade: one(hrGrades, {
		fields: [hrisJobRequisitions.idGrade],
		references: [hrGrades.idGrade]
	}),
	hrEmployeeNatureType: one(hrEmployeeNatureType, {
		fields: [hrisJobRequisitions.idEmployeeStatus],
		references: [hrEmployeeNatureType.idEmployeeNatureType]
	}),
	hrWorkStation: one(hrWorkStation, {
		fields: [hrisJobRequisitions.idWorkStation],
		references: [hrWorkStation.workStationId]
	}),
	hrEmployee_idRecommender: one(hrEmployee, {
		fields: [hrisJobRequisitions.idRecommender],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idRecommender_hrEmployee_employeeId"
	}),
	hrEmployee_idProjectHr: one(hrEmployee, {
		fields: [hrisJobRequisitions.idProjectHr],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idProjectHr_hrEmployee_employeeId"
	}),
	hrEmployee_idCooChro: one(hrEmployee, {
		fields: [hrisJobRequisitions.idCooChro],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idCooChro_hrEmployee_employeeId"
	}),
	hrEmployee_idCeo: one(hrEmployee, {
		fields: [hrisJobRequisitions.idCeo],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobRequisitions_idCeo_hrEmployee_employeeId"
	}),
	hrisJobResponsibilities: many(hrisJobResponsibilities),
	hrisSpecialNotes: many(hrisSpecialNotes),
}));

export const hrisInterViewSetupDetailsRelations = relations(hrisInterViewSetupDetails, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisInterViewSetupDetails.idProject],
		references: [projects.idProjects]
	}),
	hrisJobRequisition: one(hrisJobRequisitions, {
		fields: [hrisInterViewSetupDetails.idJobRequisition],
		references: [hrisJobRequisitions.idJobRequisition]
	}),
	hrisInterViewTimeScheduleDetail: one(hrisInterViewTimeScheduleDetails, {
		fields: [hrisInterViewSetupDetails.idHrisInterViewTimeScheduleDetails],
		references: [hrisInterViewTimeScheduleDetails.idHrisInterViewTimeScheduleDetails]
	}),
	hrisCandidateUser: one(hrisCandidateUsers, {
		fields: [hrisInterViewSetupDetails.idCandidateUser],
		references: [hrisCandidateUsers.idCandidateUser]
	}),
	user: one(users, {
		fields: [hrisInterViewSetupDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisInterviewAppraises: many(hrisInterviewAppraise),
	hrisInterviewAppraisedCandidates: many(hrisInterviewAppraisedCandidates),
}));

export const hrisInterViewTimeScheduleDetailsRelations = relations(hrisInterViewTimeScheduleDetails, ({ one, many }) => ({
	hrisInterViewSetupDetails: many(hrisInterViewSetupDetails),
	project: one(projects, {
		fields: [hrisInterViewTimeScheduleDetails.idProject],
		references: [projects.idProjects]
	}),
	hrisInterViewBoard: one(hrisInterViewBoard, {
		fields: [hrisInterViewTimeScheduleDetails.idHrisInterViewBoard],
		references: [hrisInterViewBoard.idHrisInterViewBoard]
	}),
	user: one(users, {
		fields: [hrisInterViewTimeScheduleDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisInterViewerDetailsRelations = relations(hrisInterViewerDetails, ({ one }) => ({
	project: one(projects, {
		fields: [hrisInterViewerDetails.idProject],
		references: [projects.idProjects]
	}),
	hrisInterViewBoard: one(hrisInterViewBoard, {
		fields: [hrisInterViewerDetails.idHrisInterViewBoard],
		references: [hrisInterViewBoard.idHrisInterViewBoard]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrisInterViewerDetails.interViewerEmployeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrisInterViewerDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisInterviewAppraiseRelations = relations(hrisInterviewAppraise, ({ one, many }) => ({
	hrisInterViewSetupDetail: one(hrisInterViewSetupDetails, {
		fields: [hrisInterviewAppraise.idInterViewSetupDetails],
		references: [hrisInterViewSetupDetails.idHrisInterViewSetupDetails]
	}),
	hrisInterviewAppraisedRating: one(hrisInterviewAppraisedRatings, {
		fields: [hrisInterviewAppraise.idInterviewAppraisedRating],
		references: [hrisInterviewAppraisedRatings.idInterviewAppraisedRating]
	}),
	hrisInterviewAppraisedCharacteristic: one(hrisInterviewAppraisedCharacteristics, {
		fields: [hrisInterviewAppraise.idInterviewAppraisedCharacteristic],
		references: [hrisInterviewAppraisedCharacteristics.idInterviewAppraisedCharacteristic]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrisInterviewAppraise.appraisedBy],
		references: [hrEmployee.employeeId]
	}),
	hrisInterviewAppraisedReferences: many(hrisInterviewAppraisedReferences),
}));

export const hrisInterviewAppraisedRatingsRelations = relations(hrisInterviewAppraisedRatings, ({ many }) => ({
	hrisInterviewAppraises: many(hrisInterviewAppraise),
}));

export const hrisInterviewAppraisedCharacteristicsRelations = relations(hrisInterviewAppraisedCharacteristics, ({ many }) => ({
	hrisInterviewAppraises: many(hrisInterviewAppraise),
}));

export const hrisInterviewAppraisedCandidatesRelations = relations(hrisInterviewAppraisedCandidates, ({ one, many }) => ({
	hrisInterViewSetupDetail: one(hrisInterViewSetupDetails, {
		fields: [hrisInterviewAppraisedCandidates.idInterViewSetupDetails],
		references: [hrisInterViewSetupDetails.idHrisInterViewSetupDetails]
	}),
	hrisTalentAcquisitionJoiningDetails: many(hrisTalentAcquisitionJoiningDetails),
}));

export const hrisInterviewAppraisedReferencesRelations = relations(hrisInterviewAppraisedReferences, ({ one }) => ({
	hrisInterviewAppraise: one(hrisInterviewAppraise, {
		fields: [hrisInterviewAppraisedReferences.idInterviewAppraise],
		references: [hrisInterviewAppraise.idInterviewAppraise]
	}),
}));

export const hrisInterviewBoardMasterRelations = relations(hrisInterviewBoardMaster, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisInterviewBoardMaster.idProject],
		references: [projects.idProjects]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisInterviewBoardMaster.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	user: one(users, {
		fields: [hrisInterviewBoardMaster.idUsers],
		references: [users.idUsers]
	}),
	hrisInterviewBoardMasterInterviewerDetails: many(hrisInterviewBoardMasterInterviewerDetails),
}));

export const hrisInterviewBoardMasterInterviewerDetailsRelations = relations(hrisInterviewBoardMasterInterviewerDetails, ({ one }) => ({
	project: one(projects, {
		fields: [hrisInterviewBoardMasterInterviewerDetails.idProject],
		references: [projects.idProjects]
	}),
	hrisInterviewBoardMaster: one(hrisInterviewBoardMaster, {
		fields: [hrisInterviewBoardMasterInterviewerDetails.idHrisInterviewBoardMaster],
		references: [hrisInterviewBoardMaster.idHrisInterviewBoardMaster]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrisInterviewBoardMasterInterviewerDetails.interViewerEmployeeId],
		references: [hrEmployee.employeeId]
	}),
	user: one(users, {
		fields: [hrisInterviewBoardMasterInterviewerDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisItGoodsDetailsRelations = relations(hrisItGoodsDetails, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisItGoodsDetails.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisItGoodsDetails.idUsers],
		references: [users.idUsers]
	}),
	hrEmployee_employeeId: one(hrEmployee, {
		fields: [hrisItGoodsDetails.employeeId],
		references: [hrEmployee.employeeId],
		relationName: "hrisItGoodsDetails_employeeId_hrEmployee_employeeId"
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisItGoodsDetails.designationId],
		references: [hrDesignationMaster.designationId]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisItGoodsDetails.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrEmployee_concernSupervisorId: one(hrEmployee, {
		fields: [hrisItGoodsDetails.concernSupervisorId],
		references: [hrEmployee.employeeId],
		relationName: "hrisItGoodsDetails_concernSupervisorId_hrEmployee_employeeId"
	}),
	hrEmployee_concernItPersonId: one(hrEmployee, {
		fields: [hrisItGoodsDetails.concernItPersonId],
		references: [hrEmployee.employeeId],
		relationName: "hrisItGoodsDetails_concernItPersonId_hrEmployee_employeeId"
	}),
	hrisItGoodsItemsDetails: many(hrisItGoodsItemsDetails),
}));

export const hrisJobCreateRelations = relations(hrisJobCreate, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisJobCreate.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisJobCreate.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisJobCreate.idDesignation],
		references: [hrDesignationMaster.designationId]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [hrisJobCreate.idUsers],
		references: [hrEmployee.employeeId]
	}),
	hrisJobCreateDetails: many(hrisJobCreateDetails),
}));

export const hrisJobDescriptionRelations = relations(hrisJobDescription, ({ one, many }) => ({
	hrEmployee_reportingTo: one(hrEmployee, {
		fields: [hrisJobDescription.reportingTo],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobDescription_reportingTo_hrEmployee_employeeId"
	}),
	hrEmployee_idUsers: one(hrEmployee, {
		fields: [hrisJobDescription.idUsers],
		references: [hrEmployee.employeeId],
		relationName: "hrisJobDescription_idUsers_hrEmployee_employeeId"
	}),
	project: one(projects, {
		fields: [hrisJobDescription.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrGrade: one(hrGrades, {
		fields: [hrisJobDescription.gradeId],
		references: [hrGrades.idGrade]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisJobDescription.departmentId],
		references: [hrDepartments.idDepartment]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisJobDescription.designationId],
		references: [hrDesignationMaster.designationId]
	}),
	hrWorkStation: one(hrWorkStation, {
		fields: [hrisJobDescription.workStationId],
		references: [hrWorkStation.workStationId]
	}),
	hrisJobDescriptionDimensions: many(hrisJobDescriptionDimension),
	hrisJobDescriptionExperiences: many(hrisJobDescriptionExperience),
	hrisJobDescriptionExternalCustomers: many(hrisJobDescriptionExternalCustomer),
	hrisJobDescriptionInternalCustomers: many(hrisJobDescriptionInternalCustomer),
	hrisJobDescriptionPerformingAreas: many(hrisJobDescriptionPerformingArea),
	hrisJobDescriptionQualifications: many(hrisJobDescriptionQualification),
	hrisJobDescriptionQualityParameters: many(hrisJobDescriptionQualityParameter),
	hrisJobDescriptionSoftSkills: many(hrisJobDescriptionSoftSkill),
	hrisJobDescriptionSpecialRequirements: many(hrisJobDescriptionSpecialRequirement),
	hrisJobDescriptionTechnicalSkills: many(hrisJobDescriptionTechnicalSkill),
}));

export const hrisJobDescriptionDimensionRelations = relations(hrisJobDescriptionDimension, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionDimension.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionExperienceRelations = relations(hrisJobDescriptionExperience, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionExperience.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionExternalCustomerRelations = relations(hrisJobDescriptionExternalCustomer, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionExternalCustomer.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionInternalCustomerRelations = relations(hrisJobDescriptionInternalCustomer, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionInternalCustomer.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionNonPerformingAreasRelations = relations(hrisJobDescriptionNonPerformingAreas, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [hrisJobDescriptionNonPerformingAreas.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrisJobDescriptionPerformingArea: one(hrisJobDescriptionPerformingArea, {
		fields: [hrisJobDescriptionNonPerformingAreas.idJobDescriptionPerformingArea],
		references: [hrisJobDescriptionPerformingArea.idHrisJdPerformingArea]
	}),
}));

export const hrisJobDescriptionPerformingAreaRelations = relations(hrisJobDescriptionPerformingArea, ({ one, many }) => ({
	hrisJobDescriptionNonPerformingAreas: many(hrisJobDescriptionNonPerformingAreas),
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionPerformingArea.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionQualificationRelations = relations(hrisJobDescriptionQualification, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionQualification.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionQualityParameterRelations = relations(hrisJobDescriptionQualityParameter, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionQualityParameter.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionSoftSkillRelations = relations(hrisJobDescriptionSoftSkill, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionSoftSkill.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionSpecialRequirementRelations = relations(hrisJobDescriptionSpecialRequirement, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionSpecialRequirement.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobDescriptionTechnicalSkillRelations = relations(hrisJobDescriptionTechnicalSkill, ({ one }) => ({
	hrisJobDescription: one(hrisJobDescription, {
		fields: [hrisJobDescriptionTechnicalSkill.idHrisJobDescription],
		references: [hrisJobDescription.idHrisJobDescription]
	}),
}));

export const hrisJobRequisitionApprovalActivitiesRelations = relations(hrisJobRequisitionApprovalActivities, ({ one }) => ({
	hrisJobRequisition: one(hrisJobRequisitions, {
		fields: [hrisJobRequisitionApprovalActivities.idJobRequisition],
		references: [hrisJobRequisitions.idJobRequisition]
	}),
}));

export const hrisJobRequisitionSummeryRelations = relations(hrisJobRequisitionSummery, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisJobRequisitionSummery.idProjects],
		references: [projects.idProjects]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisJobRequisitionSummery.designationId],
		references: [hrDesignationMaster.designationId]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisJobRequisitionSummery.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	hrEmployeeNatureType: one(hrEmployeeNatureType, {
		fields: [hrisJobRequisitionSummery.idEmployeeNatureType],
		references: [hrEmployeeNatureType.idEmployeeNatureType]
	}),
	user: one(users, {
		fields: [hrisJobRequisitionSummery.idUsers],
		references: [users.idUsers]
	}),
	hrisJobRequisitionSummeryPotentialCandidateCvs: many(hrisJobRequisitionSummeryPotentialCandidateCv),
}));

export const hrisJobRequisitionSummeryPotentialCandidateCvRelations = relations(hrisJobRequisitionSummeryPotentialCandidateCv, ({ one }) => ({
	hrisJobRequisitionSummery: one(hrisJobRequisitionSummery, {
		fields: [hrisJobRequisitionSummeryPotentialCandidateCv.idHrisJobRequisitionSummery],
		references: [hrisJobRequisitionSummery.idHrisJobRequisitionSummery]
	}),
	user: one(users, {
		fields: [hrisJobRequisitionSummeryPotentialCandidateCv.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisJobResponsibilitiesRelations = relations(hrisJobResponsibilities, ({ one }) => ({
	hrisJobRequisition: one(hrisJobRequisitions, {
		fields: [hrisJobResponsibilities.idJobRequisition],
		references: [hrisJobRequisitions.idJobRequisition]
	}),
}));

export const hrisManPowerPlanningRelations = relations(hrisManPowerPlanning, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisManPowerPlanning.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrDepartment: one(hrDepartments, {
		fields: [hrisManPowerPlanning.idDepartment],
		references: [hrDepartments.idDepartment]
	}),
	user: one(users, {
		fields: [hrisManPowerPlanning.idUsers],
		references: [users.idUsers]
	}),
	hrisManPowerPlanningDetails: many(hrisManPowerPlanningDetails),
}));

export const hrisManPowerPlanningDetailsRelations = relations(hrisManPowerPlanningDetails, ({ one }) => ({
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisManPowerPlanningDetails.idDesignation],
		references: [hrDesignationMaster.designationId]
	}),
	hrisManPowerPlanning: one(hrisManPowerPlanning, {
		fields: [hrisManPowerPlanningDetails.idHrisManPowerPlanning],
		references: [hrisManPowerPlanning.idHrisManPowerPlanning]
	}),
}));

export const hrisMarkingSystemMasterRelations = relations(hrisMarkingSystemMaster, ({ one }) => ({
	project: one(projects, {
		fields: [hrisMarkingSystemMaster.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisMarkingSystemMaster.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisMediaMasterRelations = relations(hrisMediaMaster, ({ one }) => ({
	hrisMediaType: one(hrisMediaType, {
		fields: [hrisMediaMaster.idMediaType],
		references: [hrisMediaType.idMediaType]
	}),
}));

export const hrisMediaTypeRelations = relations(hrisMediaType, ({ many }) => ({
	hrisMediaMasters: many(hrisMediaMaster),
}));

export const hrisPerformanceAppraisalDateRangesRelations = relations(hrisPerformanceAppraisalDateRanges, ({ one, many }) => ({
	hrisPerformanceAppraisalSetup: one(hrisPerformanceAppraisalSetup, {
		fields: [hrisPerformanceAppraisalDateRanges.idPerformanceAppraisalSetup],
		references: [hrisPerformanceAppraisalSetup.idPerformanceAppraisalSetup]
	}),
	porPerformanceAppraiseDetails_idPerformanceAppraisalDateRange: many(porPerformanceAppraiseDetails, {
		relationName: "porPerformanceAppraiseDetails_idPerformanceAppraisalDateRange_hrisPerformanceAppraisalDateRanges_idPerformanceAppraisalDateRange"
	}),
	porPerformanceAppraiseDetails_idPerformanceAppraisalDateRange: many(porPerformanceAppraiseDetails, {
		relationName: "porPerformanceAppraiseDetails_idPerformanceAppraisalDateRange_hrisPerformanceAppraisalDateRanges_idPerformanceAppraisalDateRange"
	}),
}));

export const hrisPerformanceAppraisalSetupRelations = relations(hrisPerformanceAppraisalSetup, ({ one, many }) => ({
	hrisPerformanceAppraisalDateRanges: many(hrisPerformanceAppraisalDateRanges),
	accFiscalYear: one(accFiscalYear, {
		fields: [hrisPerformanceAppraisalSetup.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
	porEmployeeAppraisalDetails: many(porEmployeeAppraisalDetails),
	porPerformanceAppraises: many(porPerformanceAppraise),
}));

export const hrisPmsScoreMasterRelations = relations(hrisPmsScoreMaster, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisPmsScoreMaster.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisPmsScoreMaster.idUsers],
		references: [users.idUsers]
	}),
	porPerformanceAppraises: many(porPerformanceAppraise),
}));

export const hrisRentAgreementBenificiaryDetailsRelations = relations(hrisRentAgreementBenificiaryDetails, ({ one }) => ({
	hrisRentAgreementDetail: one(hrisRentAgreementDetails, {
		fields: [hrisRentAgreementBenificiaryDetails.idHrisRentAgreementDetails],
		references: [hrisRentAgreementDetails.idHrisRentAgreementDetails]
	}),
	project: one(projects, {
		fields: [hrisRentAgreementBenificiaryDetails.businessUnitIdBenificiary],
		references: [projects.idProjects]
	}),
	costCenter: one(costCenter, {
		fields: [hrisRentAgreementBenificiaryDetails.costCenterIdBenificiary],
		references: [costCenter.idCostCenter]
	}),
	user: one(users, {
		fields: [hrisRentAgreementBenificiaryDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisRentAgreementLessorsDetailsRelations = relations(hrisRentAgreementLessorsDetails, ({ one }) => ({
	hrisRentAgreementDetail: one(hrisRentAgreementDetails, {
		fields: [hrisRentAgreementLessorsDetails.idHrisRentAgreementDetails],
		references: [hrisRentAgreementDetails.idHrisRentAgreementDetails]
	}),
	user: one(users, {
		fields: [hrisRentAgreementLessorsDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisRentAgreementPaymentDetailsRelations = relations(hrisRentAgreementPaymentDetails, ({ one }) => ({
	user: one(users, {
		fields: [hrisRentAgreementPaymentDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisRentAgreementDetail: one(hrisRentAgreementDetails, {
		fields: [hrisRentAgreementPaymentDetails.idHrisRentAgreementDetails],
		references: [hrisRentAgreementDetails.idHrisRentAgreementDetails]
	}),
	accLedger: one(accLedgers, {
		fields: [hrisRentAgreementPaymentDetails.idLedgers],
		references: [accLedgers.idLedgers]
	}),
}));

export const hrisRentAgreementRentDetailsRelations = relations(hrisRentAgreementRentDetails, ({ one }) => ({
	hrisRentAgreementDetail: one(hrisRentAgreementDetails, {
		fields: [hrisRentAgreementRentDetails.idHrisRentAgreementDetails],
		references: [hrisRentAgreementDetails.idHrisRentAgreementDetails]
	}),
	user: one(users, {
		fields: [hrisRentAgreementRentDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisRentGenerationAttachmentsDetailsRelations = relations(hrisRentGenerationAttachmentsDetails, ({ one }) => ({
	hrisRentGenerationDetail: one(hrisRentGenerationDetails, {
		fields: [hrisRentGenerationAttachmentsDetails.idHrisRentGenerationDetails],
		references: [hrisRentGenerationDetails.idHrisRentGenerationDetails]
	}),
	user: one(users, {
		fields: [hrisRentGenerationAttachmentsDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisRentGenerationDetailsRelations = relations(hrisRentGenerationDetails, ({ one, many }) => ({
	hrisRentGenerationAttachmentsDetails: many(hrisRentGenerationAttachmentsDetails),
	hrisRentAgreementDetail: one(hrisRentAgreementDetails, {
		fields: [hrisRentGenerationDetails.idHrisRentAgreementDetails],
		references: [hrisRentAgreementDetails.idHrisRentAgreementDetails]
	}),
	hrEmployee_approvedBy: one(hrEmployee, {
		fields: [hrisRentGenerationDetails.approvedBy],
		references: [hrEmployee.employeeId],
		relationName: "hrisRentGenerationDetails_approvedBy_hrEmployee_employeeId"
	}),
	hrEmployee_apEmployeeId: one(hrEmployee, {
		fields: [hrisRentGenerationDetails.apEmployeeId],
		references: [hrEmployee.employeeId],
		relationName: "hrisRentGenerationDetails_apEmployeeId_hrEmployee_employeeId"
	}),
	hrEmployee_accountantEmployeeId: one(hrEmployee, {
		fields: [hrisRentGenerationDetails.accountantEmployeeId],
		references: [hrEmployee.employeeId],
		relationName: "hrisRentGenerationDetails_accountantEmployeeId_hrEmployee_employeeId"
	}),
	hrEmployee_checkedBy: one(hrEmployee, {
		fields: [hrisRentGenerationDetails.checkedBy],
		references: [hrEmployee.employeeId],
		relationName: "hrisRentGenerationDetails_checkedBy_hrEmployee_employeeId"
	}),
	hrEmployee_submittedBy: one(hrEmployee, {
		fields: [hrisRentGenerationDetails.submittedBy],
		references: [hrEmployee.employeeId],
		relationName: "hrisRentGenerationDetails_submittedBy_hrEmployee_employeeId"
	}),
	hrEmployee_certifiedBy: one(hrEmployee, {
		fields: [hrisRentGenerationDetails.certifiedBy],
		references: [hrEmployee.employeeId],
		relationName: "hrisRentGenerationDetails_certifiedBy_hrEmployee_employeeId"
	}),
	hrisRentGenerationPaymentDetails: many(hrisRentGenerationPaymentDetails),
}));

export const hrisRentGenerationPaymentDetailsRelations = relations(hrisRentGenerationPaymentDetails, ({ one }) => ({
	user: one(users, {
		fields: [hrisRentGenerationPaymentDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisRentGenerationDetail: one(hrisRentGenerationDetails, {
		fields: [hrisRentGenerationPaymentDetails.idHrisRentGenerationDetails],
		references: [hrisRentGenerationDetails.idHrisRentGenerationDetails]
	}),
	accLedger: one(accLedgers, {
		fields: [hrisRentGenerationPaymentDetails.idLedgers],
		references: [accLedgers.idLedgers]
	}),
}));

export const hrisResidentDetailsRelations = relations(hrisResidentDetails, ({ one, many }) => ({
	user: one(users, {
		fields: [hrisResidentDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisResidentFloorDetails: many(hrisResidentFloorDetails),
}));

export const hrisResidentFlatDetailsRelations = relations(hrisResidentFlatDetails, ({ one, many }) => ({
	hrisResidentFloorDetail: one(hrisResidentFloorDetails, {
		fields: [hrisResidentFlatDetails.idHrisResidentFloorDetails],
		references: [hrisResidentFloorDetails.idHrisResidentFloorDetails]
	}),
	user: one(users, {
		fields: [hrisResidentFlatDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisResidentFlatRoomDetails: many(hrisResidentFlatRoomDetails),
}));

export const hrisResidentFloorDetailsRelations = relations(hrisResidentFloorDetails, ({ one, many }) => ({
	hrisResidentFlatDetails: many(hrisResidentFlatDetails),
	hrisResidentDetail: one(hrisResidentDetails, {
		fields: [hrisResidentFloorDetails.idHrisResidentDetails],
		references: [hrisResidentDetails.idHrisResidentDetails]
	}),
	user: one(users, {
		fields: [hrisResidentFloorDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisResidentFlatRoomDetailsRelations = relations(hrisResidentFlatRoomDetails, ({ one }) => ({
	hrisResidentFlatDetail: one(hrisResidentFlatDetails, {
		fields: [hrisResidentFlatRoomDetails.idHrisResidentFlatDetails],
		references: [hrisResidentFlatDetails.idHrisResidentFlatDetails]
	}),
	user: one(users, {
		fields: [hrisResidentFlatRoomDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisResponsibilityMatrixFunctionRelations = relations(hrisResponsibilityMatrixFunction, ({ one, many }) => ({
	user: one(users, {
		fields: [hrisResponsibilityMatrixFunction.idUsers],
		references: [users.idUsers]
	}),
	hrisResponsibilityMatrixSubFunctions: many(hrisResponsibilityMatrixSubFunction),
}));

export const hrisResponsibilityMatrixInchargeRelations = relations(hrisResponsibilityMatrixIncharge, ({ one }) => ({
	user: one(users, {
		fields: [hrisResponsibilityMatrixIncharge.idUsers],
		references: [users.idUsers]
	}),
	hrisResponsibilityMatrixSubFunction: one(hrisResponsibilityMatrixSubFunction, {
		fields: [hrisResponsibilityMatrixIncharge.idHrisResponsibilityMatrixSubFunction],
		references: [hrisResponsibilityMatrixSubFunction.idHrisResponsibilityMatrixSubFunction]
	}),
}));

export const hrisResponsibilityMatrixSubFunctionRelations = relations(hrisResponsibilityMatrixSubFunction, ({ one, many }) => ({
	hrisResponsibilityMatrixIncharges: many(hrisResponsibilityMatrixIncharge),
	hrisResponsibilityMatrixFunction: one(hrisResponsibilityMatrixFunction, {
		fields: [hrisResponsibilityMatrixSubFunction.idHrisResponsibilityMatrixFunction],
		references: [hrisResponsibilityMatrixFunction.idHrisResponsibilityMatrixFunction]
	}),
	hrisResponsibilitySubFunctionDetails: many(hrisResponsibilitySubFunctionDetails),
}));

export const hrisResponsibilitySubFunctionDetailsRelations = relations(hrisResponsibilitySubFunctionDetails, ({ one }) => ({
	user: one(users, {
		fields: [hrisResponsibilitySubFunctionDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisResponsibilityMatrixSubFunction: one(hrisResponsibilityMatrixSubFunction, {
		fields: [hrisResponsibilitySubFunctionDetails.idHrisResponsibilitySubFunction],
		references: [hrisResponsibilityMatrixSubFunction.idHrisResponsibilityMatrixSubFunction]
	}),
}));

export const hrisSpecialNotesRelations = relations(hrisSpecialNotes, ({ one }) => ({
	hrisJobRequisition: one(hrisJobRequisitions, {
		fields: [hrisSpecialNotes.idJobRequisition],
		references: [hrisJobRequisitions.idJobRequisition]
	}),
}));

export const hrisTalentAcquisitionJoiningDetailsRelations = relations(hrisTalentAcquisitionJoiningDetails, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisTalentAcquisitionJoiningDetails.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisTalentAcquisitionJoiningDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisInterviewAppraisedCandidate: one(hrisInterviewAppraisedCandidates, {
		fields: [hrisTalentAcquisitionJoiningDetails.idAppointmentLetter],
		references: [hrisInterviewAppraisedCandidates.idInterviewAppraisedCandidate]
	}),
	hrisCandidateUser: one(hrisCandidateUsers, {
		fields: [hrisTalentAcquisitionJoiningDetails.candidateId],
		references: [hrisCandidateUsers.idCandidateUser]
	}),
	hrEmployee_concernSuperVisorId: one(hrEmployee, {
		fields: [hrisTalentAcquisitionJoiningDetails.concernSuperVisorId],
		references: [hrEmployee.employeeId],
		relationName: "hrisTalentAcquisitionJoiningDetails_concernSuperVisorId_hrEmployee_employeeId"
	}),
	hrEmployee_concernHrId: one(hrEmployee, {
		fields: [hrisTalentAcquisitionJoiningDetails.concernHrId],
		references: [hrEmployee.employeeId],
		relationName: "hrisTalentAcquisitionJoiningDetails_concernHrId_hrEmployee_employeeId"
	}),
	hrisTalentAcquisitionJoiningHandoverDocumentsDetails: many(hrisTalentAcquisitionJoiningHandoverDocumentsDetails),
	hrisTalentAcquisitionJoiningReceiveDocumentsDetails: many(hrisTalentAcquisitionJoiningReceiveDocumentsDetails),
}));

export const hrisTalentAcquisitionJoiningHandoverDocumentsDetailsRelations = relations(hrisTalentAcquisitionJoiningHandoverDocumentsDetails, ({ one }) => ({
	project: one(projects, {
		fields: [hrisTalentAcquisitionJoiningHandoverDocumentsDetails.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisTalentAcquisitionJoiningHandoverDocumentsDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisTalentAcquisitionJoiningDetail: one(hrisTalentAcquisitionJoiningDetails, {
		fields: [hrisTalentAcquisitionJoiningHandoverDocumentsDetails.idHrisTalentAcquisitionJoiningDetails],
		references: [hrisTalentAcquisitionJoiningDetails.idHrisTalentAcquisitionJoiningDetails]
	}),
	hrisDocumentMaster: one(hrisDocumentMaster, {
		fields: [hrisTalentAcquisitionJoiningHandoverDocumentsDetails.idHrisDocumentMaster],
		references: [hrisDocumentMaster.idHrisDocumentMaster]
	}),
}));

export const hrisTalentAcquisitionJoiningReceiveDocumentsDetailsRelations = relations(hrisTalentAcquisitionJoiningReceiveDocumentsDetails, ({ one }) => ({
	project: one(projects, {
		fields: [hrisTalentAcquisitionJoiningReceiveDocumentsDetails.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisTalentAcquisitionJoiningReceiveDocumentsDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisTalentAcquisitionJoiningDetail: one(hrisTalentAcquisitionJoiningDetails, {
		fields: [hrisTalentAcquisitionJoiningReceiveDocumentsDetails.idHrisTalentAcquisitionJoiningDetails],
		references: [hrisTalentAcquisitionJoiningDetails.idHrisTalentAcquisitionJoiningDetails]
	}),
	hrisDocumentMaster: one(hrisDocumentMaster, {
		fields: [hrisTalentAcquisitionJoiningReceiveDocumentsDetails.idHrisDocumentMaster],
		references: [hrisDocumentMaster.idHrisDocumentMaster]
	}),
}));

export const hrisTraitsMasterRelations = relations(hrisTraitsMaster, ({ one, many }) => ({
	project: one(projects, {
		fields: [hrisTraitsMaster.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisTraitsMaster.idUsers],
		references: [users.idUsers]
	}),
	hrisTraitsSetupDetails: many(hrisTraitsSetupDetails),
	porPerformanceAppraiseTraits: many(porPerformanceAppraiseTraits),
}));

export const hrisTraitsSetupDetailsRelations = relations(hrisTraitsSetupDetails, ({ one }) => ({
	project: one(projects, {
		fields: [hrisTraitsSetupDetails.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [hrisTraitsSetupDetails.idUsers],
		references: [users.idUsers]
	}),
	hrDesignationMaster: one(hrDesignationMaster, {
		fields: [hrisTraitsSetupDetails.idDesignation],
		references: [hrDesignationMaster.designationId]
	}),
	hrisTraitsMaster: one(hrisTraitsMaster, {
		fields: [hrisTraitsSetupDetails.idHrisTraitsMaster],
		references: [hrisTraitsMaster.idHrisTraitsMaster]
	}),
}));

export const hrisUtilityGenerationAttachmentsDetailsRelations = relations(hrisUtilityGenerationAttachmentsDetails, ({ one }) => ({
	hrisUtilityGenerationDetail: one(hrisUtilityGenerationDetails, {
		fields: [hrisUtilityGenerationAttachmentsDetails.idHrisUtilityGenerationDetails],
		references: [hrisUtilityGenerationDetails.idHrisUtilityGenerationDetails]
	}),
	user: one(users, {
		fields: [hrisUtilityGenerationAttachmentsDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisUtilityGenerationDetailsRelations = relations(hrisUtilityGenerationDetails, ({ one, many }) => ({
	hrisUtilityGenerationAttachmentsDetails: many(hrisUtilityGenerationAttachmentsDetails),
	hrisUtilityGenerationChargeDetails: many(hrisUtilityGenerationChargeDetails),
	hrisRentAgreementDetail: one(hrisRentAgreementDetails, {
		fields: [hrisUtilityGenerationDetails.idHrisRentAgreementDetails],
		references: [hrisRentAgreementDetails.idHrisRentAgreementDetails]
	}),
	hrEmployee_approvedBy: one(hrEmployee, {
		fields: [hrisUtilityGenerationDetails.approvedBy],
		references: [hrEmployee.employeeId],
		relationName: "hrisUtilityGenerationDetails_approvedBy_hrEmployee_employeeId"
	}),
	hrEmployee_apEmployeeId: one(hrEmployee, {
		fields: [hrisUtilityGenerationDetails.apEmployeeId],
		references: [hrEmployee.employeeId],
		relationName: "hrisUtilityGenerationDetails_apEmployeeId_hrEmployee_employeeId"
	}),
	hrEmployee_accountantEmployeeId: one(hrEmployee, {
		fields: [hrisUtilityGenerationDetails.accountantEmployeeId],
		references: [hrEmployee.employeeId],
		relationName: "hrisUtilityGenerationDetails_accountantEmployeeId_hrEmployee_employeeId"
	}),
	hrEmployee_submittedBy: one(hrEmployee, {
		fields: [hrisUtilityGenerationDetails.submittedBy],
		references: [hrEmployee.employeeId],
		relationName: "hrisUtilityGenerationDetails_submittedBy_hrEmployee_employeeId"
	}),
	hrEmployee_checkedBy: one(hrEmployee, {
		fields: [hrisUtilityGenerationDetails.checkedBy],
		references: [hrEmployee.employeeId],
		relationName: "hrisUtilityGenerationDetails_checkedBy_hrEmployee_employeeId"
	}),
	hrEmployee_certifiedBy: one(hrEmployee, {
		fields: [hrisUtilityGenerationDetails.certifiedBy],
		references: [hrEmployee.employeeId],
		relationName: "hrisUtilityGenerationDetails_certifiedBy_hrEmployee_employeeId"
	}),
	hrisUtilityGenerationPaymentDetails: many(hrisUtilityGenerationPaymentDetails),
}));

export const hrisUtilityGenerationChargeDetailsRelations = relations(hrisUtilityGenerationChargeDetails, ({ one }) => ({
	hrisUtilityGenerationDetail: one(hrisUtilityGenerationDetails, {
		fields: [hrisUtilityGenerationChargeDetails.idHrisUtilityGenerationDetails],
		references: [hrisUtilityGenerationDetails.idHrisUtilityGenerationDetails]
	}),
	hrisUtilityService: one(hrisUtilityService, {
		fields: [hrisUtilityGenerationChargeDetails.idHrisUtilityService],
		references: [hrisUtilityService.idHrisUtilityService]
	}),
	user: one(users, {
		fields: [hrisUtilityGenerationChargeDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisUtilityServiceRelations = relations(hrisUtilityService, ({ one, many }) => ({
	hrisUtilityGenerationChargeDetails: many(hrisUtilityGenerationChargeDetails),
	user: one(users, {
		fields: [hrisUtilityService.idUsers],
		references: [users.idUsers]
	}),
}));

export const hrisUtilityGenerationPaymentDetailsRelations = relations(hrisUtilityGenerationPaymentDetails, ({ one }) => ({
	user: one(users, {
		fields: [hrisUtilityGenerationPaymentDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisUtilityGenerationDetail: one(hrisUtilityGenerationDetails, {
		fields: [hrisUtilityGenerationPaymentDetails.idHrisUtilityGenerationDetails],
		references: [hrisUtilityGenerationDetails.idHrisUtilityGenerationDetails]
	}),
	accLedger: one(accLedgers, {
		fields: [hrisUtilityGenerationPaymentDetails.idLedgers],
		references: [accLedgers.idLedgers]
	}),
}));

export const hrisWorkStationDetailsRelations = relations(hrisWorkStationDetails, ({ one, many }) => ({
	hrWorkStation: one(hrWorkStation, {
		fields: [hrisWorkStationDetails.workStationId],
		references: [hrWorkStation.workStationId]
	}),
	user: one(users, {
		fields: [hrisWorkStationDetails.idUsers],
		references: [users.idUsers]
	}),
	hrisWorkStationFloorDetails: many(hrisWorkStationFloorDetails),
}));

export const hrisWorkStationFloorDetailsRelations = relations(hrisWorkStationFloorDetails, ({ one, many }) => ({
	hrisWorkStationFlatDetails: many(hrisWorkStationFlatDetails),
	hrisWorkStationDetail: one(hrisWorkStationDetails, {
		fields: [hrisWorkStationFloorDetails.idHrisWorkStationDetails],
		references: [hrisWorkStationDetails.idHrisWorkStationDetails]
	}),
	user: one(users, {
		fields: [hrisWorkStationFloorDetails.idUsers],
		references: [users.idUsers]
	}),
}));

export const porAttendanceRelations = relations(porAttendance, ({ one }) => ({
	hrEmployee_lineSupervisorId: one(hrEmployee, {
		fields: [porAttendance.lineSupervisorId],
		references: [hrEmployee.employeeId],
		relationName: "porAttendance_lineSupervisorId_hrEmployee_employeeId"
	}),
	hrEmployee_hrId: one(hrEmployee, {
		fields: [porAttendance.hrId],
		references: [hrEmployee.employeeId],
		relationName: "porAttendance_hrId_hrEmployee_employeeId"
	}),
}));

export const porCertificateMasterRelations = relations(porCertificateMaster, ({ one, many }) => ({
	project: one(projects, {
		fields: [porCertificateMaster.idProject],
		references: [projects.idProjects]
	}),
	user: one(users, {
		fields: [porCertificateMaster.idUsers],
		references: [users.idUsers]
	}),
	porCertificateRequests: many(porCertificateRequest),
}));

export const porCertificateRequestRelations = relations(porCertificateRequest, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porCertificateRequest.requestedBy],
		references: [hrEmployee.employeeId]
	}),
	porCertificateMaster: one(porCertificateMaster, {
		fields: [porCertificateRequest.idPorCertificateMaster],
		references: [porCertificateMaster.idPorCertificateMaster]
	}),
}));

export const porCompensatoryLeavesRelations = relations(porCompensatoryLeaves, ({ one }) => ({
	hrEmployee_lineSupervisorId: one(hrEmployee, {
		fields: [porCompensatoryLeaves.lineSupervisorId],
		references: [hrEmployee.employeeId],
		relationName: "porCompensatoryLeaves_lineSupervisorId_hrEmployee_employeeId"
	}),
	hrEmployee_reportingSupervisorId: one(hrEmployee, {
		fields: [porCompensatoryLeaves.reportingSupervisorId],
		references: [hrEmployee.employeeId],
		relationName: "porCompensatoryLeaves_reportingSupervisorId_hrEmployee_employeeId"
	}),
	hrEmployee_buHrId: one(hrEmployee, {
		fields: [porCompensatoryLeaves.buHrId],
		references: [hrEmployee.employeeId],
		relationName: "porCompensatoryLeaves_buHrId_hrEmployee_employeeId"
	}),
}));

export const porEmployeeRelations = relations(porEmployee, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porEmployee.employeeId],
		references: [hrEmployee.employeeId]
	}),
}));

export const porEmployeeAppraisalDetailsRelations = relations(porEmployeeAppraisalDetails, ({ one, many }) => ({
	project: one(projects, {
		fields: [porEmployeeAppraisalDetails.idProject],
		references: [projects.idProjects]
	}),
	hrEmployee_employeeId: one(hrEmployee, {
		fields: [porEmployeeAppraisalDetails.employeeId],
		references: [hrEmployee.employeeId],
		relationName: "porEmployeeAppraisalDetails_employeeId_hrEmployee_employeeId"
	}),
	hrEmployee_appraisalHeadPmPdCeoId: one(hrEmployee, {
		fields: [porEmployeeAppraisalDetails.appraisalHeadPmPdCeoId],
		references: [hrEmployee.employeeId],
		relationName: "porEmployeeAppraisalDetails_appraisalHeadPmPdCeoId_hrEmployee_employeeId"
	}),
	hrisPerformanceAppraisalSetup: one(hrisPerformanceAppraisalSetup, {
		fields: [porEmployeeAppraisalDetails.idPerformanceAppraisalSetup],
		references: [hrisPerformanceAppraisalSetup.idPerformanceAppraisalSetup]
	}),
	porEmployeeAppraisalTargetDetails: many(porEmployeeAppraisalTargetDetails),
}));

export const porEmployeeAppraisalTargetDetailsRelations = relations(porEmployeeAppraisalTargetDetails, ({ one }) => ({
	project: one(projects, {
		fields: [porEmployeeAppraisalTargetDetails.idProject],
		references: [projects.idProjects]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [porEmployeeAppraisalTargetDetails.idUsers],
		references: [hrEmployee.employeeId]
	}),
	porEmployeeAppraisalDetail: one(porEmployeeAppraisalDetails, {
		fields: [porEmployeeAppraisalTargetDetails.idPorEmployeeAppraisalDetails],
		references: [porEmployeeAppraisalDetails.idPorEmployeeAppraisalDetails]
	}),
}));

export const porEmployeeCarAitRelations = relations(porEmployeeCarAit, ({ one }) => ({
	hrEmployee_employeeId: one(hrEmployee, {
		fields: [porEmployeeCarAit.employeeId],
		references: [hrEmployee.employeeId],
		relationName: "porEmployeeCarAit_employeeId_hrEmployee_employeeId"
	}),
	hrEmployee_approverId: one(hrEmployee, {
		fields: [porEmployeeCarAit.approverId],
		references: [hrEmployee.employeeId],
		relationName: "porEmployeeCarAit_approverId_hrEmployee_employeeId"
	}),
	accFiscalYear: one(accFiscalYear, {
		fields: [porEmployeeCarAit.idFiscalYear],
		references: [accFiscalYear.idFiscalYear]
	}),
}));

export const porEmployeeHrRelations = relations(porEmployeeHr, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porEmployeeHr.employeeId],
		references: [hrEmployee.employeeId]
	}),
	porEmployeeHrDetails: many(porEmployeeHrDetails),
}));

export const porEmployeeHrDetailsRelations = relations(porEmployeeHrDetails, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porEmployeeHrDetails.hrId],
		references: [hrEmployee.employeeId]
	}),
	porEmployeeHr: one(porEmployeeHr, {
		fields: [porEmployeeHrDetails.idEmployeeHr],
		references: [porEmployeeHr.idEmployeeHr]
	}),
	user_deletedBy: one(users, {
		fields: [porEmployeeHrDetails.deletedBy],
		references: [users.idUsers],
		relationName: "porEmployeeHrDetails_deletedBy_users_idUsers"
	}),
	user_idUsers: one(users, {
		fields: [porEmployeeHrDetails.idUsers],
		references: [users.idUsers],
		relationName: "porEmployeeHrDetails_idUsers_users_idUsers"
	}),
}));

export const porEmployeeReviewRelations = relations(porEmployeeReview, ({ one }) => ({
	hrEmployee_employeeId: one(hrEmployee, {
		fields: [porEmployeeReview.employeeId],
		references: [hrEmployee.employeeId],
		relationName: "porEmployeeReview_employeeId_hrEmployee_employeeId"
	}),
	hrEmployee_reviewSubmittedBy: one(hrEmployee, {
		fields: [porEmployeeReview.reviewSubmittedBy],
		references: [hrEmployee.employeeId],
		relationName: "porEmployeeReview_reviewSubmittedBy_hrEmployee_employeeId"
	}),
}));

export const porEmployeeSupervisorRelations = relations(porEmployeeSupervisor, ({ one }) => ({
	hrEmployee_employeeId: one(hrEmployee, {
		fields: [porEmployeeSupervisor.employeeId],
		references: [hrEmployee.employeeId],
		relationName: "porEmployeeSupervisor_employeeId_hrEmployee_employeeId"
	}),
	hrEmployee_supervisorId: one(hrEmployee, {
		fields: [porEmployeeSupervisor.supervisorId],
		references: [hrEmployee.employeeId],
		relationName: "porEmployeeSupervisor_supervisorId_hrEmployee_employeeId"
	}),
}));

export const porEmployeeTinInfoRelations = relations(porEmployeeTinInfo, ({ one }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porEmployeeTinInfo.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrTaxAreaType: one(hrTaxAreaType, {
		fields: [porEmployeeTinInfo.idHrTaxAreaType],
		references: [hrTaxAreaType.idHrTaxAreaType]
	}),
}));

export const porJobDescriptionAdditionalPerformingAreasHistoryRelations = relations(porJobDescriptionAdditionalPerformingAreasHistory, ({ one }) => ({
	porJobDescriptionAdditionalPerformingArea: one(porJobDescriptionAdditionalPerformingAreas, {
		fields: [porJobDescriptionAdditionalPerformingAreasHistory.idJobDescriptionAdditionalPerformingArea],
		references: [porJobDescriptionAdditionalPerformingAreas.idJobDescriptionAdditionalPerformingArea]
	}),
}));

export const porJobDescriptionAdditionalQualificationsRelations = relations(porJobDescriptionAdditionalQualifications, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porJobDescriptionAdditionalQualifications.employeeId],
		references: [hrEmployee.employeeId]
	}),
	porJobDescriptionAdditionalQualificationsHistories: many(porJobDescriptionAdditionalQualificationsHistory),
}));

export const porJobDescriptionAdditionalQualificationsHistoryRelations = relations(porJobDescriptionAdditionalQualificationsHistory, ({ one }) => ({
	porJobDescriptionAdditionalQualification: one(porJobDescriptionAdditionalQualifications, {
		fields: [porJobDescriptionAdditionalQualificationsHistory.idJobDescriptionAdditionalQualification],
		references: [porJobDescriptionAdditionalQualifications.idJobDescriptionAdditionalQualification]
	}),
}));

export const porJobDescriptionAdditionalQualityParametersRelations = relations(porJobDescriptionAdditionalQualityParameters, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porJobDescriptionAdditionalQualityParameters.employeeId],
		references: [hrEmployee.employeeId]
	}),
	porJobDescriptionAdditionalQualityParametersHistories: many(porJobDescriptionAdditionalQualityParametersHistory),
}));

export const porJobDescriptionAdditionalQualityParametersHistoryRelations = relations(porJobDescriptionAdditionalQualityParametersHistory, ({ one }) => ({
	porJobDescriptionAdditionalQualityParameter: one(porJobDescriptionAdditionalQualityParameters, {
		fields: [porJobDescriptionAdditionalQualityParametersHistory.idJobDescriptionAdditionalQualityParameter],
		references: [porJobDescriptionAdditionalQualityParameters.idJobDescriptionAdditionalQualityParameter]
	}),
}));

export const porJobDescriptionAdditionalSoftSkillsRelations = relations(porJobDescriptionAdditionalSoftSkills, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porJobDescriptionAdditionalSoftSkills.employeeId],
		references: [hrEmployee.employeeId]
	}),
	porJobDescriptionAdditionalSoftSkillsHistories: many(porJobDescriptionAdditionalSoftSkillsHistory),
}));

export const porJobDescriptionAdditionalSoftSkillsHistoryRelations = relations(porJobDescriptionAdditionalSoftSkillsHistory, ({ one }) => ({
	porJobDescriptionAdditionalSoftSkill: one(porJobDescriptionAdditionalSoftSkills, {
		fields: [porJobDescriptionAdditionalSoftSkillsHistory.idJobDescriptionAdditionalSoftSkill],
		references: [porJobDescriptionAdditionalSoftSkills.idJobDescriptionAdditionalSoftSkill]
	}),
}));

export const porJobDescriptionAdditionalSpecialRequirementsRelations = relations(porJobDescriptionAdditionalSpecialRequirements, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porJobDescriptionAdditionalSpecialRequirements.employeeId],
		references: [hrEmployee.employeeId]
	}),
	porJobDescriptionAdditionalSpecialRequirementsHistories: many(porJobDescriptionAdditionalSpecialRequirementsHistory),
}));

export const porJobDescriptionAdditionalSpecialRequirementsHistoryRelations = relations(porJobDescriptionAdditionalSpecialRequirementsHistory, ({ one }) => ({
	porJobDescriptionAdditionalSpecialRequirement: one(porJobDescriptionAdditionalSpecialRequirements, {
		fields: [porJobDescriptionAdditionalSpecialRequirementsHistory.idJobDescriptionAdditionalSpecialRequirement],
		references: [porJobDescriptionAdditionalSpecialRequirements.idJobDescriptionAdditionalSpecialRequirement]
	}),
}));

export const porJobDescriptionAdditionalTechSkillsRelations = relations(porJobDescriptionAdditionalTechSkills, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porJobDescriptionAdditionalTechSkills.employeeId],
		references: [hrEmployee.employeeId]
	}),
	porJobDescriptionAdditionalTechSkillsHistories: many(porJobDescriptionAdditionalTechSkillsHistory),
}));

export const porJobDescriptionAdditionalTechSkillsHistoryRelations = relations(porJobDescriptionAdditionalTechSkillsHistory, ({ one }) => ({
	porJobDescriptionAdditionalTechSkill: one(porJobDescriptionAdditionalTechSkills, {
		fields: [porJobDescriptionAdditionalTechSkillsHistory.idJobDescriptionAdditionalTechSkill],
		references: [porJobDescriptionAdditionalTechSkills.idJobDescriptionAdditionalTechSkill]
	}),
}));

export const porJobRequisitionsRelations = relations(porJobRequisitions, ({ one }) => ({
	project: one(projects, {
		fields: [porJobRequisitions.idBusinessUnit],
		references: [projects.idProjects]
	}),
	hrEmployee: one(hrEmployee, {
		fields: [porJobRequisitions.submittedBy],
		references: [hrEmployee.employeeId]
	}),
}));

export const porLeaveDetailsRelations = relations(porLeaveDetails, ({ one }) => ({
	porLeave: one(porLeave, {
		fields: [porLeaveDetails.idPorLeave],
		references: [porLeave.idPorLeave]
	}),
}));

export const porPerformanceAppraiseRelations = relations(porPerformanceAppraise, ({ one, many }) => ({
	hrEmployee: one(hrEmployee, {
		fields: [porPerformanceAppraise.employeeId],
		references: [hrEmployee.employeeId]
	}),
	hrisPerformanceAppraisalSetup: one(hrisPerformanceAppraisalSetup, {
		fields: [porPerformanceAppraise.idPerformanceAppraisalSetup],
		references: [hrisPerformanceAppraisalSetup.idPerformanceAppraisalSetup]
	}),
	hrisPmsScoreMaster: one(hrisPmsScoreMaster, {
		fields: [porPerformanceAppraise.idHrisPmsScoreMaster],
		references: [hrisPmsScoreMaster.idHrisPmsScoreMaster]
	}),
	porPerformanceAppraiseAchievements: many(porPerformanceAppraiseAchievements),
	porPerformanceAppraiseDetails: many(porPerformanceAppraiseDetails),
	porPerformanceAppraiseTraits: many(porPerformanceAppraiseTraits),
}));

export const porPerformanceAppraiseAchievementsRelations = relations(porPerformanceAppraiseAchievements, ({ one }) => ({
	porPerformanceAppraise: one(porPerformanceAppraise, {
		fields: [porPerformanceAppraiseAchievements.idPerformanceAppraise],
		references: [porPerformanceAppraise.idPerformanceAppraise]
	}),
}));

export const filesRelations = relations(files, ({ one }) => ({
	user: one(users, {
		fields: [files.idUsers],
		references: [users.idUsers]
	}),
}));

export const personalInfoRelations = relations(personalInfo, ({ one }) => ({
	user: one(users, {
		fields: [personalInfo.idUsers],
		references: [users.idUsers]
	}),
}));