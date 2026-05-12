import { sql } from "drizzle-orm";
import { bigint, char, date, datetime, decimal, double, float, index, int, longtext, mediumtext, mysqlEnum, mysqlTable, primaryKey, text, time, timestamp, tinyint, unique, varchar } from "drizzle-orm/mysql-core";

export const accFiscalYear = mysqlTable("acc_fiscal_year", {
	idFiscalYear: int("id_fiscal_year").autoincrement().notNull(),
	fiscalTitle: varchar("fiscal_title", { length: 40 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	actualStartDate: date("actual_start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	actualEndDate: date("actual_end_date", { mode: 'string' }),
	details: varchar({ length: 200 }),
	activeStatus: tinyint("active_status").default(1).notNull(),
	isCurrentYear: mysqlEnum("is_current_year", ['0', '1']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("idx_active_status").on(table.activeStatus),
		primaryKey({ columns: [table.idFiscalYear], name: "acc_fiscal_year_id_fiscal_year" }),
	]);

export const accLedgers = mysqlTable("acc_ledgers", {
	idLedgers: int("id_ledgers").autoincrement().notNull(),
	parentId: int("parent_id"),
	ledgerCode: varchar("ledger_code", { length: 50 }),
	ledgerName: varchar("ledger_name", { length: 250 }).notNull(),
	ledgerType: mysqlEnum("ledger_type", ['group', 'gl', 'cl', 'sl']).notNull(),
	bankCashType: mysqlEnum("bank_cash_type", ['bank', 'cash', 'general']).default('general').notNull(),
	isReconciliation: tinyint("is_reconciliation").default(0),
	category: mysqlEnum(['a', 'e', 'l', 'r']).notNull(),
	ledgerLevel: tinyint("ledger_level"),
	referenceType: mysqlEnum("reference_type", ['bank', 'cash', 'vendor', 'customer', 'employee', 'business_unit', 'lc', 'short_term_loan', 'long_term_loan', 'fdr', 'bank_guarantee']),
	idReference: int("id_reference"),
	activeStatus: tinyint("active_status").default(1).notNull(),
	ledgerPath: text("ledger_path"),
	isSystem: mysqlEnum("is_system", ['yes', 'no']).default('no'),
	isGrossNet: mysqlEnum("is_gross_net", ['gross', 'net']).default('gross'),
	serialNo: int("serial_no"),
	expenseType: varchar("expense_type", { length: 200 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("bank_cash_type").on(table.bankCashType),
		index("expense_type").on(table.expenseType),
		index("idx_active_status").on(table.activeStatus),
		index("idx_category").on(table.category),
		index("idx_id_reference").on(table.idReference),
		index("idx_ledger_level").on(table.ledgerLevel),
		index("idx_ledger_name").on(table.ledgerName),
		index("idx_ledger_type").on(table.ledgerType),
		index("idx_parent_id").on(table.parentId),
		index("idx_reference_type").on(table.referenceType),
		primaryKey({ columns: [table.idLedgers], name: "acc_ledgers_id_ledgers" }),
	]);

export const accVoucher = mysqlTable("acc_voucher", {
	idVoucher: int("id_voucher").autoincrement().notNull(),
	voucherNo: varchar("voucher_no", { length: 100 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	voucherDate: date("voucher_date", { mode: 'string' }).notNull(),
	voucherType: mysqlEnum("voucher_type", ['cr', 'br', 'cp', 'bp', 'con', 'jv']).notNull(),
	narration: text(),
	modeOfTransaction: varchar("mode_of_transaction", { length: 30 }),
	idBank: int("id_bank"),
	chequeNo: varchar("cheque_no", { length: 50 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	transactionDate: date("transaction_date", { mode: 'string' }),
	idApplication: int("id_application"),
	idCompany: int("id_company").notNull().references(() => companies.idCompanies),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	voucherStatus: mysqlEnum("voucher_status", ['created', 'approved', 'modified', 'deleted']).notNull(),
	idBillInvoice: varchar("id_bill_invoice", { length: 50 }),
	billInvoiceType: varchar("bill_invoice_type", { length: 50 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().notNull(),
	idRef: varchar("id_ref", { length: 50 }),
	idBuVoucher: int("id_bu_voucher"),
},
	(table) => [
		index("bill_invoice_type").on(table.billInvoiceType),
		index("id_bill_invoice").on(table.idBillInvoice),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_company").on(table.idCompany),
		index("id_ref").on(table.idRef),
		index("voucher_no").on(table.voucherNo),
		primaryKey({ columns: [table.idVoucher], name: "acc_voucher_id_voucher" }),
	]);

export const companies = mysqlTable("companies", {
	idCompanies: int("id_companies").autoincrement().notNull(),
	companyName: varchar("company_name", { length: 45 }).notNull(),
	shortName: varchar("short_name", { length: 45 }),
	companyId: varchar("company_id", { length: 45 }).notNull(),
	remarks: text(),
	companyAddress: text("company_address"),
	idCity: int("id_city"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	establishDate: date("establish_date", { mode: 'string' }),
	companyAcNumber: varchar("company_ac_number", { length: 45 }),
	tradeLicense: varchar("trade_license", { length: 45 }),
	taxDeductionAc: varchar("tax_deduction_ac", { length: 45 }),
	pfRegNumber: int("pf_reg_number"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	pfRegDate: date("pf_reg_date", { mode: 'string' }),
	gratuityRegNum: int("gratuity_reg_num"),
	retirementAge: int("retirement_age"),
	contactPersonName: varchar("contact_person_name", { length: 100 }),
	contactPersonDesignation: varchar("contact_person_designation", { length: 100 }),
	website: varchar({ length: 80 }),
	companyEmail: varchar("company_email", { length: 80 }),
	telephoneNum: varchar("telephone_num", { length: 45 }),
	faxNumber: varchar("fax_number", { length: 45 }),
	businessType: varchar("business_type", { length: 45 }),
	businessGroup: varchar("business_group", { length: 45 }),
	companyCategory: varchar("company_category", { length: 45 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: datetime("update_date", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	tinNo: varchar("tin_no", { length: 50 }),
	binNo: varchar("bin_no", { length: 50 }),
},
	(table) => [
		primaryKey({ columns: [table.idCompanies], name: "companies_id_companies" }),
	]);

export const costCenter = mysqlTable("cost_center", {
	idCostCenter: int("id_cost_center").autoincrement().notNull(),
	name: varchar({ length: 150 }).notNull(),
	idProjects: int("id_projects").references(() => projects.idProjects),
	budgetType: mysqlEnum("budget_type", ['recurring', 'fixed', 'special']).default('fixed').notNull(),
	amount: double().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	costCenterId: varchar("cost_center_id", { length: 45 }).notNull(),
	location: text(),
	parentCostCenter: int("parent_cost_center"),
	costCenterType: varchar("cost_center_type", { length: 100 }),
	milestoneNo: varchar("milestone_no", { length: 50 }).default('Cost Center'),
	lockLevel: int("lock_level").default(100),
	selectable: mysqlEnum(['yes', 'no']).default('yes').notNull(),
	boqSectionId: varchar("boq_section_id", { length: 128 }),
	boqItemId: varchar("boq_item_id", { length: 128 }),
	status: mysqlEnum(['Completed', 'Work in progress', 'Invoice submitted', 'Yet to Start']),
	sharedPoolMilestoneBudget: double("shared_pool_milestone_budget"),
	sharedPoolMilestoneBudgetType: mysqlEnum("shared_pool_milestone_budget_type", ['Percentage', 'Amount']),
},
	(table) => [
		index("fk_cost_center_projects1_idx").on(table.idProjects),
		primaryKey({ columns: [table.idCostCenter], name: "cost_center_id_cost_center" }),
	]);

export const hrAbsentEntry = mysqlTable("hr_absent_entry", {
	idHrAbsentEntry: int("id_hr_absent_entry").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	idHrAbsentEntryFileUpload: int("id_hr_absent_entry_file_upload").notNull().references(() => hrAbsentEntryFileUpload.idHrAbsentEntryFileUpload),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hr_absent_entry_file_upload").on(table.idHrAbsentEntryFileUpload),
		primaryKey({ columns: [table.idHrAbsentEntry], name: "hr_absent_entry_id_hr_absent_entry" }),
	]);

export const hrAbsentEntryFileUpload = mysqlTable("hr_absent_entry_file_upload", {
	idHrAbsentEntryFileUpload: int("id_hr_absent_entry_file_upload").autoincrement().notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }).notNull(),
	idBusinessUnit: int("id_business_unit").notNull(),
	year: int().notNull(),
	month: int().notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	deletedBy: int("deleted_by"),
	reason: varchar({ length: 100 }),
	invalidEntry: int("invalid_entry").default(0),
	invalidEntries: text("invalid_entries"),
	notFound: int("not_found").default(0),
	duplicateEntry: int("duplicate_entry").default(0),
	notFounds: text("not_founds"),
	duplicateEntries: text("duplicate_entries"),
	totalEntry: int("total_entry").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrAbsentEntryFileUpload], name: "hr_absent_entry_file_upload_id_hr_absent_entry_file_upload" }),
	]);

export const hrAbsentSetup = mysqlTable("hr_absent_setup", {
	hrAbsentSetupId: int("hr_absent_setup_id").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	hrAbsentTemplateId: int("hr_absent_template_id").notNull().references(() => hrAbsentTemplate.hrAbsentTemplateId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	changesBy: int("changes_by").references(() => users.idUsers),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("hr_absent_template_id").on(table.hrAbsentTemplateId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.hrAbsentSetupId], name: "hr_absent_setup_hr_absent_setup_id" }),
	]);

export const hrAbsentTemplate = mysqlTable("hr_absent_template", {
	hrAbsentTemplateId: int("hr_absent_template_id").autoincrement().notNull(),
	templateName: varchar("template_name", { length: 150 }).notNull(),
	calculationType: mysqlEnum("calculation_type", ['Basic', 'Gross']).notNull(),
	numberOfDays: varchar("number_of_days", { length: 80 }).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.hrAbsentTemplateId], name: "hr_absent_template_hr_absent_template_id" }),
	]);

export const hrAccountingSetup = mysqlTable("hr_accounting_setup", {
	idAccountingSetup: int("id_accounting_setup").autoincrement().notNull(),
	idHead: int("id_head"),
	idLedger: int("id_ledger").references(() => accLedgers.idLedgers),
	type: mysqlEnum(['Earning', 'Deduction']),
	idUser: int("id_user").references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_ledger").on(table.idLedger),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idAccountingSetup], name: "hr_accounting_setup_id_accounting_setup" }),
	]);

export const hrAdvance = mysqlTable("hr_advance", {
	idAdvance: int("id_advance").autoincrement().notNull(),
	idAdvanceTemplate: int("id_advance_template").notNull().references(() => hrAdvancePaymentTemplate.idAdvancePaymentTemplate),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	idCurSalBusUnit: int("id_cur_sal_bus_unit").references(() => projects.idProjects),
	amount: decimal({ precision: 13, scale: 2 }).notNull(),
	noOfInstallment: int("no_of_installment").notNull(),
	monthlyDeductionAmnt: decimal("monthly_deduction_amnt", { precision: 13, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }).notNull(),
	reasonForAdvance: text("reason_for_advance"),
	remark: text(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idVoucher: int("id_voucher").references(() => accVoucher.idVoucher),
	paid: decimal({ precision: 13, scale: 2 }).default('0.00'),
	due: decimal({ precision: 13, scale: 2 }).default('0.00'),
	idCurBusinessUnit: int("id_cur_business_unit").references(() => projects.idProjects),
	budgetConnection: mysqlEnum("budget_connection", ['yes', 'no']).default('no').notNull(),
	idPorAdvance: int("id_por_advance").references(() => porAdvance.idPorAdvance),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	accountPaid: decimal("account_paid", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	remainingInstallment: int("remaining_installment").notNull(),
	fileName: varchar("file_name", { length: 100 }),
	originalName: varchar("original_name", { length: 100 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	advancedDate: date("advanced_date", { mode: 'string' }).notNull(),
},
	(table) => [
		index("id_advance_template").on(table.idAdvanceTemplate),
		index("id_cur_business_unit").on(table.idCurBusinessUnit),
		index("id_cur_sal_bus_unit").on(table.idCurSalBusUnit),
		index("id_employee").on(table.idEmployee),
		index("id_por_advance").on(table.idPorAdvance),
		index("id_voucher").on(table.idVoucher),
		primaryKey({ columns: [table.idAdvance], name: "hr_advance_id_advance" }),
	]);

export const hrAdvanceHolds = mysqlTable("hr_advance_holds", {
	idAdvanceHold: int("id_advance_hold").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idAdvanceHold], name: "hr_advance_holds_id_advance_hold" }),
	]);

export const hrAdvancePaymentHistory = mysqlTable("hr_advance_payment_history", {
	idAdvPayHist: int("id_adv_pay_hist").autoincrement().notNull(),
	idAdvance: int("id_advance").notNull().references(() => hrAdvance.idAdvance),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	paymentType: mysqlEnum("payment_type", ['Early settlement', 'Monthly deduction']).default('Monthly deduction').notNull(),
	payingAmount: decimal("paying_amount", { precision: 13, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	payingDate: date("paying_date", { mode: 'string' }),
	installmentNo: int("installment_no").notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idCurSalBusUnit: int("id_cur_sal_bus_unit").notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	remark: text(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deductionMonthYear: varchar("deduction_month_year", { length: 20 }),
},
	(table) => [
		index("id_advance").on(table.idAdvance),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_employee").on(table.idEmployee),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idAdvPayHist], name: "hr_advance_payment_history_id_adv_pay_hist" }),
	]);

export const hrAdvancePaymentTemplate = mysqlTable("hr_advance_payment_template", {
	idAdvancePaymentTemplate: int("id_advance_payment_template").autoincrement().notNull(),
	advanceTemplateName: varchar("advance_template_name", { length: 50 }).notNull(),
	idGrade: int("id_grade"),
	maxAdvanceAmnt: decimal("max_advance_amnt", { precision: 14, scale: 2 }).notNull(),
	remark: text(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idAdvancePaymentTemplate], name: "hr_advance_payment_template_id_advance_payment_template" }),
	]);

export const hrAttendance = mysqlTable("hr_attendance", {
	idAttendance: int("id_attendance").autoincrement().notNull(),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	employeeCustomId: int("employee_custom_id").notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idHrAttendanceFileImport: int("id_hr_attendance_file_import"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	inTime: varchar("in_time", { length: 50 }).notNull(),
	outTime: varchar("out_time", { length: 50 }),
	expendedTime: bigint("expended_time", { mode: "number" }),
	type: mysqlEnum(['Present', 'Late Present', 'Late Present - Early Out', 'Early Out', 'Partial Info', 'Outstation', 'Site Visit', 'Work From Home', 'Official Visit']).default('Partial Info').notNull(),
	lateEntry: varchar("late_entry", { length: 10 }),
	earlyLeave: varchar("early_leave", { length: 10 }),
	remark: text(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idUserOperator: int("id_user_operator").references(() => users.idUsers),
	isRequestedFromPortal: tinyint("is_requested_from_portal").default(0).notNull(),
	idPorOutstation: int("id_por_outstation"),
	isCplApplied: mysqlEnum("is_cpl_applied", ['yes', 'no']).default('no').notNull(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_employee").on(table.idEmployee),
		index("id_user_operator").on(table.idUserOperator),
		primaryKey({ columns: [table.idAttendance], name: "hr_attendance_id_attendance" }),
	]);

export const hrAttendanceCalculationInfo = mysqlTable("hr_attendance_calculation_info", {
	idHrAttendanceCalculationInfo: int("id_hr_attendance_calculation_info").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	year: int().notNull(),
	month: int().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idCalendarSetup: int("id_calendar_setup").notNull().references(() => hrCalendarSetup.idCalendarSetup),
	dateRange: mysqlEnum("date_range", ['default', 'custom']).default('default').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }).notNull(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_calendar_setup").on(table.idCalendarSetup),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrAttendanceCalculationInfo], name: "hr_attendance_calculation_info_id_hr_attendance_calculation_info" }),
	]);

export const hrAttendanceCalendarFileImport = mysqlTable("hr_attendance_calendar_file_import", {
	idAttendanceCalendarFileImport: int("id_attendance_calendar_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	fileName: varchar("file_name", { length: 256 }).notNull(),
	totalEntry: int("total_entry").default(0).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }),
	invalidEntry: int("invalid_entry").default(0).notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	duplicateEntry: int("duplicate_entry").default(0).notNull(),
	month: int().notNull(),
	year: int().notNull(),
	newEntry: int("new_entry").default(0).notNull(),
	duplicateIds: text("duplicate_ids"),
	invalidIds: text("invalid_ids"),
	notFound: int("not_found").default(0).notNull(),
	notFoundIds: text("not_found_ids"),
	deleteBy: int("delete_by"),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_project").on(table.idProject),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idAttendanceCalendarFileImport], name: "hr_attendance_calendar_file_import_id_attendance_calendar_file_import" }),
	]);

export const hrAttendanceDeleteHistory = mysqlTable("hr_attendance_delete_history", {
	idHrAttendanceDeleteHistory: int("id_hr_attendance_delete_history").autoincrement().notNull(),
	idAttendance: int("id_attendance").notNull(),
	employeeId: int("employee_id").notNull(),
	attendanceData: text("attendance_data").notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	deleteReason: varchar("delete_reason", { length: 100 }).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrAttendanceDeleteHistory], name: "hr_attendance_delete_history_id_hr_attendance_delete_history" }),
	]);

export const hrAttendanceEntry = mysqlTable("hr_attendance_entry", {
	idAttendanceEntry: int("id_attendance_entry").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idDepartment: int("id_department").default(0).notNull(),
	month: int().notNull(),
	year: int().notNull(),
	entryType: mysqlEnum("entry_type", ['file_entry', 'calender_entry']).default('file_entry').notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	totalEntry: int("total_entry").notNull(),
	dateRange: mysqlEnum("date_range", ['default', 'custom']).default('default').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }).notNull(),
},
	(table) => [
		index("id_project").on(table.idProject),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idAttendanceEntry], name: "hr_attendance_entry_id_attendance_entry" }),
	]);

export const hrAttendanceEntryError = mysqlTable("hr_attendance_entry_error", {
	idHrAttendanceEntryError: int("id_hr_attendance_entry_error").autoincrement().notNull(),
	idHrAttendanceFileImport: int("id_hr_attendance_file_import").references(() => hrAttendanceFileImport.idHrAttendanceFileImport),
	employeeCustomId: int("employee_custom_id"),
	errorStatus: varchar("error_status", { length: 30 }),
	idUser: int("id_user").references(() => users.idUsers),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
	(table) => [
		index("id_hr_attendance_file_import").on(table.idHrAttendanceFileImport),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrAttendanceEntryError], name: "hr_attendance_entry_error_id_hr_attendance_entry_error" }),
	]);

export const hrAttendanceFileImport = mysqlTable("hr_attendance_file_import", {
	idHrAttendanceFileImport: int("id_hr_attendance_file_import").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: text("original_name"),
	insertData: int("insert_data").default(0).notNull(),
	updateData: int("update_data").default(0).notNull(),
	notFoundData: int("not_found_data").default(0).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrAttendanceFileImport], name: "hr_attendance_file_import_id_hr_attendance_file_import" }),
	]);

export const hrAttendanceFileImportErrors = mysqlTable("hr_attendance_file_import_errors", {
	hrAttendanceFileImportErrorsId: int("hr_attendance_file_import_errors_id").notNull(),
	hrAttendanceFileImportId: int("hr_attendance_file_import_id").notNull().references(() => hrAttendanceFileImport.idHrAttendanceFileImport),
	employeeCustomId: int("employee_custom_id").notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	errorMessage: varchar("error_message", { length: 256 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated']).default('activated'),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`),
	dateUpdated: datetime("date_updated", { mode: 'string' }),
},
	(table) => [
		index("hr_attendance_file_import_id").on(table.hrAttendanceFileImportId),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.hrAttendanceFileImportErrorsId], name: "hr_attendance_file_import_errors_hr_attendance_file_import_errors_id" }),
	]);

export const hrAttendanceMonthly = mysqlTable("hr_attendance_monthly", {
	idAttMonthly: int("id_att_monthly").autoincrement().notNull(),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idDepartment: int("id_department").default(0).notNull(),
	month: int().notNull(),
	monthYear: char("month_year", { length: 200 }).notNull(),
	year: int().notNull(),
	attData: text("att_data").notNull(),
	totPresent: int("tot_present").notNull(),
	totWithPayLeave: float("tot_with_pay_leave").notNull(),
	totWithoutPayLeave: float("tot_without_pay_leave").notNull(),
	totWeekend: int("tot_weekend").notNull(),
	totHoliday: int("tot_holiday").notNull(),
	totLatePresent: int("tot_late_present").notNull(),
	totPresentOffday: int("tot_present_offday").default(0).notNull(),
	totAbsent: int("tot_absent").notNull(),
	totEarlyOut: int("tot_early_out").notNull(),
	totCompensatoryLeave: int("tot_compensatory_leave").default(0).notNull(),
	totExpendedTime: time("tot_expended_time").notNull(),
	entryType: mysqlEnum("entry_type", ['dept_entry', 'single_entry', 'excel_entry', 'machine_entry']).default('dept_entry').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	amountForLatePresent: decimal("amount_for_late_present", { precision: 12, scale: 2 }).default('0.00').notNull(),
	amountForLeaveWithoutPay: decimal("amount_for_leave_without_pay", { precision: 12, scale: 2 }).default('0.00').notNull(),
	amountForAbsent: decimal("amount_for_absent", { precision: 12, scale: 2 }).default('0.00').notNull(),
	amountForPresentOffday: decimal("amount_for_present_offday", { precision: 12, scale: 2 }).default('0.00').notNull(),
	status: mysqlEnum(['editable', 'not_editable']).default('not_editable').notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idAttendanceCalendarFileImport: int("id_attendance_calendar_file_import"),
},
	(table) => [
		index("id_employee").on(table.idEmployee),
		index("id_project").on(table.idProject),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idAttMonthly], name: "hr_attendance_monthly_id_att_monthly" }),
	]);

export const hrAttendanceUpdateHistory = mysqlTable("hr_attendance_update_history", {
	idHrAttendanceUpdateHistory: int("id_hr_attendance_update_history").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idHrAttendance: int("id_hr_attendance").notNull(),
	oldData: varchar("old_data", { length: 256 }).notNull(),
	newData: varchar("new_data", { length: 256 }).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	reason: mysqlEnum(['Edit', 'Delete', 'Update']).default('Edit').notNull(),
},
	(table) => [
		index("id_hr_attendance").on(table.idHrAttendance),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrAttendanceUpdateHistory], name: "hr_attendance_update_history_id_hr_attendance_update_history" }),
	]);

export const hrBankBranchMaster = mysqlTable("hr_bank_branch_master", {
	branchId: int("branch_id").autoincrement().notNull(),
	branchName: varchar("branch_name", { length: 200 }).notNull(),
	branchAddress: text("branch_address").notNull(),
	branchRoutingNumber: int("branch_routing_number").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idHrTaxAreaType: int("id_hr_tax_area_type"),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.branchId], name: "hr_bank_branch_master_branch_id" }),
	]);

export const hrBankMaster = mysqlTable("hr_bank_master", {
	bankId: int("bank_id").autoincrement().notNull(),
	bankName: varchar("bank_name", { length: 200 }).notNull(),
	swiftCode: varchar("swift_code", { length: 100 }).notNull(),
	routingNumber: int("routing_number").notNull(),
	description: text().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.bankId], name: "hr_bank_master_bank_id" }),
	]);

export const hrBonusSetup = mysqlTable("hr_bonus_setup", {
	bonusSetupId: int("bonus_setup_id").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	salaryType: mysqlEnum("salary_type", ['Basic', 'Gross']).notNull(),
	bonusPercentage: decimal("bonus_percentage", { precision: 10, scale: 2 }).notNull(),
	description: text().notNull(),
	month: int().notNull(),
	year: int().notNull(),
	bonusTypeId: int("bonus_type_id").notNull().references(() => hrEarningHeads.earningHeadsId),
	payableType: mysqlEnum("payable_type", ['With Payslip', 'Without Payslip']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	budgetConnection: mysqlEnum("budget_connection", ['yes', 'no']).default('no').notNull(),
	idVoucher: int("id_voucher").references(() => accVoucher.idVoucher),
	eligibleDays: int("eligible_days").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	eligibleDate: date("eligible_date", { mode: 'string' }).notNull(),
	status: mysqlEnum(['pending', 'approved', 'deleted', 'denied']).default('pending').notNull(),
	idFiscalYear: int("id_fiscal_year").references(() => accFiscalYear.idFiscalYear),
	employeeGroup: mysqlEnum("employee_group", ['local', 'local_expat_both']).default('local').notNull(),
},
	(table) => [
		index("fk_bonus_setup_variable_earning_head1_idx").on(table.bonusTypeId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_users").on(table.idUsers),
		index("id_voucher").on(table.idVoucher),
		primaryKey({ columns: [table.bonusSetupId], name: "hr_bonus_setup_bonus_setup_id" }),
	]);

export const hrBonusSetupHistory = mysqlTable("hr_bonus_setup_history", {
	bonusSetupHistoryId: int("bonus_setup_history_id").autoincrement().notNull(),
	bonusSetupId: int("bonus_setup_id").notNull().references(() => hrBonusSetup.bonusSetupId),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("bonus_setup_id").on(table.bonusSetupId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.bonusSetupHistoryId], name: "hr_bonus_setup_history_bonus_setup_history_id" }),
	]);

export const hrBonusSetupVouchers = mysqlTable("hr_bonus_setup_vouchers", {
	idHrBonusSetupVouchers: int("id_hr_bonus_setup_vouchers").autoincrement().notNull(),
	idHrBonusSetup: int("id_hr_bonus_setup").notNull(),
	idVoucher: int("id_voucher").notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	amount: decimal({ precision: 12, scale: 2 }).notNull(),
	idCostCenterBusinessUnit: int("id_cost_center_business_unit").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrBonusSetupVouchers], name: "hr_bonus_setup_vouchers_id_hr_bonus_setup_vouchers" }),
	]);

export const hrBusinessUnit = mysqlTable("hr_business_unit", {
	idBusinessUnit: int("id_business_unit").autoincrement().notNull(),
	unitName: varchar("unit_name", { length: 50 }).notNull(),
	idCompany: int("id_company").notNull().references(() => hrCompanySetup.companySetupId),
	idCity: int("id_city").notNull().references(() => hrCity.idCity),
	contactPersonName: varchar("contact_person_name", { length: 50 }).notNull(),
	contactPersonNo: varchar("contact_person_no", { length: 20 }).notNull(),
	idUser: int("id_user").references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_city").on(table.idCity),
		index("id_company").on(table.idCompany),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idBusinessUnit], name: "hr_business_unit_id_business_unit" }),
	]);

export const hrCalendarSetup = mysqlTable("hr_calendar_setup", {
	idCalendarSetup: int("id_calendar_setup").autoincrement().notNull(),
	startDay: int("start_day").notNull(),
	endDay: varchar("end_day", { length: 5 }),
	monthCount: mysqlEnum("month_count", ['Single', 'Multiple']).default('Single').notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idCalendarSetup], name: "hr_calendar_setup_id_calendar_setup" }),
	]);

export const hrCity = mysqlTable("hr_city", {
	idCity: int("id_city").autoincrement().notNull(),
	cityName: varchar("city_name", { length: 100 }).notNull(),
	idUser: int("id_user").references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idCity], name: "hr_city_id_city" }),
	]);

export const hrCompanySetup = mysqlTable("hr_company_setup", {
	companySetupId: int("company_setup_id").autoincrement().notNull(),
	companyName: varchar("company_name", { length: 100 }).notNull(),
	companyAddress: text("company_address").notNull(),
	city: varchar({ length: 80 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	establishDate: date("establish_date", { mode: 'string' }).notNull(),
	companyAcNumber: int("company_ac_number"),
	tradeLicense: int("trade_license"),
	taxDeductionAc: int("tax_deduction_ac").notNull(),
	pfRegNumber: int("pf_reg_number").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	pfRegDate: date("pf_reg_date", { mode: 'string' }).notNull(),
	gratuityRegNum: int("gratuity_reg_num"),
	retirementAge: int("retirement_age"),
	contactPersonId: int("contact_person_id").notNull(),
	contactPersonDesig: int("contact_person_desig").notNull(),
	website: varchar({ length: 80 }).notNull(),
	companyEmail: varchar("company_email", { length: 80 }).notNull(),
	telephoneNum: int("telephone_num").notNull(),
	faxNumber: int("fax_number").notNull(),
	businessType: varchar("business_type", { length: 80 }).notNull(),
	businessGroup: varchar("business_group", { length: 100 }),
	companyCategory: varchar("company_category", { length: 255 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	groupId: int("group_id").notNull().references(() => hrGroupSetup.groupId),
},
	(table) => [
		index("group_id").on(table.groupId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.companySetupId], name: "hr_company_setup_company_setup_id" }),
	]);

export const hrCompensatoryLeave = mysqlTable("hr_compensatory_leave", {
	idCompensatoryLeave: int("id_compensatory_leave").autoincrement().notNull(),
	idEmployee: int("id_employee").references(() => hrEmployee.employeeId),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateOfDuty: date("date_of_duty", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	cplDate: date("cpl_date", { mode: 'string' }),
	remark: text(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").references(() => users.idUsers),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idPorCompensatoryLeave: int("id_por_compensatory_leave"),
	month: int().notNull(),
	year: int().notNull(),
	type: varchar({ length: 10 }).default('cpl').notNull(),
	leaveType: mysqlEnum("leave_type", ['CPL', 'Monthly']).notNull(),
	idMonthlyLeaveFileImport: int("id_monthly_leave_file_import"),
	replacementPerson: int("replacement_person"),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_employee").on(table.idEmployee),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idCompensatoryLeave], name: "hr_compensatory_leave_id_compensatory_leave" }),
	]);

export const hrCompensatoryLeavePolicy = mysqlTable("hr_compensatory_leave_policy", {
	idCompensatoryLeavePolicy: int("id_compensatory_leave_policy").autoincrement().notNull(),
	salaryLimit: decimal("salary_limit", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idCompensatoryLeavePolicy], name: "hr_compensatory_leave_policy_id_compensatory_leave_policy" }),
	]);

export const hrContactEmployeeDetails = mysqlTable("hr_contact_employee_details", {
	idHrContactEmployeeDetails: int("id_hr_contact_employee_details").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	timePeriodStatus: mysqlEnum("time_period_status", ['New', 'Renewed']).default('New').notNull(),
	timePeriodMonth: int("time_period_month").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	timePeriodStartDate: date("time_period_start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	timePeriodEndDate: date("time_period_end_date", { mode: 'string' }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	contactStatus: mysqlEnum("contact_status", ['Expired', 'Running']).default('Running').notNull(),
	idHrOrganizationSetupFileImport: int("id_hr_organization_setup_file_import"),
},
	(table) => [
		index("fk_contact_employee_business_unit1_idx").on(table.idBusinessUnit),
		index("fk_contact_employee_employee1_idx").on(table.employeeId),
		index("fk_contact_employee_users1_idx").on(table.idUsers),
		primaryKey({ columns: [table.idHrContactEmployeeDetails], name: "hr_contact_employee_details_id_hr_contact_employee_details" }),
	]);

export const hrCsvFileUpload = mysqlTable("hr_csv_file_upload", {
	idHrCsvFileUpload: int("id_hr_csv_file_upload").autoincrement().notNull(),
	fileName: text("file_name"),
	originalName: text("original_name"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow(),
	totalData: int("total_data"),
	validEntry: int("valid_entry"),
},
	(table) => [
		primaryKey({ columns: [table.idHrCsvFileUpload], name: "hr_csv_file_upload_id_hr_csv_file_upload" }),
	]);

export const hrCsvFileUploadData = mysqlTable("hr_csv_file_upload_data", {
	idHrCsvFileUploadData: int("id_hr_csv_file_upload_data").autoincrement().notNull(),
	idHrCsvFileUpload: int("id_hr_csv_file_upload"),
	author: text(),
	title: text(),
	publishAt: text("publish_at"),
	publishYear: text("publish_year"),
	doiLink: text("doi_link"),
	scienceDirectLink: text("science_direct_link"),
	abstract: text(),
	keywords: text(),
},
	(table) => [
		primaryKey({ columns: [table.idHrCsvFileUploadData], name: "hr_csv_file_upload_data_id_hr_csv_file_upload_data" }),
	]);

export const hrDeductionHeads = mysqlTable("hr_deduction_heads", {
	deductionHeadsId: int("deduction_heads_id").autoincrement().notNull(),
	deductionHeadsName: varchar("deduction_heads_name", { length: 200 }).notNull(),
	deductionHeadsType: mysqlEnum("deduction_heads_type", ['Fixed', 'Variable']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	isSystem: mysqlEnum("is_system", ['yes', 'no']).default('no').notNull(),
	isTax: mysqlEnum("is_tax", ['yes', 'no']).default('no').notNull(),
	isTaxable: mysqlEnum("is_taxable", ['yes', 'no']).default('yes').notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.deductionHeadsId], name: "hr_deduction_heads_deduction_heads_id" }),
	]);

export const hrDeductionHeadsHistory = mysqlTable("hr_deduction_heads_history", {
	deductionHeadsHistoryId: int("deduction_heads_history_id").autoincrement().notNull(),
	deductionHeadsId: int("deduction_heads_id").notNull().references(() => hrDeductionHeads.deductionHeadsId),
	deductionHeadsName: varchar("deduction_heads_name", { length: 200 }).notNull(),
	deductionHeadsType: mysqlEnum("deduction_heads_type", ['Fixed', 'Variable']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	isSystem: mysqlEnum("is_system", ['yes', 'no']),
	isTax: mysqlEnum("is_tax", ['yes', 'no']).notNull(),
	isTaxable: mysqlEnum("is_taxable", ['yes', 'no']).notNull(),
},
	(table) => [
		index("deduction_heads_id").on(table.deductionHeadsId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.deductionHeadsHistoryId], name: "hr_deduction_heads_history_deduction_heads_history_id" }),
	]);

export const hrDenomination = mysqlTable("hr_denomination", {
	denominationId: int("denomination_id").autoincrement().notNull(),
	currencyValue: int("currency_value").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.denominationId], name: "hr_denomination_denomination_id" }),
	]);

export const hrDepartments = mysqlTable("hr_departments", {
	idDepartment: int("id_department").autoincrement().notNull(),
	department: varchar({ length: 200 }).notNull(),
	description: text(),
	idUser: int("id_user").references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idDepartment], name: "hr_departments_id_department" }),
	]);

export const hrDesignationMaster = mysqlTable("hr_designation_master", {
	designationId: int("designation_id").autoincrement().notNull(),
	designationTitle: varchar("designation_title", { length: 100 }).notNull(),
	shortForm: varchar("short_form", { length: 100 }).notNull(),
	description: text().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.designationId], name: "hr_designation_master_designation_id" }),
	]);

export const hrEarningHeads = mysqlTable("hr_earning_heads", {
	earningHeadsId: int("earning_heads_id").autoincrement().notNull(),
	earningHeadsName: varchar("earning_heads_name", { length: 200 }).notNull(),
	earningHeadsType: mysqlEnum("earning_heads_type", ['Fixed', 'Variable']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull(),
	isSystem: mysqlEnum("is_system", ['yes', 'no']).default('no'),
	partOfGross: mysqlEnum("part_of_gross", ['yes', 'no', 'bonus']),
},
	(table) => [
		primaryKey({ columns: [table.earningHeadsId], name: "hr_earning_heads_earning_heads_id" }),
	]);

export const hrEarningHeadsHistory = mysqlTable("hr_earning_heads_history", {
	earningHeadsHistoryId: int("earning_heads_history_id").autoincrement().notNull(),
	earningHeadsId: int("earning_heads_id").notNull().references(() => hrEarningHeads.earningHeadsId),
	earningHeadsName: varchar("earning_heads_name", { length: 200 }).notNull(),
	earningHeadsType: mysqlEnum("earning_heads_type", ['Fixed', 'Variable']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	isSystem: mysqlEnum("is_system", ['yes', 'no']).notNull(),
	partOfGross: mysqlEnum("part_of_gross", ['yes', 'no', 'bonus']),
},
	(table) => [
		index("earning_heads_id").on(table.earningHeadsId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.earningHeadsHistoryId], name: "hr_earning_heads_history_earning_heads_history_id" }),
	]);

export const hrEducation = mysqlTable("hr_education", {
	educationId: int("education_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idHrEmployeeEducationFileImport: int("id_hr_employee_education_file_import"),
	idHrisFileEntryDetails: int("id_hris_file_entry_details"),
	idHrEducationLevels: int("id_hr_education_levels").notNull(),
	idHrExamTitles: int("id_hr_exam_titles").notNull(),
	idHrInstitutes: int("id_hr_institutes").notNull(),
	idHrEducationBoards: int("id_hr_education_boards"),
	idHrEducationConcentrations: int("id_hr_education_concentrations"),
	result: varchar({ length: 45 }).notNull(),
	marks: double({ precision: 12, scale: 2 }),
	scale: double({ precision: 12, scale: 2 }),
	cgpa: double({ precision: 12, scale: 2 }),
	yearOfPassing: varchar("year_of_passing", { length: 6 }).notNull(),
	duration: varchar({ length: 2 }).notNull(),
	achievement: text(),
	remark: text(),
	fileName: varchar("file_name", { length: 255 }),
	originalName: varchar("original_name", { length: 255 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("fk_education_employee1_idx").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.educationId], name: "hr_education_education_id" }),
	]);

export const hrEducationBoards = mysqlTable("hr_education_boards", {
	idHrEducationBoards: int("id_hr_education_boards").autoincrement().notNull(),
	idUsers: int("id_users").notNull(),
	boardName: varchar("board_name", { length: 50 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrEducationBoards], name: "hr_education_boards_id_hr_education_boards" }),
	]);

export const hrEducationConcentrations = mysqlTable("hr_education_concentrations", {
	idHrEducationConcentrations: int("id_hr_education_concentrations").autoincrement().notNull(),
	concentrationName: text("concentration_name").notNull(),
	remark: text(),
	idHrEmployeeEducationFileImport: int("id_hr_employee_education_file_import"),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpated: timestamp("date_upated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrEducationConcentrations], name: "hr_education_concentrations_id_hr_education_concentrations" }),
	]);

export const hrEducationLevels = mysqlTable("hr_education_levels", {
	idHrEducationLevels: int("id_hr_education_levels").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	educationLevel: varchar("education_level", { length: 100 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	remarks: text(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrEducationLevels], name: "hr_education_levels_id_hr_education_levels" }),
	]);

export const hrEmployee = mysqlTable("hr_employee", {
	employeeId: int("employee_id").autoincrement().notNull(),
	employeeCustomId: varchar("employee_custom_id", { length: 100 }).notNull(),
	employeeLegacyId: varchar("employee_legacy_id", { length: 100 }),
	tempIdProjects: int("temp_id_projects"),
	firstName: varchar("first_name", { length: 45 }).notNull(),
	middleName: varchar("middle_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 45 }),
	phoneNumber: varchar("phone_number", { length: 45 }).notNull(),
	gender: varchar({ length: 45 }),
	maritalStatus: varchar("marital_status", { length: 45 }),
	fatherName: varchar("father_name", { length: 45 }).notNull(),
	motherName: varchar("mother_name", { length: 45 }).notNull(),
	presentAddress: text("present_address").notNull(),
	permanantAddress: text("permanant_address").notNull(),
	email: varchar({ length: 100 }).notNull(),
	nid: varchar({ length: 100 }).notNull(),
	bloodGroup: varchar("blood_group", { length: 45 }),
	religion: varchar({ length: 45 }),
	avatar: varchar({ length: 45 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dob: date({ mode: 'string' }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow(),
	telephoneNumber: varchar("telephone_number", { length: 100 }).notNull(),
	drivingLiscence: varchar("driving_liscence", { length: 200 }).notNull(),
	spouseName: varchar("spouse_name", { length: 100 }).notNull(),
	passport: varchar({ length: 100 }).notNull(),
	startTitle: varchar("start_title", { length: 100 }).notNull(),
	endTitle: varchar("end_title", { length: 100 }).notNull(),
	birthCertificateNumber: varchar("birth_certificate_number", { length: 100 }).notNull(),
	emergencyPhoneNumber: varchar("emergency_phone_number", { length: 100 }).notNull(),
	homeDistrict: varchar("home_district", { length: 100 }),
	fullName: varchar("full_name", { length: 200 }).notNull(),
	password: varchar({ length: 100 }),
	passwordChanged: mysqlEnum("password_changed", ['yes', 'no']).default('no'),
	tinNumber: varchar("tin_number", { length: 100 }).notNull(),
	emergencyContactName: varchar("emergency_contact_name", { length: 100 }).notNull(),
	emergencyContactRelation: varchar("emergency_contact_relation", { length: 100 }).notNull(),
	spouseProfession: varchar("spouse_profession", { length: 100 }).notNull(),
	spouseDob: varchar("spouse_dob", { length: 100 }).notNull(),
	marraigeDate: varchar({ length: 100 }).notNull(),
	spouseBloodGroup: varchar("spouse_blood_group", { length: 100 }).notNull(),
	tinCertificate: varchar("tin_certificate", { length: 100 }).notNull(),
	taxCircle: varchar("tax_circle", { length: 100 }),
	taxZone: varchar("tax_zone", { length: 100 }),
	idHrTaxAreaType: int("id_hr_tax_area_type"),
	idHrisTalentAcquisitionJoiningDetails: int("id_hris_talent_acquisition_joining_details"),
	idInterviewAppraisedCandidate: int("id_interview_appraised_candidate"),
	idHrEmployeeInsertFileImport: int("id_hr_employee_insert_file_import"),
	idCountryDetails: int("id_country_details"),
	avatarOriginalName: text("avatar_original_name"),
	tinOriginalName: text("tin_original_name"),
	remarks: text(),
	idHrisJobRequisitionSummery: int("id_hris_job_requisition_summery"),
	idHrisFileEntryDetails: int("id_hris_file_entry_details"),
	idPorEmployeeCarAit: int("id_por_employee_car_ait"),
	idPorEmployeeTinInfo: int("id_por_employee_tin_info"),
	idUsers: int("id_users"),
},
	(table) => [
		primaryKey({ columns: [table.employeeId], name: "hr_employee_employee_id" }),
	]);

export const hrEmployeeBonusInfo = mysqlTable("hr_employee_bonus_info", {
	employeeBonusInfoId: int("employee_bonus_info_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	bonusSetupId: int("bonus_setup_id").notNull().references(() => hrBonusSetup.bonusSetupId),
	bonusAmount: decimal("bonus_amount", { precision: 12, scale: 2 }).notNull(),
	month: int().notNull(),
	year: int().notNull(),
	payableType: mysqlEnum("payable_type", ['With Payslip', 'Without Payslip']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	paidAmount: decimal("paid_amount", { precision: 12, scale: 2 }).notNull(),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	remarks: text(),
},
	(table) => [
		index("fk_employee_bonus_info_bonus_setup1_idx").on(table.bonusSetupId),
		index("fk_employee_bonus_info_employee1_idx").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.employeeBonusInfoId], name: "hr_employee_bonus_info_employee_bonus_info_id" }),
	]);

export const hrEmployeeBonusInfoHistory = mysqlTable("hr_employee_bonus_info_history", {
	employeeBonusInfoHistoryId: int("employee_bonus_info_history_id").autoincrement().notNull(),
	bonusSetupId: int("bonus_setup_id").notNull().references(() => hrBonusSetup.bonusSetupId),
	previousData: longtext("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull(),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("bonus_setup_id").on(table.bonusSetupId),
		primaryKey({ columns: [table.employeeBonusInfoHistoryId], name: "hr_employee_bonus_info_history_employee_bonus_info_history_id" }),
	]);

export const hrEmployeeBonusInfoIndividualHistory = mysqlTable("hr_employee_bonus_info_individual_history", {
	individualBonusHistoryId: int("individual_bonus_history_id").autoincrement().notNull(),
	employeeBonusInfoId: int("employee_bonus_info_id").notNull().references(() => hrEmployeeBonusInfo.employeeBonusInfoId),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("employee_bonus_info_id").on(table.employeeBonusInfoId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.individualBonusHistoryId], name: "hr_employee_bonus_info_individual_history_individual_bonus_history_id" }),
	]);

export const hrEmployeeCostCenterSetup = mysqlTable("hr_employee_cost_center_setup", {
	idHrEmployeeCostCenterSetup: int("id_hr_employee_cost_center_setup").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	remarks: text(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	deletedBy: int("deleted_by"),
	idHrOrganizationSetupFileImport: int("id_hr_organization_setup_file_import"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrEmployeeCostCenterSetup], name: "hr_employee_cost_center_setup_id_hr_employee_cost_center_setup" }),
	]);

export const hrEmployeeCostCenterSetupDetails = mysqlTable("hr_employee_cost_center_setup_details", {
	idHrEmployeeCostCenterSetupDetails: int("id_hr_employee_cost_center_setup_details").autoincrement().notNull(),
	idHrEmployeeCostCenterSetup: int("id_hr_employee_cost_center_setup").notNull().references(() => hrEmployeeCostCenterSetup.idHrEmployeeCostCenterSetup),
	idCostCenter: int("id_cost_center").notNull().references(() => costCenter.idCostCenter),
	costCenterPercentage: decimal("cost_center_percentage", { precision: 5, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	remarks: text(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	deletedBy: int("deleted_by"),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idCostCenterBusinessUnit: int("id_cost_center_business_unit"),
},
	(table) => [
		index("id_cost_center").on(table.idCostCenter),
		index("id_hr_employee_cost_center_setup").on(table.idHrEmployeeCostCenterSetup),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrEmployeeCostCenterSetupDetails], name: "hr_employee_cost_center_setup_details_id_hr_employee_cost_center_setup_details" }),
	]);

export const hrEmployeeDescription = mysqlTable("hr_employee_description", {
	employeeDescriptionId: int("employee_description_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	description: text().notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.employeeDescriptionId], name: "hr_employee_description_employee_description_id" }),
	]);

export const hrEmployeeEducationFileImport = mysqlTable("hr_employee_education_file_import", {
	idHrEmployeeEducationFileImport: int("id_hr_employee_education_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: text("original_name"),
	dataType: mysqlEnum("data_type", ['Education', 'Institute', 'Concentration']),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idHrEmployeeEducationFileImport], name: "hr_employee_education_file_import_id_hr_employee_education_file_import" }),
	]);

export const hrEmployeeExperienceFileImport = mysqlTable("hr_employee_experience_file_import", {
	idHrEmployeeExperienceFileImport: int("id_hr_employee_experience_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: text("original_name"),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idHrEmployeeExperienceFileImport], name: "hr_employee_experience_file_import_id_hr_employee_experience_file_import" }),
	]);

export const hrEmployeeHistory = mysqlTable("hr_employee_history", {
	hrEmployeeHistoryId: int("hr_employee_history_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	employeeCustomId: int("employee_custom_id").notNull(),
	previousData: longtext("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit_ind', 'delete', 'edit_excel']).notNull(),
	idHrEmployeeUpdateFileImport: int("id_hr_employee_update_file_import"),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("employee_id").on(table.employeeId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.hrEmployeeHistoryId], name: "hr_employee_history_hr_employee_history_id" }),
	]);

export const hrEmployeeInsertFileImport = mysqlTable("hr_employee_insert_file_import", {
	idHrEmployeeInsertFileImport: int("id_hr_employee_insert_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idHrEmployeeInsertFileImport], name: "hr_employee_insert_file_import_id_hr_employee_insert_file_import" }),
	]);

export const hrEmployeeNatureType = mysqlTable("hr_employee_nature_type", {
	idEmployeeNatureType: int("id_employee_nature_type").autoincrement().notNull(),
	typeName: varchar("type_name", { length: 50 }).notNull(),
	remark: text().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	timePeriod: mysqlEnum("time_period", ['YES', 'NO']).default('NO').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idEmployeeNatureType], name: "hr_employee_nature_type_id_employee_nature_type" }),
	]);

export const hrEmployeeRemarks = mysqlTable("hr_employee_remarks", {
	idHrEmployeeRemarks: int("id_hr_employee_remarks").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	remarks: text().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	reminderDate: date("reminder_date", { mode: 'string' }),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	fileName: text("file_name"),
	originalName: text("original_name"),
},
	(table) => [
		primaryKey({ columns: [table.idHrEmployeeRemarks], name: "hr_employee_remarks_id_hr_employee_remarks" }),
	]);

export const hrEmployeeRemarksEmailNotifiers = mysqlTable("hr_employee_remarks_email_notifiers", {
	idHrEmployeeRemarksEmailNotifiers: int("id_hr_employee_remarks_email_notifiers", { unsigned: true }).autoincrement().notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	idHrEmployeeRemarks: int("id_hr_employee_remarks").notNull(),
	notifierEmployeeId: int("notifier_employee_id").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrEmployeeRemarksEmailNotifiers], name: "hr_employee_remarks_email_notifiers_id_hr_employee_remarks_email_notifiers" }),
	]);

export const hrEmployeeRemarksHistory = mysqlTable("hr_employee_remarks_history", {
	idHrEmployeeRemarksHistory: int("id_hr_employee_remarks_history", { unsigned: true }).autoincrement().notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	idHrEmployeeRemarks: int("id_hr_employee_remarks").notNull(),
	oldData: text("old_data").notNull(),
	updatedBy: int("updated_by").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrEmployeeRemarksHistory], name: "hr_employee_remarks_history_id_hr_employee_remarks_history" }),
	]);

export const hrEmployeeSalaryBusinessUnit = mysqlTable("hr_employee_salary_business_unit", {
	employeeSalaryBusinessUnitId: int("employee_salary_business_unit_id").autoincrement().notNull(),
	organizationSetupId: int("organization_setup_id").notNull().references(() => hrOrganizationSetup.organizationSetupId),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	salaryBusinessUnitId: int("salary_business_unit_id").notNull().references(() => projects.idProjects),
	salaryPercentage: decimal("salary_percentage", { precision: 5, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("fk_employee_salary_business_unit1_idx").on(table.organizationSetupId),
		index("fk_employee_salary_business_unit_idx").on(table.employeeId),
		index("id_users").on(table.idUsers),
		index("salary_business_unit_id").on(table.salaryBusinessUnitId),
		primaryKey({ columns: [table.employeeSalaryBusinessUnitId], name: "hr_employee_salary_business_unit_employee_salary_business_unit_id" }),
	]);

export const hrEmployeeSalaryBusinessUnitHistory = mysqlTable("hr_employee_salary_business_unit_history", {
	employeeSalaryBusinessUnitHistoryId: int("employee_salary_business_unit_history_id").autoincrement().notNull(),
	organizationSetupId: int("organization_setup_id").notNull().references(() => hrOrganizationSetup.organizationSetupId),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	previousData: longtext("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("organization_setup_id").on(table.organizationSetupId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.employeeSalaryBusinessUnitHistoryId], name: "hr_employee_salary_business_unit_history_employee_salary_business_unit_history_id" }),
	]);

export const hrEmployeeSalaryInfo = mysqlTable("hr_employee_salary_info", {
	employeeSalaryInfoId: int("employee_salary_info_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idFiscalYear: int("id_fiscal_year").notNull(),
	payStructureTemplateId: int("pay_structure_template_id").notNull().references(() => hrPayStructureTemplate.payStructureTemplateId),
	basicSalary: decimal("basic_salary", { precision: 12, scale: 2 }).notNull(),
	grossSalary: decimal("gross_salary", { precision: 12, scale: 2 }).notNull(),
	grossDeduction: decimal("gross_deduction", { precision: 12, scale: 2 }).notNull(),
	netSalary: decimal("net_salary", { precision: 12, scale: 2 }).notNull(),
	ctcSalary: decimal("ctc_salary", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	month: int().notNull(),
	year: int().notNull(),
	payStructureSetupRecordsId: int("pay_structure_setup_records_id").notNull().references(() => hrPayStructureSetupRecords.payStructureSetupRecordsId),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	idHrPayStructureSetupFileImport: int("id_hr_pay_structure_setup_file_import"),
},
	(table) => [
		index("fk_employee_salary_employee1_idx").on(table.employeeId),
		index("fk_employee_salary_pay_structure_template_details1_idx").on(table.payStructureTemplateId),
		index("id_users").on(table.idUsers),
		index("pay_structure_setup_records_id").on(table.payStructureSetupRecordsId),
		primaryKey({ columns: [table.employeeSalaryInfoId], name: "hr_employee_salary_info_employee_salary_info_id" }),
	]);

export const hrEmployeeSalaryInfoHistory = mysqlTable("hr_employee_salary_info_history", {
	employeeSalaryInfoHistoryId: int("employee_salary_info_history_id").autoincrement().notNull(),
	payStructureSetupRecordsId: int("pay_structure_setup_records_id").notNull().references(() => hrPayStructureSetupRecords.payStructureSetupRecordsId),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("pay_structure_setup_records_id").on(table.payStructureSetupRecordsId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.employeeSalaryInfoHistoryId], name: "hr_employee_salary_info_history_employee_salary_info_history_id" }),
	]);

export const hrEmployeeSepcialWeekendsFileUpload = mysqlTable("hr_employee_sepcial_weekends_file_upload", {
	idHrEmployeeSepcialWeekendsFileUpload: int("id_hr_employee_sepcial_weekends_file_upload").autoincrement().notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalFileName: varchar("original_file_name", { length: 100 }).notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	validEntry: int("valid_entry"),
	invalidEntry: int("invalid_entry"),
	idProject: int("id_project").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrEmployeeSepcialWeekendsFileUpload], name: "hr_employee_sepcial_weekends_file_upload_id_hr_employee_sepcial_weekends_file_upload" }),
	]);

export const hrEmployeeSpecialWeekends = mysqlTable("hr_employee_special_weekends", {
	idHrEmployeeSpecialWeekends: int("id_hr_employee_special_weekends").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	weekendDate: date("weekend_date", { mode: 'string' }).notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idHrEmployeeSepcialWeekendsFileUpload: int("id_hr_employee_sepcial_weekends_file_upload").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrEmployeeSpecialWeekends], name: "hr_employee_special_weekends_id_hr_employee_special_weekends" }),
	]);

export const hrEmployeeTaxChangesHistory = mysqlTable("hr_employee_tax_changes_history", {
	idHrEmployeeTaxChangesHistory: int("id_hr_employee_tax_changes_history").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	previousTax: double("previous_tax", { precision: 12, scale: 2 }),
	newTax: double("new_tax", { precision: 12, scale: 2 }),
	taxDifference: double("tax_difference", { precision: 12, scale: 2 }),
	prevPayStructureSetupRecordsId: int("prev_pay_structure_setup_records_id"),
	payStructureSetupRecordsId: int("pay_structure_setup_records_id").notNull().references(() => hrPayStructureSetupRecords.payStructureSetupRecordsId),
	month: int().notNull(),
	year: int().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	idHrTaxRecalculate: int("id_hr_tax_recalculate").notNull().references(() => hrTaxRecalculate.idHrTaxRecalculate),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_hr_tax_recalculate").on(table.idHrTaxRecalculate),
		index("id_users").on(table.idUsers),
		index("pay_structure_setup_records_id").on(table.payStructureSetupRecordsId),
		primaryKey({ columns: [table.idHrEmployeeTaxChangesHistory], name: "hr_employee_tax_changes_history_id_hr_employee_tax_changes_history" }),
	]);

export const hrEmployeeTaxInfo = mysqlTable("hr_employee_tax_info", {
	idHrEmployeeTaxInfo: int("id_hr_employee_tax_info").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	totalTaxPaidAmount: double("total_tax_paid_amount", { precision: 12, scale: 2 }).notNull(),
	totalBasicSalary: double("total_basic_salary", { precision: 12, scale: 2 }).notNull(),
	totalGrossSalary: double("total_gross_salary", { precision: 12, scale: 2 }).notNull(),
	totalCtcSalary: double("total_ctc_salary", { precision: 12, scale: 2 }).notNull(),
	totalMonth: int("total_month").notNull(),
	totalDeductionOthers: double("total_deduction_others", { precision: 12, scale: 2 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	previousEmployeeId: int("previous_employee_id"),
	adjustedAmount: double("adjusted_amount", { precision: 12, scale: 2 }),
	adjustedType: mysqlEnum("adjusted_type", ['tax_added', 'tax_return']),
	idPorEmployeeCarAit: int("id_por_employee_car_ait"),
	basicSalary: double("basic_salary", { precision: 12, scale: 2 }),
	grossSalary: double("gross_salary", { precision: 12, scale: 2 }),
	ctcSalary: double("ctc_salary", { precision: 12, scale: 2 }),
	remarks: text(),
	setupFrom: text("setup_from"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrEmployeeTaxInfo], name: "hr_employee_tax_info_id_hr_employee_tax_info" }),
	]);

export const hrEmployeeTaxInfoDetails = mysqlTable("hr_employee_tax_info_details", {
	idHrEmployeeTaxInfoDetails: int("id_hr_employee_tax_info_details").autoincrement().notNull(),
	idHrEmployeeTaxInfo: int("id_hr_employee_tax_info").notNull().references(() => hrEmployeeTaxInfo.idHrEmployeeTaxInfo),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idPaySlipGenerationInfo: int("id_pay_slip_generation_info"),
	paySlipGenerationId: int("pay_slip_generation_id"),
	bonusSetupId: int("bonus_setup_id"),
	employeeBonusInfoId: int("employee_bonus_info_id"),
	bonusTypeId: int("bonus_type_id"),
	bonusAmount: double("bonus_amount", { precision: 12, scale: 2 }),
	payableType: mysqlEnum("payable_type", ['With Payslip', 'Without Payslip']),
	type: mysqlEnum(['salary', 'bonus']).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	entryFrom: text("entry_from"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hr_employee_tax_info").on(table.idHrEmployeeTaxInfo),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrEmployeeTaxInfoDetails], name: "hr_employee_tax_info_details_id_hr_employee_tax_info_details" }),
	]);

export const hrEmployeeTransfer = mysqlTable("hr_employee_transfer", {
	employeeTransferId: int("employee_transfer_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	previousBusinessUnitId: int("previous_business_unit_id").notNull().references(() => projects.idProjects),
	currentBusinessUnitId: int("current_business_unit_id").notNull().references(() => projects.idProjects),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	previousEffectiveDate: date("previous_effective_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	currentEffectiveDate: date("current_effective_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	transferEntryDate: date("transfer_entry_date", { mode: 'string' }).notNull(),
	transferStatus: mysqlEnum("transfer_status", ['Done', 'Pending', 'Denied']).default('Pending').notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idReportingPerson: int("id_reporting_person"),
	previousIdHrEmployeeCostCenterSetup: int("previous_id_hr_employee_cost_center_setup"),
	payStructureRecordId: int("pay_structure_record_id"),
},
	(table) => [
		index("current_business_unit_id").on(table.currentBusinessUnitId),
		index("fk_employee_transfer_employee1_idx").on(table.employeeId),
		index("id_users").on(table.idUsers),
		index("previous_business_unit_id").on(table.previousBusinessUnitId),
		primaryKey({ columns: [table.employeeTransferId], name: "hr_employee_transfer_employee_transfer_id" }),
	]);

export const hrEmployeeUpdateFileImport = mysqlTable("hr_employee_update_file_import", {
	idHrEmployeeUpdateFileImport: int("id_hr_employee_update_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: text("original_name"),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idHrEmployeeUpdateFileImport], name: "hr_employee_update_file_import_id_hr_employee_update_file_import" }),
	]);

export const hrEmployeeWeekends = mysqlTable("hr_employee_weekends", {
	idHrEmployeeWeekends: int("id_hr_employee_weekends").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idHrWeekend: int("id_hr_weekend").default(7).notNull().references(() => hrWeekend.idHrWeekend),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	weekendType: mysqlEnum("weekend_type", ['all', 'custom']).default('all').notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hr_weekend").on(table.idHrWeekend),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrEmployeeWeekends], name: "hr_employee_weekends_id_hr_employee_weekends" }),
	]);

export const hrEmployeeWeekendsSpecialCases = mysqlTable("hr_employee_weekends_special_cases", {
	idHrEmployeeWeekendsSpecialCases: int("id_hr_employee_weekends_special_cases").autoincrement().notNull(),
	idHrEmployeeWeekends: int("id_hr_employee_weekends").notNull(),
	firstWeek: tinyint("first_week").default(0).notNull(),
	secondWeek: tinyint("second_week").default(0).notNull(),
	thirdWeek: tinyint("third_week").default(0).notNull(),
	fourthWeek: tinyint("fourth_week").default(0).notNull(),
	fifthWeek: tinyint("fifth_week").default(0).notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idHrEmployeeWeekendsSpecialCases], name: "hr_employee_weekends_special_cases_id_hr_employee_weekends_special_cases" }),
	]);

export const hrEquivalentDesignation = mysqlTable("hr_equivalent_designation", {
	equivalentDesignationId: int("equivalent_designation_id").autoincrement().notNull(),
	equivalentDesignationTitle: varchar("equivalent_designation_title", { length: 100 }).notNull(),
	equivalentShortForm: varchar("equivalent_short_form", { length: 25 }).notNull(),
	description: text().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.equivalentDesignationId], name: "hr_equivalent_designation_equivalent_designation_id" }),
	]);

export const hrExamTitles = mysqlTable("hr_exam_titles", {
	idHrExamTitles: int("id_hr_exam_titles").autoincrement().notNull(),
	idHrEducationLevels: int("id_hr_education_levels").notNull().references(() => hrEducationLevels.idHrEducationLevels),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	examTitles: varchar("exam_titles", { length: 100 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).default('0000-00-00 00:00:00').onUpdateNow().notNull(),
	remarks: text(),
},
	(table) => [
		index("id_hr_education_levels").on(table.idHrEducationLevels),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrExamTitles], name: "hr_exam_titles_id_hr_exam_titles" }),
	]);

export const hrExcelUpdatedEmployeeInfo = mysqlTable("hr_excel_updated_employee_info", {
	idHrExcelUpdatedEmployeeInfo: int("id_hr_excel_updated_employee_info").autoincrement().notNull(),
	idHrEmployeeInsertFileImport: int("id_hr_employee_insert_file_import").notNull(),
	employeeId: int("employee_id").notNull(),
	employeeCustomId: int("employee_custom_id").notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
},
	(table) => [
		primaryKey({ columns: [table.idHrExcelUpdatedEmployeeInfo], name: "hr_excel_updated_employee_info_id_hr_excel_updated_employee_info" }),
	]);

export const hrExperience = mysqlTable("hr_experience", {
	experienceId: int("experience_id").autoincrement().notNull(),
	designation: varchar({ length: 100 }).notNull(),
	department: varchar({ length: 45 }).notNull(),
	company: varchar({ length: 100 }).notNull(),
	remark: text(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }),
	durationYear: int("duration_year"),
	durationMonth: int("duration_month"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	fileName: varchar("file_name", { length: 200 }),
	originalName: varchar("original_name", { length: 200 }),
	idHrisFileEntryDetails: int("id_hris_file_entry_details"),
	idHrEmployeeExperienceFileImport: int("id_hr_employee_experience_file_import"),
},
	(table) => [
		index("fk_experience_employee1_idx").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.experienceId], name: "hr_experience_experience_id" }),
	]);

export const hrFarewell = mysqlTable("hr_farewell", {
	idHrFarewell: int("id_hr_farewell").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	farewellDate: date("farewell_date", { mode: 'string' }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	resignDate: date("resign_date", { mode: 'string' }),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrFarewell], name: "hr_farewell_id_hr_farewell" }),
	]);

export const hrFinalSettlement = mysqlTable("hr_final_settlement", {
	finalSettlementId: int("final_settlement_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	month: int().notNull(),
	year: int().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	monthYear: varchar("month_year", { length: 50 }).notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	budgetConnection: mysqlEnum("budget_connection", ['yes', 'no']).default('no'),
	idEarningVoucher: int("id_earning_voucher").references(() => accVoucher.idVoucher),
	idDeductionVoucher: int("id_deduction_voucher").references(() => accVoucher.idVoucher),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	voucherDate: date("voucher_date", { mode: 'string' }),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	accountPaid: decimal("account_paid", { precision: 12, scale: 2 }).default('0.00').notNull(),
	accountReceipt: decimal("account_receipt", { precision: 12, scale: 2 }).default('0.00').notNull(),
	performanceStatus: mysqlEnum("performance_status", ['Excellent', 'Good', 'Average', 'Below Average', 'Not Required']),
	validatedBy: int("validated_by"),
	remarks: varchar({ length: 255 }),
},
	(table) => [
		index("fk_final_settlement_employee1_idx").on(table.employeeId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_deduction_voucher").on(table.idDeductionVoucher),
		index("id_earning_voucher").on(table.idEarningVoucher),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.finalSettlementId], name: "hr_final_settlement_final_settlement_id" }),
	]);

export const hrFinalSettlementDetails = mysqlTable("hr_final_settlement_details", {
	finalSettlementDetailsId: int("final_settlement_details_id").autoincrement().notNull(),
	finalSettlementId: int("final_settlement_id").notNull().references(() => hrFinalSettlement.finalSettlementId),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	headType: varchar("head_type", { length: 150 }).notNull(),
	earningDeductionHeadsId: int("earning_deduction_heads_id").notNull(),
	headsAmount: decimal("heads_amount", { precision: 12, scale: 2 }).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	particular: text(),
	remark: text(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.finalSettlementDetailsId], name: "hr_final_settlement_details_final_settlement_details_id" }),
	]);

export const hrFinalSettlementHistory = mysqlTable("hr_final_settlement_history", {
	finalSettlementHistoryId: int("final_settlement_history_id").autoincrement().notNull(),
	finalSettlementId: int("final_settlement_id").notNull().references(() => hrFinalSettlement.finalSettlementId),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("final_settlement_id").on(table.finalSettlementId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.finalSettlementHistoryId], name: "hr_final_settlement_history_final_settlement_history_id" }),
	]);

export const hrFinalSettlementPerformanceStatusProviders = mysqlTable("hr_final_settlement_performance_status_providers", {
	idHrFinalSettlementPerformanceStatusProvider: int("id_hr_final_settlement_performance_status_provider").autoincrement().notNull(),
	idHrFinalSettlement: int("id_hr_final_settlement").notNull().references(() => hrFinalSettlement.finalSettlementId),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hr_final_settlement").on(table.idHrFinalSettlement),
		primaryKey({ columns: [table.idHrFinalSettlementPerformanceStatusProvider], name: "hr_final_settlement_performance_status_providers_id_hr_final_settlement_performance_status_provider" }),
	]);

export const hrFingerPrintMargeFileImport = mysqlTable("hr_finger_print_marge_file_import", {
	idFingerPrintMargeFileImport: int("id_finger_print_marge_file_import").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	fileName: text("file_name").notNull(),
	validEntry: int("valid_entry"),
	invalidEntry: int("invalid_entry"),
	invalidIds: text("invalid_ids"),
	duplicateEntry: int("duplicate_entry"),
	duplicateIds: text("duplicate_ids"),
	totalInvalidEmployeeId: int("total_invalid_employee_id"),
	invalidEmployeeIds: text("invalid_employee_ids"),
	totalDuplicateMachineId: int("total_duplicate_machine_id"),
	totalDuplicateMachineIds: text("total_duplicate_machine_ids"),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idFingerPrintMargeFileImport], name: "hr_finger_print_marge_file_import_id_finger_print_marge_file_import" }),
	]);

export const hrFingerPrintMargeRecord = mysqlTable("hr_finger_print_marge_record", {
	idFingerPrintMargeRecord: int("id_finger_print_marge_record").autoincrement().notNull(),
	idFingerPrintMargeFileImport: int("id_finger_print_marge_file_import").notNull().references(() => hrFingerPrintMargeFileImport.idFingerPrintMargeFileImport),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	officeId: int("office_id").notNull(),
	fingerPrintId: int("finger_print_id").notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_finger_print_marge_file_import").on(table.idFingerPrintMargeFileImport),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idFingerPrintMargeRecord], name: "hr_finger_print_marge_record_id_finger_print_marge_record" }),
	]);

export const hrFpMachineAttendanceLogs = mysqlTable("hr_fp_machine_attendance_logs", {
	idHrFpMachineAttendanceLog: int("id_hr_fp_machine_attendance_log").autoincrement().notNull(),
	idHrFpMachines: int("id_hr_fp_machines").notNull(),
	machineUid: int("machine_uid"),
	attendanceStatus: int("attendance_status").notNull(),
	attendanceTimestamp: datetime("attendance_timestamp", { mode: 'string' }).notNull(),
	attendancePunch: int("attendance_punch"),
	machineUserId: varchar("machine_user_id", { length: 35 }).notNull(),
	inputMethod: mysqlEnum("input_method", ['live', 'pull']).default('live').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("AttendanceTimestamp").on(table.attendanceTimestamp),
		index("MachineUserId").on(table.machineUserId),
		primaryKey({ columns: [table.idHrFpMachineAttendanceLog], name: "hr_fp_machine_attendance_logs_id_hr_fp_machine_attendance_log" }),
	]);

export const hrFpMachineAttendanceLogsCopy = mysqlTable("hr_fp_machine_attendance_logs_copy", {
	idHrFpMachineAttendanceLog: int("id_hr_fp_machine_attendance_log").autoincrement().notNull(),
	idHrFpMachines: int("id_hr_fp_machines").notNull(),
	machineUid: int("machine_uid"),
	attendanceStatus: int("attendance_status").notNull(),
	attendanceTimestamp: datetime("attendance_timestamp", { mode: 'string' }).notNull(),
	attendancePunch: int("attendance_punch"),
	machineUserId: varchar("machine_user_id", { length: 35 }).notNull(),
	inputMethod: mysqlEnum("input_method", ['live', 'pull']).default('live').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("AttendanceTimestamp").on(table.attendanceTimestamp),
		index("MachineUserId").on(table.machineUserId),
		primaryKey({ columns: [table.idHrFpMachineAttendanceLog], name: "hr_fp_machine_attendance_logs_copy_id_hr_fp_machine_attendance_log" }),
	]);

export const hrFpMachineSyncLog = mysqlTable("hr_fp_machine_sync_log", {
	idHrFpMachineSyncLog: int("id_hr_fp_machine_sync_log").autoincrement().notNull(),
	idHrFpMachines: int("id_hr_fp_machines").references(() => hrFpMachines.idHrFpMachines),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	attendanceCount: int("attendance_count"),
	userCount: int("user_count"),
	status: mysqlEnum(['started', 'success', 'failed']),
	message: text(),
},
	(table) => [
		primaryKey({ columns: [table.idHrFpMachineSyncLog], name: "hr_fp_machine_sync_log_id_hr_fp_machine_sync_log" }),
	]);

export const hrFpMachineUserTemplates = mysqlTable("hr_fp_machine_user_templates", {
	idHrFpMachineTemplate: int("id_hr_fp_machine_template").autoincrement().notNull(),
	machineTemplateData: text("machine_template_data").notNull(),
	templateHash: varchar("template_hash", { length: 64 }).notNull(),
	fid: int().notNull(),
	valid: int().notNull(),
	idHrFpMachineUsers: int("id_hr_fp_machine_users").references(() => hrFpMachineUsers.idHrFpMachineUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idHrFpMachineTemplate], name: "hr_fp_machine_user_templates_id_hr_fp_machine_template" }),
	]);

export const hrFpMachineUsers = mysqlTable("hr_fp_machine_users", {
	idHrFpMachineUsers: int("id_hr_fp_machine_users").autoincrement().notNull(),
	idHrFpMachines: int("id_hr_fp_machines").notNull().references(() => hrFpMachines.idHrFpMachines),
	machineUserName: varchar("machine_user_name", { length: 128 }),
	machineUserPrivilege: int("machine_user_privilege"),
	machineUserGroup: varchar("machine_user_group", { length: 32 }),
	machineUid: int("machine_uid").notNull(),
	machineUserId: varchar("machine_user_id", { length: 32 }),
	machineUserPassword: varchar("machine_user_password", { length: 45 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).default('0000-00-00 00:00:00').onUpdateNow().notNull(),
	status: mysqlEnum(['active', 'deleted']).default('active'),
},
	(table) => [
		primaryKey({ columns: [table.idHrFpMachineUsers], name: "hr_fp_machine_users_id_hr_fp_machine_users" }),
		unique("ux_machine_user").on(table.idHrFpMachines, table.machineUid),
	]);

export const hrFpMachines = mysqlTable("hr_fp_machines", {
	idHrFpMachines: int("id_hr_fp_machines").autoincrement().notNull(),
	ipAddress: varchar("ip_address", { length: 15 }).notNull(),
	workStationId: int("work_station_id").references(() => hrWorkStation.workStationId),
	remarks: text(),
	idUsers: int("id_users"),
	type: mysqlEnum(['fixed', 'floating']),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	machineSerialNumber: varchar("machine_serial_number", { length: 45 }),
	machineFirmwareVersion: varchar("machine_firmware_version", { length: 45 }),
	machineDeviceName: varchar("machine_device_name", { length: 45 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	machineStatus: mysqlEnum("machine_status", ['active', 'inactive']).default('active').notNull(),
	port: varchar({ length: 6 }).default('4370'),
	currentUserCount: int("current_user_count"),
	maxUserCount: int("max_user_count"),
	currentFingerprintCount: int("current_fingerprint_count"),
	maxFingerprintCount: int("max_fingerprint_count"),
	currentFaceCount: int("current_face_count"),
	maxFaceCount: int("max_face_count"),
	currentAttendanceCount: int("current_attendance_count"),
	maxAttendanceCount: int("max_attendance_count"),
	currentSystemTime: timestamp("current_system_time", { mode: 'string' }),
	lastDataCleaned: timestamp("last_data_cleaned", { mode: 'string' }),
	timeDifference: int("time_difference"),
},
	(table) => [
		primaryKey({ columns: [table.idHrFpMachines], name: "hr_fp_machines_id_hr_fp_machines" }),
		unique("ux_machine_ip").on(table.ipAddress),
	]);

export const hrFpPages = mysqlTable("hr_fp_pages", {
	idHrFpPages: int("id_hr_fp_pages").autoincrement().notNull(),
	idParent: int("id_parent"),
	pageTitle: varchar("page_title", { length: 250 }),
	pageLink: varchar("page_link", { length: 250 }),
	slug: varchar({ length: 250 }),
	menuType: mysqlEnum("menu_type", ['menu', 'sub-menu']).default('menu'),
	sequence: int(),
	isVisible: mysqlEnum("is_visible", ['yes', 'no']).default('yes'),
	icon: varchar({ length: 250 }),
	activeStatus: mysqlEnum("active_status", ['active', 'inactive']).default('active'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrFpPages], name: "hr_fp_pages_id_hr_fp_pages" }),
		unique("slug").on(table.slug),
	]);

export const hrFpUserPermission = mysqlTable("hr_fp_user_permission", {
	idHrFpUsersPermission: int("id_hr_fp_users_permission").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idHrFpPages: int("id_hr_fp_pages").notNull().references(() => hrFpPages.idHrFpPages),
	activeStatus: mysqlEnum("active_status", ['active', 'inactive']).default('active').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("idx_id_inv_pages_permission").on(table.idHrFpPages),
		index("idx_id_users_3").on(table.idUsers),
		primaryKey({ columns: [table.idHrFpUsersPermission], name: "hr_fp_user_permission_id_hr_fp_users_permission" }),
	]);

export const hrGrades = mysqlTable("hr_grades", {
	idGrade: int("id_grade").autoincrement().notNull(),
	gradeName: varchar("grade_name", { length: 200 }).notNull(),
	minRange: double("min_range").notNull(),
	maxRange: double("max_range").notNull(),
	remark: varchar({ length: 200 }),
	idUser: int("id_user").references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idGrade], name: "hr_grades_id_grade" }),
	]);

export const hrGroupSetup = mysqlTable("hr_group_setup", {
	groupId: int("group_id").autoincrement().notNull(),
	groupName: varchar("group_name", { length: 200 }).notNull(),
	groupAddress: text("group_address").notNull(),
	faxNumber: int("fax_number").notNull(),
	groupEmail: varchar("group_email", { length: 200 }).notNull(),
	telephoneNumber: int("telephone_number").notNull(),
	website: varchar({ length: 80 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.groupId], name: "hr_group_setup_group_id" }),
	]);

export const hrHoldingHeads = mysqlTable("hr_holding_heads", {
	idHoldingHeads: int("id_holding_heads").autoincrement().notNull(),
	earningDeductionId: int("earning_deduction_id").notNull(),
	headType: varchar("head_type", { length: 20 }).notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	month: int().notNull(),
	year: int().notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	remarks: varchar({ length: 150 }),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHoldingHeads], name: "hr_holding_heads_id_holding_heads" }),
	]);

export const hrHolidayType = mysqlTable("hr_holiday_type", {
	holidayTypeId: int("holiday_type_id").autoincrement().notNull(),
	holidayTypeName: varchar("holiday_type_name", { length: 200 }).notNull(),
	description: text().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.holidayTypeId], name: "hr_holiday_type_holiday_type_id" }),
	]);

export const hrHolidays = mysqlTable("hr_holidays", {
	idHoliday: int("id_holiday").autoincrement().notNull(),
	idHolidayType: int("id_holiday_type").references(() => hrHolidayType.holidayTypeId),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dates: date({ mode: 'string' }),
	totalDays: int("total_days"),
	remark: text(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUser: int("id_user").references(() => users.idUsers),
	idProject: int("id_project").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_holiday_type").on(table.idHolidayType),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHoliday], name: "hr_holidays_id_holiday" }),
	]);

export const hrIncrementFileImport = mysqlTable("hr_increment_file_import", {
	idIncrementFileImport: int("id_increment_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	fileName: varchar("file_name", { length: 256 }).notNull(),
	totalEntry: int("total_entry").default(0).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }),
	invalidEntry: int("invalid_entry").default(0).notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	duplicateEntry: int("duplicate_entry").default(0).notNull(),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	month: int().notNull(),
	year: int().notNull(),
	newEntry: int("new_entry").default(0).notNull(),
	duplicateIds: text("duplicate_ids"),
	invalidIds: text("invalid_ids"),
	notFound: int("not_found").default(0).notNull(),
	notFoundIds: text("not_found_ids"),
	deleteBy: int("delete_by"),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_project").on(table.idProject),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idIncrementFileImport], name: "hr_increment_file_import_id_increment_file_import" }),
	]);

export const hrIncrementHistory = mysqlTable("hr_increment_history", {
	idHrIncrementHistory: int("id_hr_increment_history").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	incrementPercentage: decimal("increment_percentage", { precision: 5, scale: 2 }).notNull(),
	incrementAmount: decimal("increment_amount", { precision: 7, scale: 2 }).notNull(),
	idHrIncrementFileImport: int("id_hr_increment_file_import"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDate: date("effective_date", { mode: 'string' }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idHrIncrementHistory], name: "hr_increment_history_id_hr_increment_history" }),
	]);

export const hrIncrementRecords = mysqlTable("hr_increment_records", {
	idIncrementRecord: int("id_increment_record").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idHeads: int("id_heads").notNull(),
	headType: mysqlEnum("head_type", ['earning', 'deduction']).default('earning').notNull(),
	incrementAmount: decimal("increment_amount", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }),
	idIncrementFileImport: int("id_increment_file_import").references(() => hrIncrementFileImport.idIncrementFileImport),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_increment_file_import").on(table.idIncrementFileImport),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idIncrementRecord], name: "hr_increment_records_id_increment_record" }),
	]);

export const hrInstitutes = mysqlTable("hr_institutes", {
	idHrInstitutes: int("id_hr_institutes").autoincrement().notNull(),
	instituteType: mysqlEnum("institute_type", ['School', 'College', 'School And College', 'University', 'Technical', 'Madrasha', 'Professional Degree', 'Training']).notNull(),
	instituteName: text("institute_name").notNull(),
	idHrEmployeeEducationFileImport: int("id_hr_employee_education_file_import"),
	idUsers: int("id_users").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idCountry: int("id_country"),
	division: varchar({ length: 255 }),
	idDivision: int("id_division"),
	district: varchar({ length: 255 }),
	idDistricts: int("id_districts"),
	thana: varchar({ length: 255 }),
	eiin: int(),
	villageRoad: varchar("village_road", { length: 255 }),
	postOffice: varchar("post_office", { length: 255 }),
	managementType: mysqlEnum("management_type", ['Govt.', 'Non-Govt', 'Public', 'Private']),
	mobile: varchar({ length: 15 }),
	email: varchar({ length: 255 }),
	remark: text(),
},
	(table) => [
		primaryKey({ columns: [table.idHrInstitutes], name: "hr_institutes_id_hr_institutes" }),
	]);

export const hrJobDescription = mysqlTable("hr_job_description", {
	idJobDescription: int("id_job_description").autoincrement().notNull(),
	jobNo: int("job_no").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	createDate: date("create_date", { mode: 'string' }).notNull(),
	jobTitle: int("job_title").notNull(),
	reportingTo: varchar("reporting_to", { length: 50 }).notNull(),
	grade: varchar({ length: 100 }).notNull(),
	location: int().notNull(),
	qualityParameters: varchar("quality_parameters", { length: 256 }),
	dimensions: varchar({ length: 256 }),
	internalCustomers: varchar("internal_customers", { length: 256 }),
	externalCustomers: varchar("external_customers", { length: 256 }),
	qualifications: varchar({ length: 256 }),
	techSkills: varchar("tech_skills", { length: 256 }),
	softSkills: varchar("soft_skills", { length: 256 }),
	specialRequirements: varchar("special_requirements", { length: 256 }),
	organizationHierarchy: varchar("organization_hierarchy", { length: 256 }),
	accessControl: varchar("access_control", { length: 256 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idJobDescription], name: "hr_job_description_id_job_description" }),
	]);

export const hrJobPerformanceArea = mysqlTable("hr_job_performance_area", {
	idJobPerformanceArea: int("id_job_performance_area").autoincrement().notNull(),
	keyResultArea: varchar("key_result_area", { length: 256 }).notNull(),
	measureOfSuccess: varchar("measure_of_success", { length: 256 }).notNull(),
	idJobDescription: int("id_job_description").notNull().references(() => hrJobDescription.idJobDescription),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_job_description").on(table.idJobDescription),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idJobPerformanceArea], name: "hr_job_performance_area_id_job_performance_area" }),
	]);

export const hrLatePresent = mysqlTable("hr_late_present", {
	latePresentId: int("late_present_id").autoincrement().notNull(),
	salaryVariable: mysqlEnum("salary_variable", ['basic', 'gross']),
	lpPercentage: float("lp_percentage"),
	numberPenaltyDays: int("number_penalty_days"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").references(() => users.idUsers),
	maximumDeductionAmount: decimal("maximum_deduction_amount", { precision: 12, scale: 2 }).notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.latePresentId], name: "hr_late_present_late_present_id" }),
	]);

export const hrLeaveApplication = mysqlTable("hr_leave_application", {
	idLeaveApplication: int("id_leave_application").autoincrement().notNull(),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idDepartment: int("id_department"),
	idLeavePolicy: int("id_leave_policy").references(() => hrLeavePolicy.idLeavePolicy),
	idLeaveType: int("id_leave_type").notNull().references(() => hrLeaveType.idLeaveType),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }).notNull(),
	noOfLeaveDay: float("no_of_leave_day").notNull(),
	weekendHolidayInside: int("weekend_holiday_inside"),
	addressDuringLeave: text("address_during_leave"),
	phoneDuringLeave: varchar("phone_during_leave", { length: 20 }),
	reason: varchar({ length: 25 }),
	reasonDetails: text("reason_details"),
	file: varchar({ length: 250 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user"),
	idPorLeave: int("id_por_leave").references(() => porLeave.idPorLeave),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated', 'denied']).default('activated').notNull(),
	deleteReason: varchar("delete_reason", { length: 256 }),
	originalName: varchar("original_name", { length: 100 }),
	idFiscalYear: int("id_fiscal_year"),
	replacementPerson: int("replacement_person"),
},
	(table) => [
		index("id_employee").on(table.idEmployee),
		index("id_leave_policy").on(table.idLeavePolicy),
		index("id_leave_type").on(table.idLeaveType),
		index("id_por_leave").on(table.idPorLeave),
		index("id_project").on(table.idProject),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idLeaveApplication], name: "hr_leave_application_id_leave_application" }),
	]);

export const hrLeaveApplicationFileImport = mysqlTable("hr_leave_application_file_import", {
	idHrLeaveApplicationFileImport: int("id_hr_leave_application_file_import").autoincrement().notNull(),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: text("original_name"),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrLeaveApplicationFileImport], name: "hr_leave_application_file_import_id_hr_leave_application_file_import" }),
	]);

export const hrLeaveBalance = mysqlTable("hr_leave_balance", {
	idHrLeaveBalance: int("id_hr_leave_balance").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idFiscalYear: int("id_fiscal_year"),
	idLeavePolicy: int("id_leave_policy").notNull().references(() => hrLeavePolicy.idLeavePolicy),
	initialBalance: int("initial_balance").notNull(),
	currentLeaveBalance: decimal("current_leave_balance", { precision: 5, scale: 2 }).notNull(),
	leavePerMonth: decimal("leave_per_month", { precision: 5, scale: 2 }),
	year: int().notNull(),
	month: int().notNull(),
	leaveEnjoyed: int("leave_enjoyed").default(0),
	balanceAdded: decimal("balance_added", { precision: 5, scale: 2 }).default('0.00'),
	remark: varchar({ length: 256 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	pointsPerLeave: decimal("points_per_leave", { precision: 5, scale: 2 }),
	calculatedLeaveBalance: decimal("calculated_leave_balance", { precision: 5, scale: 2 }),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_leave_policy").on(table.idLeavePolicy),
		primaryKey({ columns: [table.idHrLeaveBalance], name: "hr_leave_balance_id_hr_leave_balance" }),
	]);

export const hrLeaveBalanceDetails = mysqlTable("hr_leave_balance_details", {
	idHrLeaveBalanceDetails: int("id_hr_leave_balance_details").autoincrement().notNull(),
	idHrLeaveBalance: int("id_hr_leave_balance").notNull().references(() => hrLeaveBalance.idHrLeaveBalance),
	idLeaveAppOrPayslipOrFileImport: int("id_leave_app_or_payslip_or_file_import").notNull(),
	status: mysqlEnum(['leave_enjoyed', 'payslip_approved', 'file_imported', 'leave_calculated', 'org_setup_input', 'org_setup_input_excel', 'org_setup_update', 'org_setup_update_excel']).notNull(),
	balance: decimal({ precision: 5, scale: 2 }).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users"),
},
	(table) => [
		index("id_hr_leave_balance").on(table.idHrLeaveBalance),
		primaryKey({ columns: [table.idHrLeaveBalanceDetails], name: "hr_leave_balance_details_id_hr_leave_balance_details" }),
	]);

export const hrLeaveBalanceFileImport = mysqlTable("hr_leave_balance_file_import", {
	idLeaveBalanceFileImport: int("id_leave_balance_file_import").autoincrement().notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	newData: int("new_data").notNull(),
	skipData: int("skip_data").notNull(),
	notFoundData: int("not_found_data").notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	notFoundIds: text("not_found_ids"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	importDate: date("import_date", { mode: 'string' }).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	originalName: varchar("original_name", { length: 100 }),
	type: mysqlEnum(['Regular', 'Monthly']).default('Regular').notNull(),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idLeaveBalanceFileImport], name: "hr_leave_balance_file_import_id_leave_balance_file_import" }),
	]);

export const hrLeaveBalanceFreeze = mysqlTable("hr_leave_balance_freeze", {
	idHrLeaveBalanceFreeze: int("id_hr_leave_balance_freeze").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	month: int(),
	year: int(),
	idFiscalYear: int("id_fiscal_year"),
	idLeavePolicy: int("id_leave_policy"),
	freezeBalance: int("freeze_balance"),
	remarks: varchar({ length: 256 }),
},
	(table) => [
		primaryKey({ columns: [table.idHrLeaveBalanceFreeze], name: "hr_leave_balance_freeze_id_hr_leave_balance_freeze" }),
	]);

export const hrLeaveCalculation = mysqlTable("hr_leave_calculation", {
	idLeaveCalculation: int("id_leave_calculation").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull(),
	year: int(),
	idFiscalYear: int("id_fiscal_year"),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }),
},
	(table) => [
		primaryKey({ columns: [table.idLeaveCalculation], name: "hr_leave_calculation_id_leave_calculation" }),
	]);

export const hrLeaveCalculationDetails = mysqlTable("hr_leave_calculation_details", {
	idLeaveCalculationDetails: int("id_leave_calculation_details").autoincrement().notNull(),
	idLeaveCalculation: int("id_leave_calculation").notNull().references(() => hrLeaveCalculation.idLeaveCalculation),
	employeeId: int("employee_id").notNull(),
	idLeavePolicy: int("id_leave_policy").notNull(),
	carryForwardDays: int("carry_forward_days").notNull(),
	leaveEncashedDays: int("leave_encashed_days").default(0).notNull(),
	eligibleLeaveEncashmentDays: int("eligible_leave_encashment_days").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("id_leave_calculation").on(table.idLeaveCalculation),
		primaryKey({ columns: [table.idLeaveCalculationDetails], name: "hr_leave_calculation_details_id_leave_calculation_details" }),
	]);

export const hrLeaveDetails = mysqlTable("hr_leave_details", {
	idHrLeaveDetails: int("id_hr_leave_details").autoincrement().notNull(),
	idLeaveApplication: int("id_leave_application").notNull(),
	leaveCategory: mysqlEnum("leave_category", ['with_pay', 'without_pay']).notNull(),
	approvedDays: float("approved_days").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	leaveDate: date("leave_date", { mode: 'string' }).notNull(),
	deductionAmount: double("deduction_amount", { precision: 12, scale: 2 }).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idPorLeaveDetails: int("id_por_leave_details"),
},
	(table) => [
		primaryKey({ columns: [table.idHrLeaveDetails], name: "hr_leave_details_id_hr_leave_details" }),
	]);

export const hrLeaveDetailsHistory = mysqlTable("hr_leave_details_history", {
	idLeaveDetailsHistory: int("id_leave_details_history").autoincrement().notNull(),
	idHrLeaveDetails: int("id_hr_leave_details").notNull(),
	idLeaveApplication: int("id_leave_application").notNull(),
	leaveCategory: mysqlEnum("leave_category", ['with_pay', 'without_pay']).notNull(),
	approvedDays: float("approved_days").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	leaveDate: date("leave_date", { mode: 'string' }).notNull(),
	deductionAmount: decimal("deduction_amount", { precision: 12, scale: 2 }),
	createDate: timestamp("create_date", { mode: 'string' }),
	updateDate: timestamp("update_date", { mode: 'string' }),
	idPorLeaveDetails: int("id_por_leave_details"),
},
	(table) => [
		primaryKey({ columns: [table.idLeaveDetailsHistory], name: "hr_leave_details_history_id_leave_details_history" }),
	]);

export const hrLeaveEncashment = mysqlTable("hr_leave_encashment", {
	idHrLeaveEncashment: int("id_hr_leave_encashment").autoincrement().notNull(),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	encashmentYear: int("encashment_year").notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idHrLeaveType: int("id_hr_leave_type").notNull().references(() => hrLeaveType.idLeaveType),
	remark: text(),
	idVoucher: int("id_voucher").references(() => accVoucher.idVoucher),
},
	(table) => [
		index("id_hr_leave_type").on(table.idHrLeaveType),
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		index("id_voucher").on(table.idVoucher),
		primaryKey({ columns: [table.idHrLeaveEncashment], name: "hr_leave_encashment_id_hr_leave_encashment" }),
	]);

export const hrLeaveEncashmentDetails = mysqlTable("hr_leave_encashment_details", {
	idHrLeaveEncashmentDetails: int("id_hr_leave_encashment_details").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idHrLeaveEncashment: int("id_hr_leave_encashment").notNull().references(() => hrLeaveEncashment.idHrLeaveEncashment),
	amount: decimal({ precision: 12, scale: 2 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	totalLeaveDays: int("total_leave_days").notNull(),
	totalLeaveEnjoyed: float("total_leave_enjoyed").notNull(),
	totalLeaveRemaining: float("total_leave_remaining").notNull(),
	amountPerDay: decimal("amount_per_day", { precision: 12, scale: 2 }).notNull(),
	payStructureSetupRecordsId: int("pay_structure_setup_records_id").notNull().references(() => hrPayStructureSetupRecords.payStructureSetupRecordsId),
	accountPaid: decimal("account_paid", { precision: 12, scale: 2 }).default('0.00').notNull(),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hr_leave_encashment").on(table.idHrLeaveEncashment),
		index("id_users").on(table.idUsers),
		index("pay_structure_setup_records_id").on(table.payStructureSetupRecordsId),
		primaryKey({ columns: [table.idHrLeaveEncashmentDetails], name: "hr_leave_encashment_details_id_hr_leave_encashment_details" }),
	]);

export const hrLeaveEncashmentHistory = mysqlTable("hr_leave_encashment_history", {
	idLeaveEncashmentHistory: int("id_leave_encashment_history").autoincrement().notNull(),
	idEmployee: int("id_employee").references(() => hrEmployee.employeeId),
	maxAllowableLeave: int("max_allowable_leave"),
	remainingLeave: int("remaining_leave"),
	salary: double(),
	perDayAmount: double("per_day_amount"),
	times: double(),
	needToPay: double("need_to_pay"),
	dateFrom: varchar("date_from", { length: 20 }),
	dateTo: varchar("date_to", { length: 20 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	idUser: int("id_user").references(() => users.idUsers),
	idLeaveType: int("id_leave_type").references(() => hrLeaveType.idLeaveType),
	idProject: int("id_project").references(() => projects.idProjects),
	remark: varchar({ length: 100 }),
	paymentMode: mysqlEnum("payment_mode", ['With payslip', 'Without payslip']),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_employee").on(table.idEmployee),
		index("id_leave_type").on(table.idLeaveType),
		index("id_project").on(table.idProject),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idLeaveEncashmentHistory], name: "hr_leave_encashment_history_id_leave_encashment_history" }),
	]);

export const hrLeaveEncashmentSetup = mysqlTable("hr_leave_encashment_setup", {
	idLeaveEncashmentSetup: int("id_leave_encashment_setup").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idLeaveType: int("id_leave_type").notNull().references(() => hrLeaveType.idLeaveType),
	basicGross: mysqlEnum("basic_gross", ['Basic', 'Gross']).notNull(),
	times: double().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	remark: text(),
	publicationStatus: mysqlEnum("publication_status", ['Active', 'Deactive']).default('Active').notNull(),
	encashmentSetupYear: int("encashment_setup_year").notNull(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_leave_type").on(table.idLeaveType),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idLeaveEncashmentSetup], name: "hr_leave_encashment_setup_id_leave_encashment_setup" }),
	]);

export const hrLeaveHistory = mysqlTable("hr_leave_history", {
	idLeaveHistory: int("id_leave_history").autoincrement().notNull(),
	idLeaveApplication: int("id_leave_application").notNull(),
	oldData: varchar("old_data", { length: 256 }).notNull(),
	newData: varchar("new_data", { length: 256 }).notNull(),
	action: mysqlEnum(['delete', 'edit']).default('edit').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idLeaveHistory], name: "hr_leave_history_id_leave_history" }),
	]);

export const hrLeavePolicy = mysqlTable("hr_leave_policy", {
	idLeavePolicy: int("id_leave_policy").autoincrement().notNull(),
	idLeavePolicyTemplate: int("id_leave_policy_template").notNull().references(() => hrLeavePolicyTemplate.idHrLeavePolicyTemplate),
	idLeaveType: int("id_leave_type").notNull().references(() => hrLeaveType.idLeaveType),
	maxAllowDay: int("max_allow_day").notNull(),
	maxAllowNegativeDay: int("max_allow_negative_day").default(0),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDate: date("effective_date", { mode: 'string' }),
	remark: text(),
	idUser: int("id_user").references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	carryForwardUpTo: int("carry_forward_up_to").default(0),
	leaveEncashmentDays: int("leave_encashment_days").default(0),
	additionalLeaveType: int("additional_leave_type"),
	maxLimit: int("max_limit").default(0),
	monthlyBalanceCalculation: varchar("monthly_balance_calculation", { length: 10 }).notNull(),
	carryForwardLimit: int("carry_forward_limit").notNull(),
	isBridgeExist: mysqlEnum("is_bridge_exist", ['yes', 'no']).default('no').notNull(),
},
	(table) => [
		index("id_leave_policy_template").on(table.idLeavePolicyTemplate),
		index("id_leave_type").on(table.idLeaveType),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idLeavePolicy], name: "hr_leave_policy_id_leave_policy" }),
	]);

export const hrLeavePolicyTemplate = mysqlTable("hr_leave_policy_template", {
	idHrLeavePolicyTemplate: int("id_hr_leave_policy_template").autoincrement().notNull(),
	templateName: varchar("template_name", { length: 100 }).notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	hasMonthlyLeave: mysqlEnum("has_monthly_leave", ['yes', 'no']),
	fileName: text("file_name"),
	originalName: text("original_name"),
},
	(table) => [
		primaryKey({ columns: [table.idHrLeavePolicyTemplate], name: "hr_leave_policy_template_id_hr_leave_policy_template" }),
	]);

export const hrLeavePolicyUpdateHistory = mysqlTable("hr_leave_policy_update_history", {
	idHrLeavePolicyUpdate: int("id_hr_leave_policy_update").autoincrement().notNull(),
	idLeavePolicy: int("id_leave_policy").references(() => hrLeavePolicy.idLeavePolicy),
	newPolicyData: text("new_policy_data"),
	oldPolicyData: text("old_policy_data"),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_leave_policy").on(table.idLeavePolicy),
		primaryKey({ columns: [table.idHrLeavePolicyUpdate], name: "hr_leave_policy_update_history_id_hr_leave_policy_update" }),
	]);

export const hrLeaveType = mysqlTable("hr_leave_type", {
	idLeaveType: int("id_leave_type").autoincrement().notNull(),
	leaveTypeName: varchar("leave_type_name", { length: 200 }).notNull(),
	leaveTypeCategory: mysqlEnum("leave_type_category", ['Regular', 'Special', 'Religious']).notNull(),
	remark: text().notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	religion: varchar({ length: 50 }),
	maxAllowedDays: int("max_allowed_days"),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	deletedBy: int("deleted_by"),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idLeaveType], name: "hr_leave_type_id_leave_type" }),
	]);

export const hrLeaveYear = mysqlTable("hr_leave_year", {
	idLeaveYear: int("id_leave_year").autoincrement().notNull(),
	startMonth: int("start_month").notNull(),
	endMonth: int("end_month").notNull(),
	leaveTenure: int("leave_tenure").default(12).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idLeaveYear], name: "hr_leave_year_id_leave_year" }),
	]);

export const hrLeaveYearHistory = mysqlTable("hr_leave_year_history", {
	idHrLeaveYearHistory: int("id_hr_leave_year_history").autoincrement().notNull(),
	idHrLeaveYear: int("id_hr_leave_year").default(1).notNull().references(() => hrLeaveYear.idLeaveYear),
	previousData: varchar("previous_data", { length: 256 }).notNull(),
	newData: varchar("new_data", { length: 256 }).notNull(),
	previousUser: int("previous_user").notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hr_leave_year").on(table.idHrLeaveYear),
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrLeaveYearHistory], name: "hr_leave_year_history_id_hr_leave_year_history" }),
	]);

export const hrLeavingDates = mysqlTable("hr_leaving_dates", {
	idLeavingDays: int("id_leaving_days").autoincrement().notNull(),
	idLeaveApplication: int("id_leave_application").references(() => hrLeaveApplication.idLeaveApplication),
	idEmployee: int("id_employee").references(() => hrEmployee.employeeId),
	idLeaveType: int("id_leave_type").references(() => hrLeaveType.idLeaveType),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	leavingDate: date("leaving_date", { mode: 'string' }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_employee").on(table.idEmployee),
		index("id_leave_application").on(table.idLeaveApplication),
		index("id_leave_type").on(table.idLeaveType),
		primaryKey({ columns: [table.idLeavingDays], name: "hr_leaving_dates_id_leaving_days" }),
	]);

export const hrLog = mysqlTable("hr_log", {
	idHrLog: int("id_hr_log").autoincrement().notNull(),
	url: varchar({ length: 200 }),
	getData: text("get_data"),
	postData: text("post_data"),
	headerData: text("header_data"),
	idUsers: int("id_users"),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: varchar("user_agent", { length: 200 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	performanceTime: float("performance_time"),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idHrLog], name: "hr_log_id_hr_log" }),
	]);

export const hrManPowerBudget = mysqlTable("hr_man_power_budget", {
	idHrManPowerBudget: int("id_hr_man_power_budget").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	employeeId: int("employee_id").notNull(),
	month: int().notNull(),
	year: int().notNull(),
	monthYear: varchar("month_year", { length: 50 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	earningHeadsId: int("earning_heads_id").notNull().references(() => hrEarningHeads.earningHeadsId),
	proposedAmount: decimal("proposed_amount", { precision: 12, scale: 2 }).notNull(),
	actualAmount: decimal("actual_amount", { precision: 12, scale: 2 }).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idHrManPowerBudgetFileImport: int("id_hr_man_power_budget_file_import").notNull().references(() => hrManPowerBudgetFileImport.idHrManPowerBudgetFileImport),
},
	(table) => [
		index("earning_heads_id").on(table.earningHeadsId),
		index("id_hr_man_power_budget_file_import").on(table.idHrManPowerBudgetFileImport),
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrManPowerBudget], name: "hr_man_power_budget_id_hr_man_power_budget" }),
	]);

export const hrManPowerBudgetFileImport = mysqlTable("hr_man_power_budget_file_import", {
	idHrManPowerBudgetFileImport: int("id_hr_man_power_budget_file_import").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	fileName: varchar("file_name", { length: 150 }).notNull(),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	month: int().notNull(),
	year: int().notNull(),
	monthYear: varchar("month_year", { length: 50 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	earningHeadsId: int("earning_heads_id").notNull(),
	deletedBy: int("deleted_by"),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrManPowerBudgetFileImport], name: "hr_man_power_budget_file_import_id_hr_man_power_budget_file_import" }),
	]);

export const hrManualOvertime = mysqlTable("hr_manual_overtime", {
	overtimeEntryId: int("overtime_entry_id").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	manualOtStart: float("manual_ot_start"),
	manualOtEnd: float("manual_ot_end"),
	otAmount: decimal("ot_amount", { precision: 12, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	otDate: date("ot_date", { mode: 'string' }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	otHourWorked: decimal("ot_hour_worked", { precision: 12, scale: 2 }).notNull(),
	file: varchar({ length: 100 }),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	budgetConnection: mysqlEnum("budget_connection", ['yes', 'no']).default('no'),
	idHrManualOvertimeEntry: int("id_hr_manual_overtime_entry").notNull().references(() => hrManualOvertimeEntry.idHrManualOvertimeEntry),
	otRate: decimal("ot_rate", { precision: 12, scale: 2 }).notNull(),
	employeeSalaryInfoId: int("employee_salary_info_id").notNull().references(() => hrEmployeeSalaryInfo.employeeSalaryInfoId),
	idHrOvertimeFileImport: int("id_hr_overtime_file_import").references(() => hrOvertimeFileImport.idHrOvertimeFileImport),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("employee_salary_info_id").on(table.employeeSalaryInfoId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_hr_manual_overtime_entry").on(table.idHrManualOvertimeEntry),
		index("id_hr_overtime_file_import").on(table.idHrOvertimeFileImport),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.overtimeEntryId], name: "hr_manual_overtime_overtime_entry_id" }),
	]);

export const hrManualOvertimeEntry = mysqlTable("hr_manual_overtime_entry", {
	idHrManualOvertimeEntry: int("id_hr_manual_overtime_entry").autoincrement().notNull(),
	paymentStatus: mysqlEnum("payment_status", ['Partial', 'Completed', 'Pending']).default('Pending').notNull(),
	idVoucher: int("id_voucher").references(() => accVoucher.idVoucher),
	accountPaid: decimal("account_paid", { precision: 12, scale: 2 }).default('0.00').notNull(),
	due: decimal({ precision: 12, scale: 2 }).notNull(),
	totalOtAmount: decimal("total_ot_amount", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	entryType: mysqlEnum("entry_type", ['daily', 'monthly']).default('daily').notNull(),
	paymentType: varchar("payment_type", { length: 30 }).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_project").on(table.idProject),
		index("id_voucher").on(table.idVoucher),
		primaryKey({ columns: [table.idHrManualOvertimeEntry], name: "hr_manual_overtime_entry_id_hr_manual_overtime_entry" }),
	]);

export const hrManualOvertimeHistory = mysqlTable("hr_manual_overtime_history", {
	idManualOvertimeHistory: int("id_manual_overtime_history").autoincrement().notNull(),
	overtimeEntryId: int("overtime_entry_id").notNull().references(() => hrManualOvertime.overtimeEntryId),
	previousData: longtext("previous_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	previousIdUser: int("previous_id_user").notNull().references(() => users.idUsers),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("employee_id").on(table.employeeId),
		index("overtime_entry_id").on(table.overtimeEntryId),
		index("previous_id_user").on(table.previousIdUser),
		primaryKey({ columns: [table.idManualOvertimeHistory], name: "hr_manual_overtime_history_id_manual_overtime_history" }),
	]);

export const hrMenu = mysqlTable("hr_menu", {
	idHrMenu: int("id_hr_menu").autoincrement().notNull(),
	menu: varchar({ length: 30 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	idUser: int("id_user").references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrMenu], name: "hr_menu_id_hr_menu" }),
	]);

export const hrMenuSubmenu = mysqlTable("hr_menu_submenu", {
	idMenuSubmenu: int("id_menu_submenu").autoincrement().notNull(),
	submenu: varchar({ length: 100 }),
	submenuUrl: varchar("submenu_url", { length: 50 }).notNull(),
	idHrMenu: int("id_hr_menu").notNull().references(() => hrMenu.idHrMenu),
	controllerMethod: varchar("controller_method", { length: 300 }),
	status: mysqlEnum(['active', 'deactive']).default('active'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	serialNo: int("serial_no"),
},
	(table) => [
		index("id_hr_menu").on(table.idHrMenu),
		primaryKey({ columns: [table.idMenuSubmenu], name: "hr_menu_submenu_id_menu_submenu" }),
	]);

export const hrMobileBankingDetails = mysqlTable("hr_mobile_banking_details", {
	idHrMobileBankingDetails: int("id_hr_mobile_banking_details").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	mobileBankingType: varchar("mobile_banking_type", { length: 50 }).notNull(),
	mobileBankingDetails: varchar("mobile_banking_details", { length: 500 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrMobileBankingDetails], name: "hr_mobile_banking_details_id_hr_mobile_banking_details" }),
	]);

export const hrMonthlyLeaveBalance = mysqlTable("hr_monthly_leave_balance", {
	idHrMonthlyLeaveBalance: int("id_hr_monthly_leave_balance").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	idBusinessUnit: int("id_business_unit").notNull(),
	month: int().notNull(),
	year: int().notNull(),
	idFiscalYear: int("id_fiscal_year"),
	carryForwardBalance: int("carry_forward_balance").default(0).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	remark: text(),
	idLeaveBalanceFileImport: int("id_leave_balance_file_import"),
	eligibleCarryForwardBalance: int("eligible_carry_forward_balance").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrMonthlyLeaveBalance], name: "hr_monthly_leave_balance_id_hr_monthly_leave_balance" }),
	]);

export const hrMonthlyLeaveFileUploads = mysqlTable("hr_monthly_leave_file_uploads", {
	idHrMonthlyLeaveFileUpload: int("id_hr_monthly_leave_file_upload").autoincrement().notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }).notNull(),
	idBusinessUnit: int("id_business_unit").notNull(),
	totalData: int("total_data"),
	insertData: int("insert_data").notNull(),
	notFoundData: int("not_found_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	type: mysqlEnum(['Monthly', 'Compensatory']).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrMonthlyLeaveFileUpload], name: "hr_monthly_leave_file_uploads_id_hr_monthly_leave_file_upload" }),
	]);

export const hrMonthlyLeaveSettings = mysqlTable("hr_monthly_leave_settings", {
	idMonthlyLeaveSetting: int("id_monthly_leave_setting").autoincrement().notNull(),
	idProjects: int("id_projects").notNull(),
	attendanceRequired: mysqlEnum("attendance_required", ['yes', 'no']).default('no').notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idMonthlyLeaveSetting], name: "hr_monthly_leave_settings_id_monthly_leave_setting" }),
	]);

export const hrOrganizationSetup = mysqlTable("hr_organization_setup", {
	organizationSetupId: int("organization_setup_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	reportingSupervisorId: int("reporting_supervisor_id").references(() => hrEmployee.employeeId),
	deptHeadId: int("dept_head_id").references(() => hrEmployee.employeeId),
	companySetupId: int("company_setup_id").notNull().references(() => companies.idCompanies),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	employeeDesigId: int("employee_desig_id").notNull().references(() => hrDesignationMaster.designationId),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	idGrade: int("id_grade"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	joiningDate: date("joining_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDate: date("effective_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	actualJoiningDate: date("actual_joining_date", { mode: 'string' }),
	workStationId: int("work_station_id").notNull().references(() => hrWorkStation.workStationId),
	idEmployeeNatureType: int("id_employee_nature_type").notNull().references(() => hrEmployeeNatureType.idEmployeeNatureType),
	shiftId: int("shift_id").references(() => hrShiftMaster.shiftId),
	lineSupervisorId: int("line_supervisor_id").references(() => hrEmployee.employeeId),
	lineSupervisorDesigId: int("line_supervisor_desig_id").references(() => hrDesignationMaster.designationId),
	reportingSupervisorDesigId: int("reporting_supervisor_desig_id").references(() => hrDesignationMaster.designationId),
	offNumber: varchar("off_number", { length: 50 }),
	offEmail: varchar("off_email", { length: 80 }),
	bankId: int("bank_id"),
	branchId: int("branch_id"),
	bankRoutingNumber: varchar("bank_routing_number", { length: 30 }),
	equivalentDesignationId: int("equivalent_designation_id").references(() => hrEquivalentDesignation.equivalentDesignationId),
	offAccNum: varchar("off_acc_num", { length: 80 }).default('NULL'),
	workingStatus: mysqlEnum("working_status", ['Working', 'Resigned', 'Retired', 'Terminated', 'Dismissal', 'JV', 'LWI', 'Discharged', 'Salary Hold', 'Long Leave']).notNull(),
	managementType: mysqlEnum("management_type", ['Non Management', 'Management', 'MAX Worker']).notNull(),
	skillStatus: varchar("skill_status", { length: 100 }),
	skillConfirmedBy: int("skill_confirmed_by"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUsers: int("id_users").notNull(),
	idHrEmployeeCostCenterSetup: int("id_hr_employee_cost_center_setup"),
	portalAccess: mysqlEnum("portal_access", ['Yes', 'No']).default('No').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	resignDate: date("resign_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	resignSubmissionDate: date("resign_submission_date", { mode: 'string' }),
	mobileBankingNumber: varchar("mobile_banking_number", { length: 45 }),
	timePeriod: int("time_period"),
	mobileBankingTypeId: int("mobile_banking_type_id"),
	idHrOrganizationSetupFileImport: int("id_hr_organization_setup_file_import"),
	idHrOrganizationSetupFileImportUpdate: int("id_hr_organization_setup_file_import_update"),
	salaryHoldReason: text("salary_hold_reason"),
	overheadStatus: mysqlEnum("overhead_status", ['Yes', 'No']),
	separationPayableDays: double("separation_payable_days", { precision: 12, scale: 2 }),
	remark: text(),
	manualAttendance: mysqlEnum("manual_attendance", ['Yes', 'No']).default('No').notNull(),
	idHrLeavePolicyTemplate: int("id_hr_leave_policy_template").notNull(),
	idSubFunction: int("id_sub_function").references(() => hrDepartments.idDepartment),
	idHrProfessionType: int("id_hr_profession_type").notNull().references(() => hrProfessionType.idHrProfessionType),
	workScope: text("work_scope"),
	mobileBalanceLimit: double("mobile_balance_limit", { precision: 12, scale: 2 }).notNull(),
	isRoasterShifting: mysqlEnum("is_roaster_shifting", ['Yes', 'No']).default('No').notNull(),
	lateDeductionType: mysqlEnum("late_deduction_type", ['General', 'Special', 'Eight Hours']).default('General').notNull(),
	idBonusCostCenterSetup: int("id_bonus_cost_center_setup"),
	isContinueService: mysqlEnum("is_continue_service", ['Yes', 'No']).default('No'),
	worksForBuId: int("works_for_bu_id").references(() => projects.idProjects),
	porPayStrcShow: mysqlEnum("por_pay_strc_show", ['Yes', 'No']).default('No').notNull(),
	manualTaxCalculation: mysqlEnum("manual_tax_calculation", ['Yes', 'No']).default('No').notNull(),
	hrAbsentTemplateId: int("hr_absent_template_id").notNull(),
	taxStartFiscalYearId: int("tax_start_fiscal_year_id"),
	highestEducationLevelId: int("highest_education_level_id"),
	educationRemark: text("education_remark"),
},
	(table) => [
		index("company_setup_id").on(table.companySetupId),
		index("fk_organization_setup_departments1_idx").on(table.idDepartment),
		index("fk_organization_setup_designation_master1_idx").on(table.employeeDesigId),
		index("fk_organization_setup_designation_master2_idx").on(table.lineSupervisorDesigId),
		index("fk_organization_setup_designation_master3_idx").on(table.reportingSupervisorDesigId),
		index("fk_organization_setup_employee1_idx").on(table.employeeId),
		index("fk_organization_setup_employee2_idx").on(table.lineSupervisorId),
		index("fk_organization_setup_employee3_idx").on(table.reportingSupervisorId),
		index("fk_organization_setup_employee4_idx").on(table.deptHeadId),
		index("fk_organization_setup_employee_nature_type1_idx").on(table.idEmployeeNatureType),
		index("fk_organization_setup_equivalent_designation1_idx").on(table.equivalentDesignationId),
		index("fk_organization_setup_shift_master1_idx").on(table.shiftId),
		index("fk_organization_setup_work_station1_idx").on(table.workStationId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_hr_profession_type").on(table.idHrProfessionType),
		index("id_sub_function").on(table.idSubFunction),
		index("works_for_bu_id").on(table.worksForBuId),
		primaryKey({ columns: [table.organizationSetupId], name: "hr_organization_setup_organization_setup_id" }),
	]);

export const hrOrganizationSetupChangeRecords = mysqlTable("hr_organization_setup_change_records", {
	idHrOrganizationSetupChangeRecords: int("id_hr_organization_setup_change_records").autoincrement().notNull(),
	organizationSetupId: int("organization_setup_id").notNull().references(() => hrOrganizationSetup.organizationSetupId),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	columnName: mysqlEnum("column_name", ['working_status', 'is_continue_service']).notNull(),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	remark: text(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_users").on(table.idUsers),
		index("organization_setup_id").on(table.organizationSetupId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.idHrOrganizationSetupChangeRecords], name: "hr_organization_setup_change_records_id_hr_organization_setup_change_records" }),
	]);

export const hrOrganizationSetupFileImport = mysqlTable("hr_organization_setup_file_import", {
	idHrOrganizationSetupFileImport: int("id_hr_organization_setup_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	dataType: mysqlEnum("data_type", ['Insert', 'Update', 'Cost Center Salary', 'Cost Center Bonus', 'Cost Center Salary & Bonus']).notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	invalidIds: text("invalid_ids"),
	requiredIds: text("required_ids"),
	invalidManagementTypeIds: text("invalid_management_type_ids"),
	invalidWorkingStatusIds: text("invalid_working_status_ids"),
	invalidNatureIds: text("invalid_nature_ids"),
	invalidJoinningIds: text("invalid_joinning_ids"),
	invalidEffectiveIds: text("invalid_effective_ids"),
	invalidJoinningEffectiveIds: text("invalid_joinning_effective_ids"),
	invalidMobileNoIds: text("invalid_mobile_no_ids"),
	invalidBranchIds: text("invalid_branch_ids"),
	invalidBankIds: text("invalid_bank_ids"),
	invalidMobileBankingIds: text("invalid_mobile_banking_ids"),
	invalidBankingIds: text("invalid_banking_ids"),
	alreadySetupIds: text("already_setup_ids"),
	alreadyUseMobileBankingIds: text("already_use_mobile_banking_ids"),
	alreadyUseEmailIds: text("already_use_email_ids"),
	alreadyUseBankAccNumberIds: text("already_use_bank_acc_number_ids"),
	deletedBy: int("deleted_by"),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idHrOrganizationSetupFileImport], name: "hr_organization_setup_file_import_id_hr_organization_setup_file_import" }),
	]);

export const hrOrganizationSetupHistory = mysqlTable("hr_organization_setup_history", {
	organizationSetupHistoryId: int("organization_setup_history_id").autoincrement().notNull(),
	organizationSetupId: int("organization_setup_id").notNull().references(() => hrOrganizationSetup.organizationSetupId),
	previousData: longtext("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	employeeCustomId: int("employee_custom_id"),
	idHrOrganizationSetupFileImport: int("id_hr_organization_setup_file_import"),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	remark: text(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("employee_id").on(table.employeeId),
		index("organization_setup_id").on(table.organizationSetupId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.organizationSetupHistoryId], name: "hr_organization_setup_history_organization_setup_history_id" }),
	]);

export const hrOutstationFileImport = mysqlTable("hr_outstation_file_import", {
	idHrOutstationFileImport: int("id_hr_outstation_file_import").autoincrement().notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }).notNull(),
	validEntry: int("valid_entry").notNull(),
	invalidEntry: int("invalid_entry").default(0),
	invalidEntries: text("invalid_entries"),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idBusinessUnit: int("id_business_unit").notNull(),
	siteVisits: int("site_visits").default(0).notNull(),
	workFromHomes: int("work_from_homes").default(0).notNull(),
	officialVisits: int("official_visits").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrOutstationFileImport], name: "hr_outstation_file_import_id_hr_outstation_file_import" }),
	]);

export const hrOutstationHistory = mysqlTable("hr_outstation_history", {
	idHrOutstationHistory: int("id_hr_outstation_history").autoincrement().notNull(),
	idAttendance: int("id_attendance").notNull(),
	idUser: int("id_user").notNull(),
	oldData: text("old_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrOutstationHistory], name: "hr_outstation_history_id_hr_outstation_history" }),
	]);

export const hrOverStaySetupFileImport = mysqlTable("hr_over_stay_setup_file_import", {
	idHrOverStaySetupFileImport: int("id_hr_over_stay_setup_file_import").autoincrement().notNull(),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrOverStaySetupFileImport], name: "hr_over_stay_setup_file_import_id_hr_over_stay_setup_file_import" }),
	]);

export const hrOverstayEntryMonthly = mysqlTable("hr_overstay_entry_monthly", {
	idOverstayEntryMonthly: int("id_overstay_entry_monthly").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	overstayDays: int("overstay_days").notNull(),
	overstayAmount: decimal("overstay_amount", { precision: 12, scale: 2 }).notNull(),
	year: int().notNull(),
	month: int().notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	amountPerDay: decimal("amount_per_day", { precision: 12, scale: 2 }).notNull(),
	employeeSalaryInfoId: int("employee_salary_info_id").notNull().references(() => hrEmployeeSalaryInfo.employeeSalaryInfoId),
	entryType: mysqlEnum("entry_type", ['monthly_entry', 'excel_entry']).default('monthly_entry').notNull(),
	idVoucher: int("id_voucher").references(() => accVoucher.idVoucher),
	accountPaid: decimal("account_paid", { precision: 12, scale: 2 }).default('0.00').notNull(),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	idHrOverstayFileImport: int("id_hr_overstay_file_import").references(() => hrOverstayFileImport.idHrOverstayFileImport),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("employee_salary_info_id").on(table.employeeSalaryInfoId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_hr_overstay_file_import").on(table.idHrOverstayFileImport),
		index("id_voucher").on(table.idVoucher),
		primaryKey({ columns: [table.idOverstayEntryMonthly], name: "hr_overstay_entry_monthly_id_overstay_entry_monthly" }),
	]);

export const hrOverstayEntryMonthlyHistory = mysqlTable("hr_overstay_entry_monthly_history", {
	idOverstayEntryMonthlyHistory: int("id_overstay_entry_monthly_history").autoincrement().notNull(),
	idOverstayEntryMonthly: int("id_overstay_entry_monthly").notNull().references(() => hrOverstayEntryMonthly.idOverstayEntryMonthly),
	previousData: longtext("previous_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	previousIdUser: int("previous_id_user").notNull().references(() => users.idUsers),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("employee_id").on(table.employeeId),
		index("id_overstay_entry_monthly").on(table.idOverstayEntryMonthly),
		index("previous_id_user").on(table.previousIdUser),
		primaryKey({ columns: [table.idOverstayEntryMonthlyHistory], name: "hr_overstay_entry_monthly_history_id_overstay_entry_monthly_history" }),
	]);

export const hrOverstayFileImport = mysqlTable("hr_overstay_file_import", {
	idHrOverstayFileImport: int("id_hr_overstay_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	totalInsert: int("total_insert").default(0).notNull(),
	totalDuplicate: int("total_duplicate").default(0).notNull(),
	totalNoEmployee: int("total_no_employee").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	totalNoSetup: int("total_no_setup").default(0).notNull(),
	duplicateIds: text("duplicate_ids"),
	noSetupIds: text("no_setup_ids"),
	noEmployeeOfficeId: text("no_employee_office_id"),
	deletedBy: int("deleted_by"),
	invalidDaysIds: text("invalid_days_ids"),
	totalInvalidDaysId: int("total_invalid_days_id").default(0).notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrOverstayFileImport], name: "hr_overstay_file_import_id_hr_overstay_file_import" }),
	]);

export const hrOverstaySetup = mysqlTable("hr_overstay_setup", {
	overstaySetupId: int("overstay_setup_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	overstayAmount: decimal("overstay_amount", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	overstayTemplateId: int("overstay_template_id").notNull().references(() => hrOverstayTemplate.overstayTemplateId),
	idHrOverStaySetupFileImport: int("id_hr_over_stay_setup_file_import"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_project").on(table.idProject),
		index("id_users").on(table.idUsers),
		index("overstay_template_id").on(table.overstayTemplateId),
		primaryKey({ columns: [table.overstaySetupId], name: "hr_overstay_setup_overstay_setup_id" }),
	]);

export const hrOverstaySetupHistory = mysqlTable("hr_overstay_setup_history", {
	idOverstaySetupHistory: int("id_overstay_setup_history").autoincrement().notNull(),
	overstaySetupId: int("overstay_setup_id").notNull().references(() => hrOverstaySetup.overstaySetupId),
	overstayTemplateId: int("overstay_template_id").notNull().references(() => hrOverstayTemplate.overstayTemplateId),
	previousData: longtext("previous_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	previousIdUser: int("previous_id_user").notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("employee_id").on(table.employeeId),
		index("overstay_setup_id").on(table.overstaySetupId),
		index("overstay_template_id").on(table.overstayTemplateId),
		primaryKey({ columns: [table.idOverstaySetupHistory], name: "hr_overstay_setup_history_id_overstay_setup_history" }),
	]);

export const hrOverstayTemplate = mysqlTable("hr_overstay_template", {
	overstayTemplateId: int("overstay_template_id").autoincrement().notNull(),
	overstayTemplateName: varchar("overstay_template_name", { length: 200 }).notNull(),
	multiplyVariable: double("multiply_variable"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").references(() => users.idUsers),
	overstayType: mysqlEnum("overstay_type", ['Fixed', 'Variable']).notNull(),
	flatAmount: decimal("flat_amount", { precision: 12, scale: 2 }),
	overstayCategory: mysqlEnum("overstay_category", ['pay_structure', 'different']).notNull(),
	grossPercentage: decimal("gross_percentage", { precision: 5, scale: 2 }),
	salaryVariable: mysqlEnum("salary_variable", ['gross', 'basic']),
	monthlyDay: int("monthly_day"),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.overstayTemplateId], name: "hr_overstay_template_overstay_template_id" }),
	]);

export const hrOvertime = mysqlTable("hr_overtime", {
	overtimeId: int("overtime_id").autoincrement().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	overtimeTemplateId: int("overtime_template_id").notNull().references(() => hrOvertimeTemplate.overtimeTemplateId),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	hourlyOtRate: decimal("hourly_ot_rate", { precision: 12, scale: 2 }).notNull(),
	idHrOvertimeSetupFileImport: int("id_hr_overtime_setup_file_import"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_project").on(table.idProject),
		index("id_users").on(table.idUsers),
		index("overtime_template_id").on(table.overtimeTemplateId),
		primaryKey({ columns: [table.overtimeId], name: "hr_overtime_overtime_id" }),
	]);

export const hrOvertimeFileImport = mysqlTable("hr_overtime_file_import", {
	idHrOvertimeFileImport: int("id_hr_overtime_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	totalInsert: int("total_insert").default(0).notNull(),
	totalDuplicate: int("total_duplicate").default(0).notNull(),
	totalNoEmployee: int("total_no_employee").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	totalNoSetup: int("total_no_setup").default(0).notNull(),
	duplicateIds: text("duplicate_ids"),
	noSetupIds: text("no_setup_ids"),
	noEmployeeOfficeId: text("no_employee_office_id"),
	deletedBy: int("deleted_by"),
	invalidDaysIds: text("invalid_days_ids"),
	totalInvalidDaysId: int("total_invalid_days_id").default(0).notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrOvertimeFileImport], name: "hr_overtime_file_import_id_hr_overtime_file_import" }),
	]);

export const hrOvertimeHistory = mysqlTable("hr_overtime_history", {
	idOvertimeHistory: int("id_overtime_history").autoincrement().notNull(),
	overtimeId: int("overtime_id").notNull().references(() => hrOvertime.overtimeId),
	overtimeTemplateId: int("overtime_template_id").notNull().references(() => hrOvertimeTemplate.overtimeTemplateId),
	previousData: longtext("previous_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	changesBy: int("changes_by").notNull(),
	previousIdUser: int("previous_id_user").notNull().references(() => users.idUsers),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("overtime_id").on(table.overtimeId),
		index("overtime_template_id").on(table.overtimeTemplateId),
		index("previous_id_user").on(table.previousIdUser),
		primaryKey({ columns: [table.idOvertimeHistory], name: "hr_overtime_history_id_overtime_history" }),
	]);

export const hrOvertimeSetupFileImport = mysqlTable("hr_overtime_setup_file_import", {
	idHrOvertimeSetupFileImport: int("id_hr_overtime_setup_file_import").autoincrement().notNull(),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrOvertimeSetupFileImport], name: "hr_overtime_setup_file_import_id_hr_overtime_setup_file_import" }),
	]);

export const hrOvertimeTemplate = mysqlTable("hr_overtime_template", {
	overtimeTemplateId: int("overtime_template_id").autoincrement().notNull(),
	overtimeTemplateName: varchar("overtime_template_name", { length: 200 }).notNull(),
	workingHourMonth: int("working_hour_month"),
	multiplyVariable: double("multiply_variable"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").references(() => users.idUsers),
	overtimeType: mysqlEnum("overtime_type", ['Fixed', 'Variable']).notNull(),
	flatAmount: decimal("flat_amount", { precision: 12, scale: 2 }),
	overtimeCategory: mysqlEnum("overtime_category", ['pay_structure', 'different']).notNull(),
	grossPercentage: decimal("gross_percentage", { precision: 12, scale: 2 }),
	salaryVariable: mysqlEnum("salary_variable", ['gross', 'basic']),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.overtimeTemplateId], name: "hr_overtime_template_overtime_template_id" }),
	]);

export const hrPagePermission = mysqlTable("hr_page_permission", {
	idPagePermission: int("id_page_permission").autoincrement().notNull(),
	idMenuSubmenu: int("id_menu_submenu").notNull().references(() => hrMenuSubmenu.idMenuSubmenu),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idProject: int("id_project").references(() => projects.idProjects),
	idUserPermittedBy: int("id_user_permitted_by").notNull().references(() => users.idUsers),
	status: mysqlEnum(['active', 'deactive']),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_menu_submenu").on(table.idMenuSubmenu),
		index("id_project").on(table.idProject),
		index("id_user").on(table.idUser),
		index("id_user_permitted_by").on(table.idUserPermittedBy),
		primaryKey({ columns: [table.idPagePermission], name: "hr_page_permission_id_page_permission" }),
	]);

export const hrPaySlipAccountsPayment = mysqlTable("hr_pay_slip_accounts_payment", {
	idHrPaySlipAccountsPayment: int("id_hr_pay_slip_accounts_payment").autoincrement().notNull(),
	idPaySlipGeneration: int("id_pay_slip_generation").notNull(),
	idVoucher: int("id_voucher").notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdate: timestamp("date_update", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idHrPaySlipAccountsPayment], name: "hr_pay_slip_accounts_payment_id_hr_pay_slip_accounts_payment" }),
	]);

export const hrPaySlipAccountsPaymentDetails = mysqlTable("hr_pay_slip_accounts_payment_details", {
	idHrPaySlipAccountsPaymentDetails: int("id_hr_pay_slip_accounts_payment_details").autoincrement().notNull(),
	idHrPaySlipAccountsPayment: int("id_hr_pay_slip_accounts_payment").notNull(),
	idCcBusinessUnit: int("id_cc_business_unit").notNull(),
	idVoucher: int("id_voucher").notNull(),
	amount: decimal({ precision: 8, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	paymentDate: date("payment_date", { mode: 'string' }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idHrPaySlipAccountsPaymentDetails], name: "hr_pay_slip_accounts_payment_details_id_hr_pay_slip_accounts_payment_details" }),
	]);

export const hrPaySlipDetailsIndividualHistory = mysqlTable("hr_pay_slip_details_individual_history", {
	individualPaySlipHistoryId: int("individual_pay_slip_history_id").autoincrement().notNull(),
	paySlipGenerationId: int("pay_slip_generation_id").notNull().references(() => hrPaySlipGeneration.paySlipGenerationId),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	previousData: mediumtext("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("pay_slip_generation_id").on(table.paySlipGenerationId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.individualPaySlipHistoryId], name: "hr_pay_slip_details_individual_history_individual_pay_slip_history_id" }),
	]);

export const hrPaySlipEmployeeInfo = mysqlTable("hr_pay_slip_employee_info", {
	idPaySlipEmployeeInfo: int("id_pay_slip_employee_info").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	employeeDesigId: int("employee_desig_id").notNull().references(() => hrDesignationMaster.designationId),
	idDepartment: int("id_department"),
	idGrade: int("id_grade"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDate: date("effective_date", { mode: 'string' }).notNull(),
	workStationId: int("work_station_id").notNull().references(() => hrWorkStation.workStationId),
	idEmployeeNatureType: int("id_employee_nature_type").notNull().references(() => hrEmployeeNatureType.idEmployeeNatureType),
	bankId: int("bank_id"),
	branchId: int("branch_id"),
	equivalentDesignationId: int("equivalent_designation_id"),
	offAccNum: varchar("off_acc_num", { length: 80 }),
	bankRoutingNumber: varchar("bank_routing_number", { length: 30 }),
	workingStatus: mysqlEnum("working_status", ['Working', 'Resigned', 'Retired', 'Terminated', 'Dismissal', 'JV', 'LWI', 'Discharged', 'Salary Hold', 'Long Leave']).notNull(),
	skillStatus: varchar("skill_status", { length: 100 }),
	skillConfirmedBy: int("skill_confirmed_by"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	mobileBankingNumber: varchar("mobile_banking_number", { length: 45 }),
	idPaySlipGeneration: int("id_pay_slip_generation").notNull().references(() => hrPaySlipGeneration.paySlipGenerationId),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	companySetupId: int("company_setup_id"),
	mobileBankingTypeId: int("mobile_banking_type_id"),
	overheadStatus: mysqlEnum("overhead_status", ['Yes', 'No']),
	idHrEmployeeCostCenterSetup: int("id_hr_employee_cost_center_setup"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	joiningDate: date("joining_date", { mode: 'string' }).notNull(),
	managementType: mysqlEnum("management_type", ['Non Management', 'Management', 'MAX Worker']).notNull(),
	manualAttendance: mysqlEnum("manual_attendance", ['Yes', 'No']).notNull(),
	offNumber: varchar("off_number", { length: 50 }),
	offEmail: varchar("off_email", { length: 80 }),
	idHrLeavePolicyTemplate: int("id_hr_leave_policy_template").notNull(),
	idSubFunction: int("id_sub_function"),
	idHrProfessionType: int("id_hr_profession_type").notNull(),
	shiftId: int("shift_id"),
	timePeriod: int("time_period"),
	reportingSupervisorId: int("reporting_supervisor_id"),
	lineSupervisorId: int("line_supervisor_id"),
	deptHeadId: int("dept_head_id"),
	workScope: text("work_scope"),
	mobileBalanceLimit: double("mobile_balance_limit", { precision: 12, scale: 2 }),
	isRoasterShifting: mysqlEnum("is_roaster_shifting", ['Yes', 'No']).notNull(),
	lateDeductionType: mysqlEnum("late_deduction_type", ['General', 'Special', 'Eight Hours']).notNull(),
	idBonusCostCenterSetup: int("id_bonus_cost_center_setup"),
	isContinueService: mysqlEnum("is_continue_service", ['Yes', 'No']),
	worksForBuId: int("works_for_bu_id"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	actualJoiningDate: date("actual_joining_date", { mode: 'string' }),
	porPayStrcShow: mysqlEnum("por_pay_strc_show", ['Yes', 'No']),
	manualTaxCalculation: mysqlEnum("manual_tax_calculation", ['Yes', 'No']).notNull(),
	hrAbsentTemplateId: int("hr_absent_template_id"),
},
	(table) => [
		index("bank_id").on(table.bankId),
		index("branch_id").on(table.branchId),
		index("company_setup_id").on(table.companySetupId),
		index("fk_organization_setup_designation_master1_idx").on(table.employeeDesigId),
		index("fk_organization_setup_employee1_idx").on(table.employeeId),
		index("fk_organization_setup_employee_nature_type1_idx").on(table.idEmployeeNatureType),
		index("fk_organization_setup_equivalent_designation1_idx").on(table.equivalentDesignationId),
		index("fk_organization_setup_work_station1_idx").on(table.workStationId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_grade").on(table.idGrade),
		index("id_pay_slip_generation").on(table.idPaySlipGeneration),
		index("mobile_banking_type_id").on(table.mobileBankingTypeId),
		primaryKey({ columns: [table.idPaySlipEmployeeInfo], name: "hr_pay_slip_employee_info_id_pay_slip_employee_info" }),
	]);

export const hrPaySlipGeneration = mysqlTable("hr_pay_slip_generation", {
	paySlipGenerationId: int("pay_slip_generation_id").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	description: text().notNull(),
	month: int().notNull(),
	year: int().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	budgetConnection: mysqlEnum("budget_connection", ['yes', 'no']).default('no').notNull(),
	idVoucher: int("id_voucher").references(() => accVoucher.idVoucher),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved']).default('Pending').notNull(),
	idCalendarSetup: int("id_calendar_setup").notNull().references(() => hrCalendarSetup.idCalendarSetup),
	approverId: int("approver_id").references(() => users.idUsers),
	accountantId: int("accountant_id").references(() => users.idUsers),
	totalDays: int("total_days").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	disbursementDate: date("disbursement_date", { mode: 'string' }),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_calendar_setup").on(table.idCalendarSetup),
		index("id_users").on(table.idUsers),
		index("id_voucher").on(table.idVoucher),
		primaryKey({ columns: [table.paySlipGenerationId], name: "hr_pay_slip_generation_pay_slip_generation_id" }),
	]);

export const hrPaySlipGenerationDetails = mysqlTable("hr_pay_slip_generation_details", {
	generationDetailsId: int("generation_details_id").autoincrement().notNull(),
	paySlipGenerationId: int("pay_slip_generation_id").notNull().references(() => hrPaySlipGeneration.paySlipGenerationId),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idHeads: int("id_heads"),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	month: int().notNull(),
	year: int().notNull(),
	amount: decimal({ precision: 12, scale: 2 }).notNull(),
	headName: varchar("head_name", { length: 150 }).notNull(),
	headType: varchar("head_type", { length: 150 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
},
	(table) => [
		index("fk_generation_details_employee1_idx").on(table.employeeId),
		index("fk_generation_details_pay_slip_generation1_idx").on(table.paySlipGenerationId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.generationDetailsId], name: "hr_pay_slip_generation_details_generation_details_id" }),
	]);

export const hrPaySlipGenerationDetailsHistory = mysqlTable("hr_pay_slip_generation_details_history", {
	generationDetailsHistoryId: int("generation_details_history_id").autoincrement().notNull(),
	paySlipGenerationId: int("pay_slip_generation_id").notNull().references(() => hrPaySlipGeneration.paySlipGenerationId),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull(),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("pay_slip_generation_id").on(table.paySlipGenerationId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.generationDetailsHistoryId], name: "hr_pay_slip_generation_details_history_generation_details_history_id" }),
	]);

export const hrPaySlipGenerationHistory = mysqlTable("hr_pay_slip_generation_history", {
	paySlipGenerationHistoryId: int("pay_slip_generation_history_id").autoincrement().notNull(),
	paySlipGenerationId: int("pay_slip_generation_id").notNull().references(() => hrPaySlipGeneration.paySlipGenerationId),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['approve', 'delete']).default('delete').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updaetDate: timestamp("updaet_date", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		index("pay_slip_generation_id").on(table.paySlipGenerationId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.paySlipGenerationHistoryId], name: "hr_pay_slip_generation_history_pay_slip_generation_history_id" }),
	]);

export const hrPaySlipGenerationInfo = mysqlTable("hr_pay_slip_generation_info", {
	idPaySlipGenerationInfo: int("id_pay_slip_generation_info").autoincrement().notNull(),
	paySlipGenerationId: int("pay_slip_generation_id").notNull().references(() => hrPaySlipGeneration.paySlipGenerationId),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	totalEarning: decimal("total_earning", { precision: 12, scale: 2 }).notNull(),
	totalDeduction: decimal("total_deduction", { precision: 12, scale: 2 }).notNull(),
	netPayable: decimal("net_payable", { precision: 12, scale: 2 }).notNull(),
	paidAmount: decimal("paid_amount", { precision: 12, scale: 2 }).default('0.00').notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	totalBasic: decimal("total_basic", { precision: 12, scale: 2 }).default('0.00').notNull(),
	totalGross: decimal("total_gross", { precision: 12, scale: 2 }).default('0.00').notNull(),
	totalCtc: decimal("total_ctc", { precision: 12, scale: 2 }).default('0.00').notNull(),
	taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default('0.00'),
	othersDeduction: decimal("others_deduction", { precision: 12, scale: 2 }).default('0.00'),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_users").on(table.idUsers),
		index("pay_slip_generation_id").on(table.paySlipGenerationId),
		primaryKey({ columns: [table.idPaySlipGenerationInfo], name: "hr_pay_slip_generation_info_id_pay_slip_generation_info" }),
	]);

export const hrPaySlipGenerationSplitCostCenter = mysqlTable("hr_pay_slip_generation_split_cost_center", {
	generationSplitCostCenterId: int("generation_split_cost_center_id").autoincrement().notNull(),
	paySlipGenerationId: int("pay_slip_generation_id").notNull(),
	costCenterBusinessUnitId: int("cost_center_business_unit_id").notNull(),
	idCostCenter: int("id_cost_center").notNull(),
	employeeId: int("employee_id").notNull(),
	percentage: float().notNull(),
	amount: decimal({ precision: 12, scale: 2 }).notNull(),
	headType: varchar("head_type", { length: 150 }).notNull(),
	idHeads: int("id_heads").notNull(),
},
	(table) => [
		index("fk_generation_details_employee1_idx").on(table.employeeId),
		index("fk_generation_details_pay_slip_generation1_idx").on(table.paySlipGenerationId),
		index("id_business_unit").on(table.costCenterBusinessUnitId),
		index("id_cost_center").on(table.idCostCenter),
		index("pay_slip_generation_id").on(table.paySlipGenerationId),
		primaryKey({ columns: [table.generationSplitCostCenterId], name: "hr_pay_slip_generation_split_cost_center_generation_split_cost_center_id" }),
	]);

export const hrPaySlipGenerationVouchers = mysqlTable("hr_pay_slip_generation_vouchers", {
	idPaySlipGenerationVoucher: int("id_pay_slip_generation_voucher").autoincrement().notNull(),
	idPaySlipGeneration: int("id_pay_slip_generation").notNull(),
	idVoucher: int("id_voucher").notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	amount: decimal({ precision: 12, scale: 2 }).notNull(),
	idCostCenterBusinessUnit: int("id_cost_center_business_unit").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPaySlipGenerationVoucher], name: "hr_pay_slip_generation_vouchers_id_pay_slip_generation_voucher" }),
	]);

export const hrPayStructureAmountUpdateHistory = mysqlTable("hr_pay_structure_amount_update_history", {
	idHrPayStructureAmountUpdateHistory: int("id_hr_pay_structure_amount_update_history").autoincrement().notNull(),
	payStructureSetupId: int("pay_structure_setup_id").notNull().references(() => hrPayStructureSetup.payStructureSetupId),
	previousAmount: double("previous_amount", { precision: 12, scale: 2 }).notNull(),
	updatedAmount: double("updated_amount", { precision: 12, scale: 2 }).notNull(),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("pay_structure_setup_id").on(table.payStructureSetupId),
		primaryKey({ columns: [table.idHrPayStructureAmountUpdateHistory], name: "hr_pay_structure_amount_update_history_id_hr_pay_structure_amount_update_history" }),
	]);

export const hrPayStructureIncrementRecords = mysqlTable("hr_pay_structure_increment_records", {
	idHrPayStructureIncrementRecord: int("id_hr_pay_structure_increment_record").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	idProjects: int("id_projects").notNull(),
	updatedPayStructureSetupRecordsId: int("updated_pay_structure_setup_records_id").notNull(),
	prevPayStructureSetupRecordsId: int("prev_pay_structure_setup_records_id").notNull(),
	updatedBasic: decimal("updated_basic", { precision: 10, scale: 2 }).notNull(),
	updatedMedical: decimal("updated_medical", { precision: 10, scale: 2 }).notNull(),
	updatedHouse: decimal("updated_house", { precision: 10, scale: 2 }).notNull(),
	updatedConveyance: decimal("updated_conveyance", { precision: 10, scale: 2 }).notNull(),
	updatedGrossSalary: decimal("updated_gross_salary", { precision: 10, scale: 2 }).notNull(),
	prevBasic: decimal("prev_basic", { precision: 10, scale: 2 }).notNull(),
	prevMedical: decimal("prev_medical", { precision: 10, scale: 2 }).notNull(),
	prevHouse: decimal("prev_house", { precision: 10, scale: 2 }).notNull(),
	prevConveyance: decimal("prev_conveyance", { precision: 10, scale: 2 }).notNull(),
	prevGrossSalary: decimal("prev_gross_salary", { precision: 10, scale: 2 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	remarks: varchar({ length: 256 }),
	idUsers: int("id_users").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrPayStructureIncrementRecord], name: "hr_pay_structure_increment_records_id_hr_pay_structure_increment_record" }),
	]);

export const hrPayStructureRecordsHistory = mysqlTable("hr_pay_structure_records_history", {
	payStructureRecordsHistoryId: int("pay_structure_records_history_id").autoincrement().notNull(),
	payStructureSetupRecordsId: int("pay_structure_setup_records_id").notNull(),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.payStructureRecordsHistoryId], name: "hr_pay_structure_records_history_pay_structure_records_history_id" }),
	]);

export const hrPayStructureSetup = mysqlTable("hr_pay_structure_setup", {
	payStructureSetupId: int("pay_structure_setup_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	payStructureTemplateDetailsId: int("pay_structure_template_details_id").notNull().references(() => hrPayStructureTemplateDetails.payStructureTemplateDetailsId),
	headsAmount: decimal("heads_amount", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	month: int().notNull(),
	year: int().notNull(),
	payStructureSetupRecordsId: int("pay_structure_setup_records_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	idHrPayStructureSetupFileImport: int("id_hr_pay_structure_setup_file_import"),
},
	(table) => [
		index("fk_pay_structure_setup_employee1_idx").on(table.employeeId),
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_users").on(table.idUsers),
		index("pay_structure_template_details_id").on(table.payStructureTemplateDetailsId),
		primaryKey({ columns: [table.payStructureSetupId], name: "hr_pay_structure_setup_pay_structure_setup_id" }),
	]);

export const hrPayStructureSetupFileImport = mysqlTable("hr_pay_structure_setup_file_import", {
	idHrPayStructureSetupFileImport: int("id_hr_pay_structure_setup_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }),
	invalidIds: text("invalid_ids"),
	requiredIds: text("required_ids"),
	invalidFiscalYearIds: text("invalid_fiscal_year_ids"),
	invalidEffectiveMonthIds: text("invalid_effective_month_ids"),
	invalidBasicSalaryMismatchIds: text("invalid_basic_salary_mismatch_ids"),
	invalidTemplateIds: text("invalid_template_ids"),
	invalidPayStructureTypeSetupIds: text("invalid_pay_structure_type_setup_ids"),
	invalidRemarksIds: text("invalid_remarks_ids"),
	invalidBasicSalaryColumnIds: text("invalid_basic_salary_column_ids"),
	invalidEarningColumnIds: text("invalid_earning_column_ids"),
	invalidDeductionColumnIds: text("invalid_deduction_column_ids"),
	finalError: text("final_error"),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idHrPayStructureSetupFileImport], name: "hr_pay_structure_setup_file_import_id_hr_pay_structure_setup_file_import" }),
	]);

export const hrPayStructureSetupHistory = mysqlTable("hr_pay_structure_setup_history", {
	payStructureSetupHistoryId: int("pay_structure_setup_history_id").autoincrement().notNull(),
	payStructureSetupRecordsId: int("pay_structure_setup_records_id").notNull().references(() => hrPayStructureSetupRecords.payStructureSetupRecordsId),
	previousData: longtext("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("pay_structure_setup_records_id").on(table.payStructureSetupRecordsId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.payStructureSetupHistoryId], name: "hr_pay_structure_setup_history_pay_structure_setup_history_id" }),
	]);

export const hrPayStructureSetupRecords = mysqlTable("hr_pay_structure_setup_records", {
	payStructureSetupRecordsId: int("pay_structure_setup_records_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	month: int().notNull(),
	year: int().notNull(),
	payStructureTemplateId: int("pay_structure_template_id").notNull(),
	basicSalary: decimal("basic_salary", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	incrementFileImportId: int("increment_file_import_id"),
	isIncrement: mysqlEnum("is_increment", ['yes', 'no']).default('no').notNull(),
	incrementType: mysqlEnum("increment_type", ['General', 'Special']),
	payStructureChangeType: mysqlEnum("pay_structure_change_type", ['Regular Increment', 'Special Increment', 'TAX Changes', 'Other Allowances Changes', 'New Setup']),
	remarks: text(),
	idHrPayStructureSetupFileImport: int("id_hr_pay_structure_setup_file_import"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.payStructureSetupRecordsId], name: "hr_pay_structure_setup_records_pay_structure_setup_records_id" }),
	]);

export const hrPayStructureTemplate = mysqlTable("hr_pay_structure_template", {
	payStructureTemplateId: int("pay_structure_template_id").autoincrement().notNull(),
	payStructureTemplateName: varchar("pay_structure_template_name", { length: 200 }).notNull(),
	primaryEarningsHeadId: int("primary_earnings_head_id").notNull().references(() => hrEarningHeads.earningHeadsId),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("fk_pay_structure_template_earning_heads1_idx").on(table.primaryEarningsHeadId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.payStructureTemplateId], name: "hr_pay_structure_template_pay_structure_template_id" }),
	]);

export const hrPayStructureTemplateDetails = mysqlTable("hr_pay_structure_template_details", {
	payStructureTemplateDetailsId: int("pay_structure_template_details_id").autoincrement().notNull(),
	payStructureTemplateId: int("pay_structure_template_id").notNull().references(() => hrPayStructureTemplate.payStructureTemplateId),
	headType: varchar("head_type", { length: 150 }).notNull(),
	earningDeductionHeadsId: int("earning_deduction_heads_id").notNull(),
	headsRatioType: varchar("heads_ratio_type", { length: 150 }).notNull(),
	headsAmount: decimal("heads_amount", { precision: 12, scale: 2 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("fk_pay_structure_template_details1_idx").on(table.payStructureTemplateId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.payStructureTemplateDetailsId], name: "hr_pay_structure_template_details_pay_structure_template_details_id" }),
	]);

export const hrPayStructureTemplateDetailsHistory = mysqlTable("hr_pay_structure_template_details_history", {
	payStructureTemplateDetailsHistoryId: int("pay_structure_template_details_history_id").autoincrement().notNull(),
	payStructureTemplateId: int("pay_structure_template_id").notNull().references(() => hrPayStructureTemplate.payStructureTemplateId),
	previousData: mediumtext("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by").on(table.changesBy),
		index("pay_structure_template_id").on(table.payStructureTemplateId),
		index("previous_id_users").on(table.changesTo, table.previousIdUsers),
		primaryKey({ columns: [table.payStructureTemplateDetailsHistoryId], name: "hr_pay_structure_template_details_history_pay_structure_template_details_history_id" }),
	]);

export const hrPayStructureTemplateHistory = mysqlTable("hr_pay_structure_template_history", {
	payStructureTemplateHistoryId: int("pay_structure_template_history_id").autoincrement().notNull(),
	payStructureTemplateId: int("pay_structure_template_id").notNull().references(() => hrPayStructureTemplate.payStructureTemplateId),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by_id_users").on(table.changesBy),
		index("pay_structure_template_id").on(table.payStructureTemplateId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.payStructureTemplateHistoryId], name: "hr_pay_structure_template_history_pay_structure_template_history_id" }),
	]);

export const hrPayStructureVariableInput = mysqlTable("hr_pay_structure_variable_input", {
	payStructureVariableInputId: int("pay_structure_variable_input_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	month: int().notNull(),
	year: int().notNull(),
	monthYear: varchar("month_year", { length: 50 }).notNull(),
	headType: varchar("head_type", { length: 150 }).notNull(),
	earningDeductionHeadsId: int("earning_deduction_heads_id").notNull(),
	headsAmount: decimal("heads_amount", { precision: 12, scale: 2 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	remarks: varchar({ length: 150 }),
	idHrVariableInputFileImport: int("id_hr_variable_input_file_import"),
},
	(table) => [
		index("fk_pay_structure_variable_input_employee1_idx").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.payStructureVariableInputId], name: "hr_pay_structure_variable_input_pay_structure_variable_input_id" }),
	]);

export const hrPayment = mysqlTable("hr_payment", {
	idHrPayment: int("id_hr_payment").autoincrement().notNull(),
	referenceType: varchar("reference_type", { length: 50 }).notNull(),
	paymentType: mysqlEnum("payment_type", ['cash', 'bank', 'beftn', 'rtgs', 'pay_order']).notNull(),
	idLedger: int("id_ledger").notNull().references(() => accLedgers.idLedgers),
	idVoucher: int("id_voucher"),
	idVoucherBankBook: int("id_voucher_bank_book"),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	paymentReceiptType: mysqlEnum("payment_receipt_type", ['payment', 'receipt']).default('payment').notNull(),
	entryType: mysqlEnum("entry_type", ['single_entry', 'bulk_entry']).default('single_entry').notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	deletedBy: int("deleted_by"),
},
	(table) => [
		index("id_ledger").on(table.idLedger),
		index("id_users").on(table.idUsers),
		index("id_voucher").on(table.idVoucher),
		index("id_voucher_bank_book").on(table.idVoucherBankBook),
		primaryKey({ columns: [table.idHrPayment], name: "hr_payment_id_hr_payment" }),
	]);

export const hrPaymentDetails = mysqlTable("hr_payment_details", {
	idHrPaymentDetails: int("id_hr_payment_details").autoincrement().notNull(),
	idHrPayment: int("id_hr_payment").notNull(),
	idEmployee: int("id_employee").notNull(),
	paymentAmount: decimal("payment_amount", { precision: 12, scale: 2 }).notNull(),
	idReference: int("id_reference").notNull(),
	idReferenceDetails: int("id_reference_details"),
},
	(table) => [
		primaryKey({ columns: [table.idHrPaymentDetails], name: "hr_payment_details_id_hr_payment_details" }),
	]);

export const hrPortalAccessRecords = mysqlTable("hr_portal_access_records", {
	idPortalAccessRecords: int("id_portal_access_records").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	action: varchar({ length: 100 }).notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idPortalAccessRecords], name: "hr_portal_access_records_id_portal_access_records" }),
	]);

export const hrPrefix = mysqlTable("hr_prefix", {
	prefixId: int("prefix_id").autoincrement().notNull(),
	projectId: int("project_id").notNull().references(() => projects.idProjects),
	prefixName: varchar("prefix_name", { length: 50 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		index("project_id").on(table.projectId),
		primaryKey({ columns: [table.prefixId], name: "hr_prefix_prefix_id" }),
	]);

export const hrPresentCompany = mysqlTable("hr_present_company", {
	idPresentCompany: int("id_present_company").autoincrement().notNull(),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	idEmployeeCustom: varchar("id_employee_custom", { length: 50 }),
	idCompany: int("id_company").notNull(),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	lastWorkingDate: date("last_working_date", { mode: 'string' }),
	idReportingPerson: int("id_reporting_person").notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idGrade: int("id_grade").notNull().references(() => hrGrades.idGrade),
	idDesignation: int("id_designation").notNull().references(() => hrDesignationMaster.designationId),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_department").on(table.idDepartment),
		index("id_designation").on(table.idDesignation),
		index("id_employee").on(table.idEmployee),
		index("id_grades").on(table.idGrade),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idPresentCompany], name: "hr_present_company_id_present_company" }),
	]);

export const hrPresentOffdayFileImport = mysqlTable("hr_present_offday_file_import", {
	idHrPresentOffdayFileImport: int("id_hr_present_offday_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	totalInsert: int("total_insert").default(0).notNull(),
	totalDuplicate: int("total_duplicate").default(0).notNull(),
	totalNoEmployee: int("total_no_employee").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	totalNoSetup: int("total_no_setup").default(0).notNull(),
	duplicateIds: text("duplicate_ids"),
	noSetupIds: text("no_setup_ids"),
	noEmployeeOfficeId: text("no_employee_office_id"),
	deletedBy: int("deleted_by"),
	invalidDaysIds: text("invalid_days_ids"),
	totalInvalidDaysId: int("total_invalid_days_id").default(0).notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idHrPresentOffdayFileImport], name: "hr_present_offday_file_import_id_hr_present_offday_file_import" }),
	]);

export const hrPresentOffdayMaster = mysqlTable("hr_present_offday_master", {
	presentOffdayId: int("present_offday_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	presentOffdayTemplateId: int("present_offday_template_id").notNull().references(() => hrPresentOffdayTemplate.presentOffdayTemplateId),
	presentOffDayAmount: decimal("present_off_day_amount", { precision: 12, scale: 2 }).default('0.00'),
	idHrPresentOffdaySetupFileImport: int("id_hr_present_offday_setup_file_import"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_project").on(table.idProject),
		index("id_users").on(table.idUsers),
		index("present_offday_template_id").on(table.presentOffdayTemplateId),
		primaryKey({ columns: [table.presentOffdayId], name: "hr_present_offday_master_present_offday_id" }),
	]);

export const hrPresentOffdayMasterHistory = mysqlTable("hr_present_offday_master_history", {
	idPresentOffdayMasterHistory: int("id_present_offday_master_history").autoincrement().notNull(),
	presentOffdayId: int("present_offday_id").notNull().references(() => hrPresentOffdayMaster.presentOffdayId),
	presentOffdayTemplateId: int("present_offday_template_id").notNull().references(() => hrPresentOffdayTemplate.presentOffdayTemplateId),
	previousData: longtext("previous_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	previousIdUser: int("previous_id_user").notNull().references(() => users.idUsers),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by_id_user").on(table.changesBy),
		index("employee_id").on(table.employeeId),
		index("present_offday_id").on(table.presentOffdayId),
		index("present_offday_template_id").on(table.presentOffdayTemplateId),
		index("previous_id_user").on(table.previousIdUser),
		primaryKey({ columns: [table.idPresentOffdayMasterHistory], name: "hr_present_offday_master_history_id_present_offday_master_history" }),
	]);

export const hrPresentOffdayMonthly = mysqlTable("hr_present_offday_monthly", {
	idPresentOffdayMonthly: int("id_present_offday_monthly").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	poDays: int("po_days").notNull(),
	poAmount: decimal("po_amount", { precision: 12, scale: 2 }).notNull(),
	year: int().notNull(),
	month: int().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	amountPerDay: decimal("amount_per_day", { precision: 12, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	poDate: date("po_date", { mode: 'string' }).notNull(),
	entryType: mysqlEnum("entry_type", ['single_entry', 'monthly_entry', 'excel_entry']).default('monthly_entry').notNull(),
	employeeSalaryInfoId: int("employee_salary_info_id").notNull(),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	idVoucher: int("id_voucher"),
	accountPaid: decimal("account_paid", { precision: 12, scale: 2 }).default('0.00').notNull(),
	idHrPresentOffdayFileImport: int("id_hr_present_offday_file_import").references(() => hrPresentOffdayFileImport.idHrPresentOffdayFileImport),
	idPorCompensatoryLeave: int("id_por_compensatory_leave"),
	remarks: text(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_hr_present_offday_file_import").on(table.idHrPresentOffdayFileImport),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idPresentOffdayMonthly], name: "hr_present_offday_monthly_id_present_offday_monthly" }),
	]);

export const hrPresentOffdayMonthlyHistory = mysqlTable("hr_present_offday_monthly_history", {
	idPresentOffdayMonthlyHistory: int("id_present_offday_monthly_history").autoincrement().notNull(),
	idPresentOffdayMonthly: int("id_present_offday_monthly").notNull(),
	previousData: longtext("previous_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	previousIdUser: int("previous_id_user").notNull().references(() => users.idUsers),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete', 'entry']).notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("fk_hr_present_offday_monthly_history_id_employee1_idx").on(table.employeeId),
		index("fk_hr_present_offday_monthly_history_id_users1_idx").on(table.changesBy),
		index("fk_hr_present_offday_monthly_history_id_users2_idx").on(table.previousIdUser),
		primaryKey({ columns: [table.idPresentOffdayMonthlyHistory], name: "hr_present_offday_monthly_history_id_present_offday_monthly_history" }),
	]);

export const hrPresentOffdaySetupFileImport = mysqlTable("hr_present_offday_setup_file_import", {
	idHrPresentOffdaySetupFileImport: int("id_hr_present_offday_setup_file_import").autoincrement().notNull(),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	deletedBy: int("deleted_by"),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrPresentOffdaySetupFileImport], name: "hr_present_offday_setup_file_import_id_hr_present_offday_setup_file_import" }),
	]);

export const hrPresentOffdayTemplate = mysqlTable("hr_present_offday_template", {
	presentOffdayTemplateId: int("present_offday_template_id").autoincrement().notNull(),
	presentOffdayTemplateName: varchar("present_offday_template_name", { length: 200 }).notNull(),
	multiplyVariable: double("multiply_variable"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").references(() => users.idUsers),
	presentOffdayType: mysqlEnum("present_offday_type", ['Fixed', 'Variable']).notNull(),
	flatAmount: decimal("flat_amount", { precision: 12, scale: 2 }),
	presentOffdayCategory: mysqlEnum("present_offday_category", ['pay_structure', 'different']).notNull(),
	grossPercentage: decimal("gross_percentage", { precision: 5, scale: 2 }),
	salaryVariable: mysqlEnum("salary_variable", ['gross', 'basic']),
	monthlyDay: int("monthly_day"),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.presentOffdayTemplateId], name: "hr_present_offday_template_present_offday_template_id" }),
	]);

export const hrProfessionType = mysqlTable("hr_profession_type", {
	idHrProfessionType: int("id_hr_profession_type").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	professionType: varchar("profession_type", { length: 50 }).notNull(),
	professionTypeDetails: varchar("profession_type_details", { length: 500 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrProfessionType], name: "hr_profession_type_id_hr_profession_type" }),
	]);

export const hrProjectHolidays = mysqlTable("hr_project_holidays", {
	idProjectHolidays: int("id_project_holidays").autoincrement().notNull(),
	idHoliday: int("id_holiday").notNull(),
	idProject: int("id_project").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	deletedBy: int("deleted_by"),
},
	(table) => [
		primaryKey({ columns: [table.idProjectHolidays], name: "hr_project_holidays_id_project_holidays" }),
	]);

export const hrProjectPermission = mysqlTable("hr_project_permission", {
	idProjectPermission: int("id_project_permission").autoincrement().notNull(),
	idProject: int("id_project").references(() => projects.idProjects),
	idUser: int("id_user").references(() => users.idUsers),
	idUserPermittedBy: int("id_user_permitted_by"),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_project").on(table.idProject),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idProjectPermission], name: "hr_project_permission_id_project_permission" }),
	]);

export const hrProjectwiseRoleAssign = mysqlTable("hr_projectwise_role_assign", {
	idHrProjectwiseRoleAssign: int("id_hr_projectwise_role_assign").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	type: mysqlEnum(['Leave', 'Certificate', 'Outstation', 'Attendance']).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrProjectwiseRoleAssign], name: "hr_projectwise_role_assign_id_hr_projectwise_role_assign" }),
	]);

export const hrProjectwiseTemplateAssign = mysqlTable("hr_projectwise_template_assign", {
	idHrProjectwiseTemplateAssign: int("id_hr_projectwise_template_assign").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	templateType: mysqlEnum("template_type", ['Overtime', 'Present Offday', 'Night Stay', 'Leave Policy', 'Provident Fund']).default('Overtime').notNull(),
	templateId: int("template_id").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("fk_projectwise_template_assign_business_unit1_idx").on(table.idBusinessUnit),
		index("fk_projectwise_template_assign_users1_idx").on(table.idUsers),
		primaryKey({ columns: [table.idHrProjectwiseTemplateAssign], name: "hr_projectwise_template_assign_id_hr_projectwise_template_assign" }),
	]);

export const hrPromotionInfo = mysqlTable("hr_promotion_info", {
	idHrPromotionInfo: int("id_hr_promotion_info").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idDesignation: int("id_designation").notNull().references(() => hrDesignationMaster.designationId),
	idEquivalentDesignation: int("id_equivalent_designation").references(() => hrEquivalentDesignation.equivalentDesignationId),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	approvalDate: date("approval_date", { mode: 'string' }).notNull(),
	idPrevCompany: int("id_prev_company").references(() => companies.idCompanies),
	idPrevBusinessUnit: int("id_prev_business_unit").references(() => projects.idProjects),
	idPrevDepartment: int("id_prev_department").references(() => hrDepartments.idDepartment),
	idPrevDesignation: int("id_prev_designation").references(() => hrDesignationMaster.designationId),
	idPrevEquivalentDesignation: int("id_prev_equivalent_designation"),
	idUsers: int("id_users").references(() => users.idUsers),
	remark: text(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	fileName: text("file_name"),
	originalName: text("original_name"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_designation").on(table.idDesignation),
		index("id_equivalent_designation").on(table.idEquivalentDesignation),
		index("id_prev_business_unit").on(table.idPrevBusinessUnit),
		index("id_prev_company").on(table.idPrevCompany),
		index("id_prev_department").on(table.idPrevDepartment),
		index("id_prev_designation").on(table.idPrevDesignation),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrPromotionInfo], name: "hr_promotion_info_id_hr_promotion_info" }),
	]);

export const hrProvidentFundDetails = mysqlTable("hr_provident_fund_details", {
	idHrProvidentFundDetails: int("id_hr_provident_fund_details").autoincrement().notNull(),
	idHrProvidentFundSetup: int("id_hr_provident_fund_setup").notNull().references(() => hrProvidentFundSetup.idHrProvidentFundSetup),
	idHrProvidentFundTemplate: int("id_hr_provident_fund_template").notNull().references(() => hrProvidentFundTemplate.idHrProvidentFundTemplate),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	paySlipGenerationId: int("pay_slip_generation_id").notNull().references(() => hrPaySlipGeneration.paySlipGenerationId),
	generationDetailsId: int("generation_details_id").notNull().references(() => hrPaySlipGenerationDetails.generationDetailsId),
	idPaySlipGenerationInfo: int("id_pay_slip_generation_info").notNull().references(() => hrPaySlipGenerationInfo.idPaySlipGenerationInfo),
	currentAmount: double("current_amount", { precision: 12, scale: 2 }),
	pfAmount: double("pf_amount", { precision: 12, scale: 2 }).notNull(),
	month: int().notNull(),
	year: int().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("generation_details_id").on(table.generationDetailsId),
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_hr_provident_fund_setup").on(table.idHrProvidentFundSetup),
		index("id_hr_provident_fund_template").on(table.idHrProvidentFundTemplate),
		index("id_pay_slip_generation_info").on(table.idPaySlipGenerationInfo),
		index("id_users").on(table.idUsers),
		index("pay_slip_generation_id").on(table.paySlipGenerationId),
		primaryKey({ columns: [table.idHrProvidentFundDetails], name: "hr_provident_fund_details_id_hr_provident_fund_details" }),
	]);

export const hrProvidentFundSetup = mysqlTable("hr_provident_fund_setup", {
	idHrProvidentFundSetup: int("id_hr_provident_fund_setup").autoincrement().notNull(),
	idHrProvidentFundTemplate: int("id_hr_provident_fund_template").notNull().references(() => hrProvidentFundTemplate.idHrProvidentFundTemplate),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	setupType: mysqlEnum("setup_type", ['New', 'Continuous']).notNull(),
	openingBalance: double("opening_balance", { precision: 12, scale: 2 }).notNull(),
	openingMonth: int("opening_month").notNull(),
	finalAmount: double("final_amount", { precision: 12, scale: 2 }).notNull(),
	totalMonth: int("total_month").notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idHrProvidentFundSetupFileImport: int("id_hr_provident_fund_setup_file_import"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hr_provident_fund_template").on(table.idHrProvidentFundTemplate),
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrProvidentFundSetup], name: "hr_provident_fund_setup_id_hr_provident_fund_setup" }),
	]);

export const hrProvidentFundSetupFileImport = mysqlTable("hr_provident_fund_setup_file_import", {
	idHrProvidentFundSetupFileImport: int("id_hr_provident_fund_setup_file_import").autoincrement().notNull(),
	idProjects: int("id_projects").notNull(),
	totalData: int("total_data").notNull(),
	validEntry: int("valid_entry").notNull(),
	idUsers: int("id_users").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: text("original_name").notNull(),
	deletedBy: int("deleted_by").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrProvidentFundSetupFileImport], name: "hr_provident_fund_setup_file_import_id_hr_provident_fund_setup_file_import" }),
	]);

export const hrProvidentFundTemplate = mysqlTable("hr_provident_fund_template", {
	idHrProvidentFundTemplate: int("id_hr_provident_fund_template").autoincrement().notNull(),
	templateName: text("template_name").notNull(),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	salaryType: mysqlEnum("salary_type", ['Basic', 'Gross', 'CTC']).notNull(),
	salaryPercentage: int("salary_percentage").notNull(),
	deductionPercentage: int("deduction_percentage").notNull(),
	incentivePercentage: int("incentive_percentage").notNull(),
	minimumEligibleYear: double("minimum_eligible_year", { precision: 12, scale: 2 }).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrProvidentFundTemplate], name: "hr_provident_fund_template_id_hr_provident_fund_template" }),
	]);

export const hrRecruitments = mysqlTable("hr_recruitments", {
	idHrRecruitment: int("id_hr_recruitment").notNull(),
	idPorJobRequisitionDetails: int("id_por_job_requisition_details").notNull(),
	employeeId: int("employee_id").notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idHrRecruitment], name: "hr_recruitments_id_hr_recruitment" }),
	]);

export const hrReference = mysqlTable("hr_reference", {
	idHrReference: int("id_hr_reference").autoincrement().notNull(),
	referrerId: int("referrer_id"),
	referrerName: varchar("referrer_name", { length: 50 }).notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	referrerDesignation: varchar("referrer_designation", { length: 50 }).notNull(),
	referrerDepartment: varchar("referrer_department", { length: 50 }).notNull(),
	referrerOrganization: varchar("referrer_organization", { length: 50 }).notNull(),
	referrerContact: varchar("referrer_contact", { length: 20 }),
	isInternal: mysqlEnum("is_internal", ['yes', 'no']).default('yes').notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	relation: varchar({ length: 150 }),
	referenceNumber: varchar("reference_number", { length: 50 }),
	remarks: varchar({ length: 255 }),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrReference], name: "hr_reference_id_hr_reference" }),
	]);

export const hrRosterPlan = mysqlTable("hr_roster_plan", {
	idRosterPlan: int("id_roster_plan").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	shiftId: int("shift_id").notNull(),
	idRosterPlanFileUpload: int("id_roster_plan_file_upload").notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	deletedBy: int("deleted_by"),
},
	(table) => [
		primaryKey({ columns: [table.idRosterPlan], name: "hr_roster_plan_id_roster_plan" }),
	]);

export const hrRosterPlanFileUpload = mysqlTable("hr_roster_plan_file_upload", {
	idRosterPlanFileUpload: int("id_roster_plan_file_upload").autoincrement().notNull(),
	idUser: int("id_user").notNull(),
	title: varchar({ length: 100 }).notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }).notNull(),
	validData: int("valid_data").notNull(),
	invalidData: int("invalid_data").default(0),
	totalData: int("total_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	invalidEntries: text("invalid_entries"),
	skippedData: int("skipped_data").default(0).notNull(),
	skippedEntries: text("skipped_entries"),
},
	(table) => [
		primaryKey({ columns: [table.idRosterPlanFileUpload], name: "hr_roster_plan_file_upload_id_roster_plan_file_upload" }),
	]);

export const hrSalaryBusinessUnit = mysqlTable("hr_salary_business_unit", {
	salaryBusinessUnitId: int("salary_business_unit_id").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	bankId: int("bank_id").notNull().references(() => banksOriginal.idBanks),
	branchId: int("branch_id").notNull().references(() => hrBankBranchMaster.branchId),
	accountNumber: varchar("account_number", { length: 100 }).notNull(),
	description: text().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("bank_id").on(table.bankId),
		index("branch_id").on(table.branchId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.salaryBusinessUnitId], name: "hr_salary_business_unit_salary_business_unit_id" }),
	]);

export const hrShiftMaster = mysqlTable("hr_shift_master", {
	shiftId: int("shift_id").autoincrement().notNull(),
	shiftName: varchar("shift_name", { length: 100 }).notNull(),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	allowTime: time("allow_time").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	isSpecial: mysqlEnum("is_special", ['y', 'n']).default('n').notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.shiftId], name: "hr_shift_master_shift_id" }),
	]);

export const hrTaxArea = mysqlTable("hr_tax_area", {
	idHrTaxArea: int("id_hr_tax_area").autoincrement().notNull(),
	idHrTaxTemplate: int("id_hr_tax_template").notNull().references(() => hrTaxTemplate.idHrTaxTemplate),
	idHrTaxAreaType: int("id_hr_tax_area_type").notNull().references(() => hrTaxAreaType.idHrTaxAreaType),
	minTaxAmount: decimal("min_tax_amount", { precision: 12, scale: 2 }).notNull(),
	comment: text(),
	idUsers: int("id_users").references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
	(table) => [
		index("id_hr_tax_area_type").on(table.idHrTaxAreaType),
		index("id_hr_tax_template").on(table.idHrTaxTemplate),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrTaxArea], name: "hr_tax_area_id_hr_tax_area" }),
	]);

export const hrTaxAreaType = mysqlTable("hr_tax_area_type", {
	idHrTaxAreaType: int("id_hr_tax_area_type").autoincrement().notNull(),
	areaType: mysqlEnum("area_type", ['Dhaka & Chittagong City Corporation', 'Other City Corporations', 'Other Areas']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrTaxAreaType], name: "hr_tax_area_type_id_hr_tax_area_type" }),
	]);

export const hrTaxBonusSetup = mysqlTable("hr_tax_bonus_setup", {
	idHrTaxBonusSetup: int("id_hr_tax_bonus_setup").autoincrement().notNull(),
	idHrTaxTemplate: int("id_hr_tax_template").notNull().references(() => hrTaxTemplate.idHrTaxTemplate),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	eligibleDate: date("eligible_date", { mode: 'string' }).notNull(),
	eligibleDays: int("eligible_days").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_hr_tax_template").on(table.idHrTaxTemplate),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrTaxBonusSetup], name: "hr_tax_bonus_setup_id_hr_tax_bonus_setup" }),
	]);

export const hrTaxCalculationRange = mysqlTable("hr_tax_calculation_range", {
	idHrTaxCalculationRange: int("id_hr_tax_calculation_range").autoincrement().notNull(),
	idHrTaxTemplate: int("id_hr_tax_template").notNull().references(() => hrTaxTemplate.idHrTaxTemplate),
	type: mysqlEnum(['Male', 'Female Or Others']).notNull(),
	startRange: double("start_range", { precision: 12, scale: 2 }).notNull(),
	endRange: double("end_range", { precision: 12, scale: 2 }).notNull(),
	difference: double({ precision: 12, scale: 2 }).notNull(),
	taxPercentage: double("tax_percentage", { precision: 12, scale: 2 }).notNull(),
	comment: text(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
	(table) => [
		index("id_hr_tax_template").on(table.idHrTaxTemplate),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrTaxCalculationRange], name: "hr_tax_calculation_range_id_hr_tax_calculation_range" }),
	]);

export const hrTaxCalculationRangeHistory = mysqlTable("hr_tax_calculation_range_history", {
	idHrTaxCalculationRangeHistory: int("id_hr_tax_calculation_range_history").autoincrement().notNull(),
	idHrTaxTemplate: int("id_hr_tax_template").notNull().references(() => hrTaxTemplate.idHrTaxTemplate),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by_id_users").on(table.changesBy),
		index("id_hr_tax_template").on(table.idHrTaxTemplate),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.idHrTaxCalculationRangeHistory], name: "hr_tax_calculation_range_history_id_hr_tax_calculation_range_history" }),
	]);

export const hrTaxChallanEmployee = mysqlTable("hr_tax_challan_employee", {
	idHrTaxChallanEmployee: int("id_hr_tax_challan_employee").autoincrement().notNull(),
	idHrTaxChallanEntry: int("id_hr_tax_challan_entry").notNull().references(() => hrTaxChallanEntry.idHrTaxChallanEntry),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	tdsAmount: double("tds_amount", { precision: 12, scale: 2 }).notNull(),
	paySlipGenerationId: int("pay_slip_generation_id").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").references(() => users.idUsers),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hr_tax_challan_entry").on(table.idHrTaxChallanEntry),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrTaxChallanEmployee], name: "hr_tax_challan_employee_id_hr_tax_challan_employee" }),
	]);

export const hrTaxChallanEntry = mysqlTable("hr_tax_challan_entry", {
	idHrTaxChallanEntry: int("id_hr_tax_challan_entry").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	challanNumber: text("challan_number").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	challanDate: date("challan_date", { mode: 'string' }).notNull(),
	challanAmount: double("challan_amount", { precision: 12, scale: 2 }).notNull(),
	month: int().notNull(),
	year: int().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	branchId: int("branch_id").references(() => hrBankBranchMaster.branchId),
	idBanks: int("id_banks"),
	paymentType: mysqlEnum("payment_type", ['Pay Order', 'Cheque', 'Cash']).notNull(),
	status: mysqlEnum(['Pending', 'Approved']).default('Pending').notNull(),
	approverId: int("approver_id").notNull().references(() => users.idUsers),
	submittedById: int("submitted_by_id").notNull().references(() => users.idUsers),
	paySlipGenerationId: int("pay_slip_generation_id").notNull().references(() => hrPaySlipGeneration.paySlipGenerationId),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idHrTaxChallanEntryFileImport: int("id_hr_tax_challan_entry_file_import").notNull(),
	taxChallanFileName: text("tax_challan_file_name"),
	taxChallanOrginalName: text("tax_challan_orginal_name"),
},
	(table) => [
		index("approver_id").on(table.approverId),
		index("branch_id").on(table.branchId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_users").on(table.idUsers),
		index("pay_slip_generation_id").on(table.paySlipGenerationId),
		index("submitted_by_id").on(table.submittedById),
		primaryKey({ columns: [table.idHrTaxChallanEntry], name: "hr_tax_challan_entry_id_hr_tax_challan_entry" }),
	]);

export const hrTaxChallanEntryFileImport = mysqlTable("hr_tax_challan_entry_file_import", {
	idHrTaxChallanEntryFileImport: int("id_hr_tax_challan_entry_file_import").autoincrement().notNull(),
	totalData: int("total_data").default(0).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idProjects: int("id_projects").notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	deletedBy: int("deleted_by"),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_user").on(table.idUser),
		primaryKey({ columns: [table.idHrTaxChallanEntryFileImport], name: "hr_tax_challan_entry_file_import_id_hr_tax_challan_entry_file_import" }),
	]);

export const hrTaxChallanEntryHistory = mysqlTable("hr_tax_challan_entry_history", {
	idHrTaxChallanEntryHistory: int("id_hr_tax_challan_entry_history").autoincrement().notNull(),
	idHrTaxChallanEntry: int("id_hr_tax_challan_entry").notNull().references(() => hrTaxChallanEntry.idHrTaxChallanEntry),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['approve', 'delete', 'edit']).default('delete').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updaetDate: timestamp("updaet_date", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		index("id_hr_tax_challan_entry").on(table.idHrTaxChallanEntry),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.idHrTaxChallanEntryHistory], name: "hr_tax_challan_entry_history_id_hr_tax_challan_entry_history" }),
	]);

export const hrTaxPolicyEarningHeadWise = mysqlTable("hr_tax_policy_earning_head_wise", {
	idHrEarningHeadWiseTaxPolicy: int("id_hr_earning_head_wise_tax_policy").autoincrement().notNull(),
	idHrTaxTemplate: int("id_hr_tax_template").notNull().references(() => hrTaxTemplate.idHrTaxTemplate),
	earningHeadsId: int("earning_heads_id").notNull().references(() => hrEarningHeads.earningHeadsId),
	taxExemptedType: mysqlEnum("tax_exempted_type", ['Yes', 'No']).notNull(),
	earningHeadsIdExemptionFrom: int("earning_heads_id_exemption_from"),
	calculateFrom: mysqlEnum("calculate_from", ['Amount', 'Percentage', 'Both']).notNull(),
	exemptionAmount: double("exemption_amount", { precision: 12, scale: 2 }),
	periodicType: mysqlEnum("periodic_type", ['Monthly', 'Yearly']),
	exemptionPercentage: double("exemption_percentage", { precision: 12, scale: 5 }),
	isBonus: mysqlEnum("is_bonus", ['Yes', 'No']).default('No').notNull(),
	salaryType: mysqlEnum("salary_type", ['Basic', 'Gross', 'Others Allowance', 'CTC']),
	salaryPercentage: decimal("salary_percentage", { precision: 10, scale: 2 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	eligibleDate: date("eligible_date", { mode: 'string' }),
	eligibleDays: int("eligible_days"),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	remarks: text(),
},
	(table) => [
		index("earning_heads_id").on(table.earningHeadsId),
		index("id_hr_tax_template").on(table.idHrTaxTemplate),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrEarningHeadWiseTaxPolicy], name: "hr_tax_policy_earning_head_wise_id_hr_earning_head_wise_tax_policy" }),
	]);

export const hrTaxPolicyEarningHeadWiseHistory = mysqlTable("hr_tax_policy_earning_head_wise_history", {
	idHrTaxPolicyEarningHeadWiseHistory: int("id_hr_tax_policy_earning_head_wise_history").autoincrement().notNull(),
	idHrTaxTemplate: int("id_hr_tax_template").notNull().references(() => hrTaxTemplate.idHrTaxTemplate),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by_id_users").on(table.changesBy),
		index("id_hr_tax_template").on(table.idHrTaxTemplate),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.idHrTaxPolicyEarningHeadWiseHistory], name: "hr_tax_policy_earning_head_wise_history_id_hr_tax_policy_earning_head_wise_history" }),
	]);

export const hrTaxRecalculate = mysqlTable("hr_tax_recalculate", {
	idHrTaxRecalculate: int("id_hr_tax_recalculate").autoincrement().notNull(),
	idHrTaxTemplate: int("id_hr_tax_template").notNull().references(() => hrTaxTemplate.idHrTaxTemplate),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	idProjects: int("id_projects").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	year: int().notNull(),
	month: int().notNull(),
	type: mysqlEnum(['Recalculate Tax']).notNull(),
	templateErrorIds: text("template_error_ids"),
	taxErrorIds: text("tax_error_ids"),
	message: text(),
	remarks: text(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").references(() => users.idUsers),
},
	(table) => [
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_hr_tax_template").on(table.idHrTaxTemplate),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrTaxRecalculate], name: "hr_tax_recalculate_id_hr_tax_recalculate" }),
	]);

export const hrTaxTemplate = mysqlTable("hr_tax_template", {
	idHrTaxTemplate: int("id_hr_tax_template").autoincrement().notNull(),
	templateName: varchar("template_name", { length: 255 }).notNull(),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	maxInvestmentLimit: double("max_investment_limit", { precision: 12, scale: 2 }).notNull(),
	allowableInvestmentPercentage: decimal("allowable_investment_percentage", { precision: 10, scale: 2 }).notNull(),
	taxRebateInvestmentPercentage: decimal("tax_rebate_investment_percentage", { precision: 10, scale: 2 }).notNull(),
	minTaxFreeSalaryAmountMale: decimal("min_tax_free_salary_amount_male", { precision: 10, scale: 2 }).notNull(),
	minTaxFreeSalaryAmountFemale: decimal("min_tax_free_salary_amount_female", { precision: 10, scale: 2 }).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	originalName: varchar("original_name", { length: 100 }),
	fileName: varchar("file_name", { length: 100 }),
	taxLaw: mysqlEnum("tax_law", ['1984', '2023']).notNull(),
	maximumExemptionAmount: decimal("maximum_exemption_amount", { precision: 12, scale: 2 }),
	exemptionGrossIncomeDividedBy: tinyint("exemption_gross_income_divided_by"),
	firstTimeTaxAmount: decimal("first_time_tax_amount", { precision: 12, scale: 2 }),
},
	(table) => [
		index("id_fiscal_year").on(table.idFiscalYear),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrTaxTemplate], name: "hr_tax_template_id_hr_tax_template" }),
	]);

export const hrTaxTemplateHistory = mysqlTable("hr_tax_template_history", {
	idHrTaxTemplateHistory: int("id_hr_tax_template_history").autoincrement().notNull(),
	idHrTaxTemplate: int("id_hr_tax_template").notNull().references(() => hrTaxTemplate.idHrTaxTemplate),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull().references(() => users.idUsers),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("changes_by_id_users").on(table.changesBy),
		index("id_hr_tax_template").on(table.idHrTaxTemplate),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.idHrTaxTemplateHistory], name: "hr_tax_template_history_id_hr_tax_template_history" }),
	]);

export const hrTrainingCertification = mysqlTable("hr_training_certification", {
	idHrTrainingCertification: int("id_hr_training_certification").autoincrement().notNull(),
	idHrInstitutes: int("id_hr_institutes").notNull().references(() => hrInstitutes.idHrInstitutes),
	idCountry: int("id_country").notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	title: text().notNull(),
	location: varchar({ length: 255 }).notNull(),
	duration: varchar({ length: 255 }).notNull(),
	remark: text(),
	dataType: mysqlEnum("data_type", ['Training', 'Certifiation']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	fileName: varchar("file_name", { length: 200 }),
	originalName: varchar("original_name", { length: 200 }),
	idHrisFileEntryDetails: int("id_hris_file_entry_details"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_country").on(table.idCountry),
		index("id_hr_institutes").on(table.idHrInstitutes),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrTrainingCertification], name: "hr_training_certification_id_hr_training_certification" }),
	]);

export const hrTransferredCompany = mysqlTable("hr_transferred_company", {
	idTransferredCompany: int("id_transferred_company").autoincrement().notNull(),
	idPresentCompany: int("id_present_company").notNull(),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	idEmployeeCustom: varchar("id_employee_custom", { length: 50 }).notNull(),
	idCompany: int("id_company").notNull(),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDate: date("effective_date", { mode: 'string' }).notNull(),
	idReportingPerson: int("id_reporting_person").notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idGrade: int("id_grade").notNull().references(() => hrGrades.idGrade),
	idDesignation: int("id_designation").notNull().references(() => hrDesignationMaster.designationId),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	transferStatus: mysqlEnum("transfer_status", ['Complete', 'Partial']).default('Partial').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_department").on(table.idDepartment),
		index("id_designation").on(table.idDesignation),
		index("id_employee").on(table.idEmployee),
		index("id_grade").on(table.idGrade),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idTransferredCompany], name: "hr_transferred_company_id_transferred_company" }),
	]);

export const hrTransferredEmployeesSalary = mysqlTable("hr_transferred_employees_salary", {
	transferredEmployeesSalaryId: int("transferred_employees_salary_id").autoincrement().notNull(),
	totalDays: int("total_days"),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	month: int().notNull(),
	year: int().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	yearMonth: date("year_month", { mode: 'string' }).notNull(),
	amount: decimal({ precision: 12, scale: 2 }).notNull(),
	headName: varchar("head_name", { length: 150 }).notNull(),
	headType: varchar("head_type", { length: 150 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	payStructureTemplateId: int("pay_structure_template_id").references(() => hrPayStructureTemplate.payStructureTemplateId),
	transferId: int("transfer_id").notNull().references(() => hrEmployeeTransfer.employeeTransferId),
	idHeads: int("id_heads").notNull(),
},
	(table) => [
		index("fk_transferred_employees_salary_employee1_idx").on(table.employeeId),
		index("fk_transferred_employees_salary_id_business_unit1_idx").on(table.idBusinessUnit),
		index("fk_transferred_employees_salary_id_users1_idx").on(table.idUsers),
		index("pay_structure_template_id").on(table.payStructureTemplateId),
		index("transfer_id").on(table.transferId),
		primaryKey({ columns: [table.transferredEmployeesSalaryId], name: "hr_transferred_employees_salary_transferred_employees_salary_id" }),
	]);

export const hrTravelBillExpenseTypes = mysqlTable("hr_travel_bill_expense_types", {
	idTravelBillExpenseType: int("id_travel_bill_expense_type").autoincrement().notNull(),
	expenseType: varchar("expense_type", { length: 100 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idTravelBillExpenseType], name: "hr_travel_bill_expense_types_id_travel_bill_expense_type" }),
	]);

export const hrVariableInputFileImport = mysqlTable("hr_variable_input_file_import", {
	idHrVariableInputFileImport: int("id_hr_variable_input_file_import").autoincrement().notNull(),
	idUser: int("id_user").notNull().references(() => users.idUsers),
	fileName: varchar("file_name", { length: 150 }).notNull(),
	validEntry: int("valid_entry").default(0).notNull(),
	invalidEntry: int("invalid_entry").default(0).notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	invalidOfficeIds: text("invalid_office_ids"),
	importMonth: int("import_month").notNull(),
	importYear: int("import_year").notNull(),
	totalEarningDeductionAmount: decimal("total_earning_deduction_amount", { precision: 12, scale: 2 }).notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	importYearMonth: date("import_year_month", { mode: 'string' }).notNull(),
	earningDeductionHeadsId: int("earning_deduction_heads_id").notNull(),
	entryType: mysqlEnum("entry_type", ['covid_deduction', 'variable_input']).default('covid_deduction').notNull(),
	headType: varchar("head_type", { length: 50 }).notNull(),
	totalDuplicate: int("total_duplicate").default(0),
	duplicateIds: text("duplicate_ids"),
	totalInvalidAmountId: int("total_invalid_amount_id").default(0),
	invalidAmountIds: text("invalid_amount_ids"),
	deletedBy: int("deleted_by"),
	originalName: varchar("original_name", { length: 100 }),
	totalInvalidPsSetup: int("total_invalid_ps_setup").default(0),
	invalidPsSetupIds: text("invalid_ps_setup_ids"),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_users").on(table.idUser),
		primaryKey({ columns: [table.idHrVariableInputFileImport], name: "hr_variable_input_file_import_id_hr_variable_input_file_import" }),
	]);

export const hrVariableInputHistory = mysqlTable("hr_variable_input_history", {
	variableInputHistoryId: int("variable_input_history_id").autoincrement().notNull(),
	payStructureVariableInputId: int("pay_structure_variable_input_id").notNull().references(() => hrPayStructureVariableInput.payStructureVariableInputId),
	previousData: text("previous_data").notNull(),
	changesFrom: varchar("changes_from", { length: 80 }).notNull(),
	changesTo: varchar("changes_to", { length: 80 }).notNull(),
	previousIdUsers: int("previous_id_users").notNull().references(() => users.idUsers),
	changesBy: int("changes_by").notNull(),
	historyDateCreated: timestamp("history_date_created", { mode: 'string' }).defaultNow().notNull(),
	historyReason: mysqlEnum("history_reason", ['edit', 'delete']).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("pay_structure_variable_input_id").on(table.payStructureVariableInputId),
		index("previous_id_users").on(table.previousIdUsers),
		primaryKey({ columns: [table.variableInputHistoryId], name: "hr_variable_input_history_variable_input_history_id" }),
	]);

export const hrWeekend = mysqlTable("hr_weekend", {
	idHrWeekend: int("id_hr_weekend").autoincrement().notNull(),
	days: char({ length: 50 }),
	isWeekend: mysqlEnum("is_weekend", ['weekend', 'not_weekend']).default('not_weekend'),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrWeekend], name: "hr_weekend_id_hr_weekend" }),
	]);

export const hrWorkStation = mysqlTable("hr_work_station", {
	workStationId: int("work_station_id").autoincrement().notNull(),
	workStationName: varchar("work_station_name", { length: 200 }).notNull(),
	description: text().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.workStationId], name: "hr_work_station_work_station_id" }),
	]);

export const hrisCandidateUserAddresses = mysqlTable("hris_candidate_user_addresses", {
	idCandidateUserAddress: int("id_candidate_user_address").autoincrement().notNull(),
	idDistrict: int("id_district"),
	idThana: int("id_thana"),
	idPostOffice: int("id_post_office"),
	addressLine: varchar("address_line", { length: 100 }),
	idCandidateUser: int("id_candidate_user").notNull().references(() => hrisCandidateUsers.idCandidateUser),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idCountry: int("id_country"),
},
	(table) => [
		index("id_candidate_user").on(table.idCandidateUser),
		primaryKey({ columns: [table.idCandidateUserAddress], name: "hris_candidate_user_addresses_id_candidate_user_address" }),
	]);

export const hrisCandidateUserEducations = mysqlTable("hris_candidate_user_educations", {
	idCandidateUserEducation: int("id_candidate_user_education").autoincrement().notNull(),
	idDegree: int("id_degree").notNull(),
	result: varchar({ length: 20 }).notNull(),
	marks: decimal({ precision: 12, scale: 2 }),
	cgpa: decimal({ precision: 12, scale: 2 }),
	major: int(),
	enrollFrom: varchar("enroll_from", { length: 20 }),
	passingYear: int("passing_year"),
	board: varchar({ length: 20 }),
	duration: decimal({ precision: 12, scale: 2 }),
	institute: varchar({ length: 100 }).notNull(),
	idCandidateUser: int("id_candidate_user").notNull().references(() => hrisCandidateUsers.idCandidateUser),
	cgpaScale: decimal("cgpa_scale", { precision: 12, scale: 2 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	isForeignInstitute: tinyint("is_foreign_institute").default(0).notNull(),
	isStudent: tinyint("is_student").default(0).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	enrollTo: date("enroll_to", { mode: 'string' }),
},
	(table) => [
		index("id_candidate_user").on(table.idCandidateUser),
		primaryKey({ columns: [table.idCandidateUserEducation], name: "hris_candidate_user_educations_id_candidate_user_education" }),
	]);

export const hrisCandidateUserExperiences = mysqlTable("hris_candidate_user_experiences", {
	idCandidateUserExperience: int("id_candidate_user_experience").autoincrement().notNull(),
	companyName: varchar("company_name", { length: 100 }).notNull(),
	designation: varchar({ length: 50 }).notNull(),
	department: varchar({ length: 50 }).notNull(),
	companyBusiness: varchar("company_business", { length: 100 }).notNull(),
	location: varchar({ length: 100 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	joiningDate: date("joining_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	resignDate: date("resign_date", { mode: 'string' }),
	responsibilities: text(),
	idCandidateUser: int("id_candidate_user").notNull().references(() => hrisCandidateUsers.idCandidateUser),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	timeExperiencedInYear: float("time_experienced_in_year").notNull(),
},
	(table) => [
		index("id_candidate_user").on(table.idCandidateUser),
		primaryKey({ columns: [table.idCandidateUserExperience], name: "hris_candidate_user_experiences_id_candidate_user_experience" }),
	]);

export const hrisCandidateUserReferences = mysqlTable("hris_candidate_user_references", {
	idCandidateUserReference: int("id_candidate_user_reference").autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	phone: varchar({ length: 20 }),
	email: varchar({ length: 35 }).notNull(),
	department: varchar({ length: 100 }),
	designation: varchar({ length: 100 }).notNull(),
	organization: varchar({ length: 100 }).notNull(),
	idCandidateUser: int("id_candidate_user").notNull().references(() => hrisCandidateUsers.idCandidateUser),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("id_candidate_user").on(table.idCandidateUser),
		primaryKey({ columns: [table.idCandidateUserReference], name: "hris_candidate_user_references_id_candidate_user_reference" }),
	]);

export const hrisCandidateUserTrainings = mysqlTable("hris_candidate_user_trainings", {
	idCandidateUserTraining: int("id_candidate_user_training").autoincrement().notNull(),
	trainingTitle: varchar("training_title", { length: 100 }).notNull(),
	country: varchar({ length: 50 }).notNull(),
	topicCovered: varchar("topic_covered", { length: 256 }).notNull(),
	trainingYear: int("training_year").notNull(),
	institute: varchar({ length: 100 }).notNull(),
	duration: varchar({ length: 100 }).notNull(),
	location: varchar({ length: 150 }),
	idCandidateUser: int("id_candidate_user").notNull().references(() => hrisCandidateUsers.idCandidateUser),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_candidate_user").on(table.idCandidateUser),
		primaryKey({ columns: [table.idCandidateUserTraining], name: "hris_candidate_user_trainings_id_candidate_user_training" }),
	]);

export const hrisCandidateUsers = mysqlTable("hris_candidate_users", {
	idCandidateUser: int("id_candidate_user").autoincrement().notNull(),
	email: varchar({ length: 30 }).notNull(),
	password: varchar({ length: 256 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	firstName: varchar("first_name", { length: 20 }),
	lastName: varchar("last_name", { length: 20 }),
	fatherName: varchar("father_name", { length: 30 }),
	motherName: varchar("mother_name", { length: 30 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	birthDate: date("birth_date", { mode: 'string' }),
	gender: mysqlEnum(['male', 'female', 'other']).default('male'),
	religion: mysqlEnum(['muslim', 'hindu', 'buddha', 'christan']).default('muslim'),
	nationality: varchar({ length: 20 }),
	nationalId: varchar("national_id", { length: 20 }),
	birthCertificate: varchar("birth_certificate", { length: 20 }),
	passport: varchar({ length: 20 }),
	mobile: varchar({ length: 20 }),
	maritalStatus: mysqlEnum("marital_status", ['married', 'unmarried', 'single']).default('married'),
	idPresentAddress: int("id_present_address"),
	idPermanentAddress: int("id_permanent_address"),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	tinNumber: varchar("tin_number", { length: 100 }),
	bloodGroup: varchar("blood_group", { length: 10 }),
	drivingLicence: varchar("driving_licence", { length: 100 }),
	fullName: varchar("full_name", { length: 100 }),
	locality: mysqlEnum(['Local', 'Expatriate']).default('Local'),
	isOccupied: tinyint("is_occupied").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idCandidateUser], name: "hris_candidate_users_id_candidate_user" }),
		unique("email").on(table.email),
	]);

export const hrisCiteriaMaster = mysqlTable("hris_citeria_master", {
	idHrisCiteriaMaster: int("id_hris_citeria_master").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	citeriaCategoryType: mysqlEnum("citeria_category_type", ['Efficiency', 'Profitability', 'Reputation']).default('Efficiency').notNull(),
	citeriaName: varchar("citeria_name", { length: 50 }).notNull(),
	citeriaDescription: varchar("citeria_description", { length: 1000 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_project").on(table.idProject),
		primaryKey({ columns: [table.idHrisCiteriaMaster], name: "hris_citeria_master_id_hris_citeria_master" }),
	]);

export const hrisCountries = mysqlTable("hris_countries", {
	idCountry: int("id_country").autoincrement().notNull(),
	countryName: varchar("country_name", { length: 50 }).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idCountry], name: "hris_countries_id_country" }),
	]);

export const hrisDegreeMajors = mysqlTable("hris_degree_majors", {
	idMajor: int("id_major").autoincrement().notNull(),
	majorName: varchar("major_name", { length: 100 }).notNull(),
	idDegree: int("id_degree"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idMajor], name: "hris_degree_majors_id_major" }),
	]);

export const hrisDegrees = mysqlTable("hris_degrees", {
	idDegree: int("id_degree").autoincrement().notNull(),
	degreeName: varchar("degree_name", { length: 50 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreate: timestamp("date_create", { mode: 'string' }).defaultNow().notNull(),
	idUser: int("id_user").notNull(),
	dateUpdate: timestamp("date_update", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idDegree], name: "hris_degrees_id_degree" }),
		unique("degree_name").on(table.degreeName),
	]);

export const hrisDepartmentalBudget = mysqlTable("hris_departmental_budget", {
	idHrisDepartmentalBudget: int("id_hris_departmental_budget").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	idDesignation: int("id_designation").notNull().references(() => hrDesignationMaster.designationId),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_department").on(table.idDepartment),
		index("id_designation").on(table.idDesignation),
		primaryKey({ columns: [table.idHrisDepartmentalBudget], name: "hris_departmental_budget_id_hris_departmental_budget" }),
	]);

export const hrisDepartmentalBudgetDetails = mysqlTable("hris_departmental_budget_details", {
	idHrisDepartmentalBudgetDetails: int("id_hris_departmental_budget_details").autoincrement().notNull(),
	idHrisDepartmentalBudget: int("id_hris_departmental_budget").notNull().references(() => hrisDepartmentalBudget.idHrisDepartmentalBudget),
	idHrisJobCreateDetails: int("id_hris_job_create_details").notNull().references(() => hrisJobCreateDetails.idHrisJobCreateDetails),
	grossSalary: decimal("gross_salary", { precision: 12, scale: 2 }).notNull(),
	otherCost: decimal("other_cost", { precision: 12, scale: 2 }).notNull(),
	ctc: decimal({ precision: 12, scale: 2 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_hris_departmental_budget").on(table.idHrisDepartmentalBudget),
		index("id_hris_job_create_details").on(table.idHrisJobCreateDetails),
		primaryKey({ columns: [table.idHrisDepartmentalBudgetDetails], name: "hris_departmental_budget_details_id_hris_departmental_budget_details" }),
	]);

export const hrisDistricts = mysqlTable("hris_districts", {
	idDistrict: int("id_district").autoincrement().notNull(),
	districtName: varchar("district_name", { length: 20 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idDistrict], name: "hris_districts_id_district" }),
	]);

export const hrisDocumentMaster = mysqlTable("hris_document_master", {
	idHrisDocumentMaster: int("id_hris_document_master").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	documentType: mysqlEnum("document_type", ['Receive', 'Handover']).default('Receive').notNull(),
	documentName: varchar("document_name", { length: 50 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_project").on(table.idProject),
		primaryKey({ columns: [table.idHrisDocumentMaster], name: "hris_document_master_id_hris_document_master" }),
	]);

export const hrisEmployeeSittingArragementDetails = mysqlTable("hris_employee_sitting_arragement_details", {
	idHrisEmployeeSittingArragementDetails: int("id_hris_employee_sitting_arragement_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	designationId: int("designation_id").notNull().references(() => hrDesignationMaster.designationId),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	idHrisWorkStationFlatRoomDetails: int("id_hris_work_station_flat_room_details").notNull().references(() => hrisWorkStationFlatRoomDetails.idHrisWorkStationFlatRoomDetails),
	idHrisWorkStationFlatDetails: int("id_hris_work_station_flat_details").notNull().references(() => hrisWorkStationFlatDetails.idHrisWorkStationFlatDetails),
	sittingCapacityOcupied: int("sitting_capacity_ocupied").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisEmployeeSittingArragementDetails], name: "hris_employee_sitting_arragement_details_id_hris_employee_sitting_arragement_details" }),
	]);

export const hrisEmployeeStationaryRequisitionDetails = mysqlTable("hris_employee_stationary_requisition_details", {
	idHrisEmployeeStationaryRequisitionDetails: int("id_hris_employee_stationary_requisition_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	designationId: int("designation_id").notNull().references(() => hrDesignationMaster.designationId),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	stationaryProductConcernEmployeeId: int("stationary_product_concern_employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisEmployeeStationaryRequisitionDetails], name: "hris_employee_stationary_requisition_details_id_hris_employee_stationary_requisition_details" }),
	]);

export const hrisErpPlan = mysqlTable("hris_erp_plan", {
	idHrisErpPlan: int("id_hris_erp_plan").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull(),
	idDepartment: int("id_department").notNull(),
	idDesignation: int("id_designation").notNull(),
	year: int().notNull(),
	month: int().notNull(),
	noOfRecruit: int("no_of_recruit").notNull(),
	idErpPlanFileUpload: int("id_erp_plan_file_upload"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisErpPlan], name: "hris_erp_plan_id_hris_erp_plan" }),
	]);

export const hrisErpPlanFileUpload = mysqlTable("hris_erp_plan_file_upload", {
	idErpPlanFileUpload: int("id_erp_plan_file_upload").autoincrement().notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	totalEntry: int("total_entry").notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idErpPlanFileUpload], name: "hris_erp_plan_file_upload_id_erp_plan_file_upload" }),
	]);

export const hrisEvaluationScoreMaster = mysqlTable("hris_evaluation_score_master", {
	idHrisEvaluationScoreMaster: int("id_hris_evaluation_score_master").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	evaluationName: varchar("evaluation_name", { length: 100 }).notNull(),
	evaluationScore: int("evaluation_score").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisEvaluationScoreMaster], name: "hris_evaluation_score_master_id_hris_evaluation_score_master" }),
	]);

export const hrisFileArchiveDocumentFor = mysqlTable("hris_file_archive_document_for", {
	idHrisFileArchiveDocumentFor: int("id_hris_file_archive_document_for").autoincrement().notNull(),
	idHrisFileArchiveDocumentType: int("id_hris_file_archive_document_type").notNull().references(() => hrisFileArchiveDocumentType.idHrisFileArchiveDocumentType),
	documentFor: mysqlEnum("document_for", ['Expat', 'Management', 'Non Management', 'MAX Worker']).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisFileArchiveDocumentFor], name: "hris_file_archive_document_for_id_hris_file_archive_document_for" }),
	]);

export const hrisFileArchiveDocumentType = mysqlTable("hris_file_archive_document_type", {
	idHrisFileArchiveDocumentType: int("id_hris_file_archive_document_type").autoincrement().notNull(),
	documentName: varchar("document_name", { length: 150 }).notNull(),
	requiredType: mysqlEnum("required_type", ['Mandatory', 'Optional']).notNull(),
	documentIssueTimes: mysqlEnum("document_issue_times", ['Single', 'Multiple']).default('Single').notNull(),
	receiveOrHandover: mysqlEnum("receive_or_handover", ['Receive', 'Handover', 'Not Applicable']).notNull(),
	documentRemarks: varchar("document_remarks", { length: 150 }).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isSystemGenerated: mysqlEnum("is_system_generated", ['Yes', 'No']),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisFileArchiveDocumentType], name: "hris_file_archive_document_type_id_hris_file_archive_document_type" }),
	]);

export const hrisFileArchiveEntry = mysqlTable("hris_file_archive_entry", {
	idHrisFileArchiveEntry: int("id_hris_file_archive_entry").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	personalFolderRefNumber: varchar("personal_folder_ref_number", { length: 255 }),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisFileArchiveEntry], name: "hris_file_archive_entry_id_hris_file_archive_entry" }),
	]);

export const hrisFileArchiveEntryDetails = mysqlTable("hris_file_archive_entry_details", {
	idHrisFileEntryDetails: int("id_hris_file_entry_details").autoincrement().notNull(),
	idHrisFileArchiveEntry: int("id_hris_file_archive_entry").notNull(),
	idHrisFileArchiveDocumentType: int("id_hris_file_archive_document_type").notNull(),
	fileLetterNo: varchar("file_letter_no", { length: 150 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	fileIssueDate: date("file_issue_date", { mode: 'string' }),
	filePageNo: varchar("file_page_no", { length: 150 }),
	fileRemarks: varchar("file_remarks", { length: 255 }),
	attachment: varchar({ length: 100 }),
	extension: varchar({ length: 30 }),
	fileSize: double("file_size", { precision: 12, scale: 8 }),
	thumbName: varchar("thumb_name", { length: 100 }),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	originalFileName: varchar("original_file_name", { length: 100 }),
	deletedBy: int("deleted_by"),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisFileEntryDetails], name: "hris_file_archive_entry_details_id_hris_file_entry_details" }),
	]);

export const hrisGuestInterViewerDetails = mysqlTable("hris_guest_inter_viewer_details", {
	idHrisGuestInterViewerDetails: int("id_hris_guest_inter_viewer_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idHrisInterViewBoard: int("id_hris_inter_view_board").notNull().references(() => hrisInterViewBoard.idHrisInterViewBoard),
	guestInterViewerName: varchar("guest_inter_viewer_name", { length: 50 }).notNull(),
	guestInterViewerOrganization: varchar("guest_inter_viewer_organization", { length: 50 }).notNull(),
	guestInterViewerDesignation: varchar("guest_inter_viewer_designation", { length: 50 }).notNull(),
	guestInterViewerDepartment: varchar("guest_inter_viewer_department", { length: 50 }).notNull(),
	guestInterViewerPhone: varchar("guest_inter_viewer_phone", { length: 50 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	status: mysqlEnum(['Invited', 'Present', 'Absent']).default('Invited').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisGuestInterViewerDetails], name: "hris_guest_inter_viewer_details_id_hris_guest_inter_viewer_details" }),
	]);

export const hrisInterViewBoard = mysqlTable("hris_inter_view_board", {
	idHrisInterViewBoard: int("id_hris_inter_view_board").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	hrisJobRequisitionId: int("hris_job_requisition_id").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		primaryKey({ columns: [table.idHrisInterViewBoard], name: "hris_inter_view_board_id_hris_inter_view_board" }),
	]);

export const hrisInterViewSetupDetails = mysqlTable("hris_inter_view_setup_details", {
	idHrisInterViewSetupDetails: int("id_hris_inter_view_setup_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idJobRequisition: int("id_job_requisition").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	idHrisInterViewTimeScheduleDetails: int("id_hris_inter_view_time_schedule_details").notNull().references(() => hrisInterViewTimeScheduleDetails.idHrisInterViewTimeScheduleDetails),
	idCandidateUser: int("id_candidate_user").notNull().references(() => hrisCandidateUsers.idCandidateUser),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	status: mysqlEnum(['Invited', 'Present', 'Absent']).default('Invited').notNull(),
	compensationStatus: mysqlEnum("compensation_status", ['Pending', 'Complete']).default('Pending').notNull(),
	appraiseStatus: mysqlEnum("appraise_status", ['Pending', 'Complete']).default('Pending').notNull(),
	requiredAppraise: int("required_appraise").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisInterViewSetupDetails], name: "hris_inter_view_setup_details_id_hris_inter_view_setup_details" }),
	]);

export const hrisInterViewTimeScheduleDetails = mysqlTable("hris_inter_view_time_schedule_details", {
	idHrisInterViewTimeScheduleDetails: int("id_hris_inter_view_time_schedule_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idHrisInterViewBoard: int("id_hris_inter_view_board").notNull().references(() => hrisInterViewBoard.idHrisInterViewBoard),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	interViewDate: date("inter_view_date", { mode: 'string' }).notNull(),
	interViewTimeFrom: time("inter_view_time_from").notNull(),
	interViewTimeTo: time("inter_view_time_to").notNull(),
	interViewReportingTime: int("inter_view_reporting_time").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		primaryKey({ columns: [table.idHrisInterViewTimeScheduleDetails], name: "hris_inter_view_time_schedule_details_id_hris_inter_view_time_schedule_details" }),
	]);

export const hrisInterViewerDetails = mysqlTable("hris_inter_viewer_details", {
	idHrisInterViewerDetails: int("id_hris_inter_viewer_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idHrisInterViewBoard: int("id_hris_inter_view_board").notNull().references(() => hrisInterViewBoard.idHrisInterViewBoard),
	interViewerEmployeeId: int("inter_viewer_employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	status: mysqlEnum(['Invited', 'Present', 'Absent']).default('Invited').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisInterViewerDetails], name: "hris_inter_viewer_details_id_hris_inter_viewer_details" }),
	]);

export const hrisInterviewAppraise = mysqlTable("hris_interview_appraise", {
	idInterviewAppraise: int("id_interview_appraise").autoincrement().notNull(),
	idInterViewSetupDetails: int("id_inter_view_setup_details").notNull().references(() => hrisInterViewSetupDetails.idHrisInterViewSetupDetails),
	idInterviewAppraisedRating: int("id_interview_appraised_rating").references(() => hrisInterviewAppraisedRatings.idInterviewAppraisedRating),
	idInterviewAppraisedCharacteristic: int("id_interview_appraised_characteristic").references(() => hrisInterviewAppraisedCharacteristics.idInterviewAppraisedCharacteristic),
	goodPoints: varchar("good_points", { length: 256 }),
	weakPoints: varchar("weak_points", { length: 256 }),
	remarks: varchar({ length: 256 }),
	appraisedBy: int("appraised_by").notNull().references(() => hrEmployee.employeeId),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("appraised_by").on(table.appraisedBy),
		index("id_inter_view_setup_details").on(table.idInterViewSetupDetails),
		index("id_interview_appraised_characteristic").on(table.idInterviewAppraisedCharacteristic),
		index("id_interview_appraised_rating").on(table.idInterviewAppraisedRating),
		primaryKey({ columns: [table.idInterviewAppraise], name: "hris_interview_appraise_id_interview_appraise" }),
	]);

export const hrisInterviewAppraisedCandidates = mysqlTable("hris_interview_appraised_candidates", {
	idInterviewAppraisedCandidate: int("id_interview_appraised_candidate").autoincrement().notNull(),
	idInterViewSetupDetails: int("id_inter_view_setup_details").notNull().references(() => hrisInterViewSetupDetails.idHrisInterViewSetupDetails),
	totalRatings: decimal("total_ratings", { precision: 11, scale: 2 }).notNull(),
	totalCharacteristics: decimal("total_characteristics", { precision: 11, scale: 2 }).notNull(),
	selectionStatus: mysqlEnum("selection_status", ['Selected For Written Test', 'Selected For Practical Test', 'Selected For Final List', 'Selection Pending', 'Pending For CEO/Director\'s Approval', 'Offer Letter Taken', 'Offer Letter Denied', 'Appointment Letter Denied', 'Appointment Letter Taken', 'Approved For Offer Letter']).default('Selection Pending'),
	previousJobHistoryCheck: tinyint("previous_job_history_check").default(0),
	referenceCheck: tinyint("reference_check").default(0),
	academicCheck: tinyint("academic_check").default(0),
	qualificationCheck: tinyint("qualification_check").default(0),
	medicalCheck: tinyint("medical_check"),
	denyReason: varchar("deny_reason", { length: 256 }).default('0'),
	jobId: int("job_id"),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("id_inter_view_setup_details").on(table.idInterViewSetupDetails),
		primaryKey({ columns: [table.idInterviewAppraisedCandidate], name: "hris_interview_appraised_candidates_id_interview_appraised_candidate" }),
	]);

export const hrisInterviewAppraisedCandidatesSelectionHistory = mysqlTable("hris_interview_appraised_candidates_selection_history", {
	idInterviewAppraisedCandidateSelectionHistory: int("id_interview_appraised_candidate_selection_history").autoincrement().notNull(),
	idInterViewSetupDetails: int("id_inter_view_setup_details").notNull(),
	selectionStatus: varchar("selection_status", { length: 100 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idInterviewAppraisedCandidateSelectionHistory], name: "hris_interview_appraised_candidates_selection_history_id_interview_appraised_candidate_selection_history" }),
	]);

export const hrisInterviewAppraisedCharacteristics = mysqlTable("hris_interview_appraised_characteristics", {
	idInterviewAppraisedCharacteristic: int("id_interview_appraised_characteristic").autoincrement().notNull(),
	assertive: int(),
	cooperative: int(),
	outgoing: int(),
	realisticCareerGoal: int("realistic_career_goal"),
	abilityToLearn: int("ability_to_learn"),
	achievementOriented: int("achievement_oriented"),
	verbal: int(),
	openness: int(),
	creativity: int(),
	professional: int(),
	totalScore: int("total_score").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idInterviewAppraisedCharacteristic], name: "hris_interview_appraised_characteristics_id_interview_appraised_characteristic" }),
	]);

export const hrisInterviewAppraisedRatings = mysqlTable("hris_interview_appraised_ratings", {
	idInterviewAppraisedRating: int("id_interview_appraised_rating").autoincrement().notNull(),
	appearance: int(),
	eyeContact: int("eye_contact"),
	jobKnowledge: int("job_knowledge"),
	itLiteracy: int("it_literacy"),
	oralCommunication: int("oral_communication"),
	totalScore: int("total_score").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idInterviewAppraisedRating], name: "hris_interview_appraised_ratings_id_interview_appraised_rating" }),
	]);

export const hrisInterviewAppraisedReferences = mysqlTable("hris_interview_appraised_references", {
	idInterviewAppraisedReference: int("id_interview_appraised_reference").autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	identity: varchar({ length: 100 }).notNull(),
	phone: varchar({ length: 100 }),
	comment: varchar({ length: 100 }),
	idInterviewAppraise: int("id_interview_appraise").notNull().references(() => hrisInterviewAppraise.idInterviewAppraise),
},
	(table) => [
		index("id_interview_appraise").on(table.idInterviewAppraise),
		primaryKey({ columns: [table.idInterviewAppraisedReference], name: "hris_interview_appraised_references_id_interview_appraised_reference" }),
	]);

export const hrisInterviewBoardMaster = mysqlTable("hris_interview_board_master", {
	idHrisInterviewBoardMaster: int("id_hris_interview_board_master").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		primaryKey({ columns: [table.idHrisInterviewBoardMaster], name: "hris_interview_board_master_id_hris_interview_board_master" }),
	]);

export const hrisInterviewBoardMasterInterviewerDetails = mysqlTable("hris_interview_board_master_interviewer_details", {
	idHrisInterviewBoardMasterInterviewerDetails: int("id_hris_interview_board_master_interviewer_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idHrisInterviewBoardMaster: int("id_hris_interview_board_master").notNull().references(() => hrisInterviewBoardMaster.idHrisInterviewBoardMaster),
	interViewerEmployeeId: int("inter_viewer_employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		primaryKey({ columns: [table.idHrisInterviewBoardMasterInterviewerDetails], name: "hris_interview_board_master_interviewer_details_id_hris_interview_board_master_interviewer_details" }),
	]);

export const hrisItGoodsDetails = mysqlTable("hris_it_goods_details", {
	idHrisItGoodsDetails: int("id_hris_it_goods_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	designationId: int("designation_id").notNull().references(() => hrDesignationMaster.designationId),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	concernSupervisorId: int("concern_supervisor_id").notNull().references(() => hrEmployee.employeeId),
	concernItPersonId: int("concern_it_person_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisItGoodsDetails], name: "hris_it_goods_details_id_hris_it_goods_details" }),
	]);

export const hrisItGoodsItemsDetails = mysqlTable("hris_it_goods_items_details", {
	idHrisItGoodsItemsDetails: int("id_hris_it_goods_items_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idHrisItGoodsDetails: int("id_hris_it_goods_details").notNull().references(() => hrisItGoodsDetails.idHrisItGoodsDetails),
	idInvItems: int("id_inv_items").notNull().references(() => invItems.idInvItems),
	itemQuantity: int("item_quantity").notNull(),
	itemStatus: mysqlEnum("item_status", ['Requested', 'Approved', 'Denied', 'Delivered', 'Delivery Denied', 'Not Delivered']).default('Requested').notNull(),
	itemRequestType: mysqlEnum("item_request_type", ['hr', 'individual']).default('hr').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisItGoodsItemsDetails], name: "hris_it_goods_items_details_id_hris_it_goods_items_details" }),
	]);

export const hrisJobAdvertisementBillEntry = mysqlTable("hris_job_advertisement_bill_entry", {
	idJobAdvertisementBillEntry: int("id_job_advertisement_bill_entry").autoincrement().notNull(),
	idJobAdvertisements: int("id_job_advertisements").notNull().references(() => hrisJobAdvertisements.idJobAdvertisements),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	invoiceNumber: varchar("invoice_number", { length: 50 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	invoiceDate: date("invoice_date", { mode: 'string' }).notNull(),
	amount: decimal({ precision: 12, scale: 2 }).notNull(),
	agencyName: varchar("agency_name", { length: 50 }),
	agencyContact: varchar("agency_contact", { length: 50 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	lastPaymentDate: date("last_payment_date", { mode: 'string' }).notNull(),
	beneficiaryName: varchar("beneficiary_name", { length: 50 }),
	routingNumber: int("routing_number"),
	idBranch: int("id_branch"),
	approver1: int("approver_1").references(() => hrEmployee.employeeId),
	approver2: int("approver_2").references(() => hrEmployee.employeeId),
	accountPayable: int("account_payable").notNull().references(() => hrEmployee.employeeId),
	billAttachment: varchar("bill_attachment", { length: 50 }).notNull(),
	status: mysqlEnum(['Pending', 'Approved']).default('Pending').notNull(),
	idUser: int("id_user").notNull().references(() => hrEmployee.employeeId),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idVendors: int("id_vendors").notNull().references(() => vendors.idVendors),
	idVoucher: int("id_voucher").references(() => accVoucher.idVoucher),
},
	(table) => [
		index("account_payable").on(table.accountPayable),
		index("approver_1").on(table.approver1),
		index("approver_2").on(table.approver2),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_job_advertisements").on(table.idJobAdvertisements),
		index("id_user").on(table.idUser),
		index("id_vendors").on(table.idVendors),
		index("id_voucher").on(table.idVoucher),
		primaryKey({ columns: [table.idJobAdvertisementBillEntry], name: "hris_job_advertisement_bill_entry_id_job_advertisement_bill_entry" }),
	]);

export const hrisJobAdvertisementMediaMasters = mysqlTable("hris_job_advertisement_media_masters", {
	idAdvertisementMediaMasters: int("id_advertisement_media_masters").autoincrement().notNull(),
	idJobAdvertisement: int("id_job_advertisement").notNull().references(() => hrisJobAdvertisements.idJobAdvertisements),
	idVendors: int("id_vendors").notNull().references(() => vendors.idVendors),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	publicationDate: date("publication_date", { mode: 'string' }).notNull(),
	fileName: varchar("file_name", { length: 256 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	email: varchar({ length: 50 }),
	phone: varchar({ length: 50 }),
},
	(table) => [
		index("id_job_advertisement").on(table.idJobAdvertisement),
		index("id_vendors").on(table.idVendors),
		primaryKey({ columns: [table.idAdvertisementMediaMasters], name: "hris_job_advertisement_media_masters_id_advertisement_media_masters" }),
	]);

export const hrisJobAdvertisements = mysqlTable("hris_job_advertisements", {
	idJobAdvertisements: int("id_job_advertisements").autoincrement().notNull(),
	idJobRequisition: int("id_job_requisition").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	lastApplicationDate: date("last_application_date", { mode: 'string' }).notNull(),
	mediaType: varchar("media_type", { length: 10 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("id_job_requisition").on(table.idJobRequisition),
		primaryKey({ columns: [table.idJobAdvertisements], name: "hris_job_advertisements_id_job_advertisements" }),
	]);

export const hrisJobApplicationHistory = mysqlTable("hris_job_application_history", {
	idJobApplicationHistory: int("id_job_application_history").autoincrement().notNull(),
	idJobApplication: int("id_job_application").notNull().references(() => hrisJobApplications.idJobApplication),
	previousJobRequisitionId: int("previous_job_requisition_id").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	currentJobRequisitionId: int("current_job_requisition_id").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	previousStatus: varchar("previous_status", { length: 30 }).notNull(),
	currentStatus: varchar("current_status", { length: 30 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull().references(() => hrEmployee.employeeId),
},
	(table) => [
		index("current_job_requisition_id").on(table.currentJobRequisitionId),
		index("id_job_application").on(table.idJobApplication),
		index("id_user").on(table.idUser),
		index("previous_job_requisition_id").on(table.previousJobRequisitionId),
		primaryKey({ columns: [table.idJobApplicationHistory], name: "hris_job_application_history_id_job_application_history" }),
	]);

export const hrisJobApplications = mysqlTable("hris_job_applications", {
	idJobApplication: int("id_job_application").autoincrement().notNull(),
	idJobRequisition: int("id_job_requisition").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	idCandidateUser: int("id_candidate_user").notNull().references(() => hrisCandidateUsers.idCandidateUser),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	applyDate: date("apply_date", { mode: 'string' }).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	status: mysqlEnum(['pending', 'denied', 'shortlisted', 'interview', 'final_list', 'final_approval', 'offer_letter', 'appointment_letter']).default('pending').notNull(),
	calledForInterview: tinyint("called_for_interview").default(0).notNull(),
},
	(table) => [
		index("id_candidate_user").on(table.idCandidateUser),
		index("id_job_requisition").on(table.idJobRequisition),
		primaryKey({ columns: [table.idJobApplication], name: "hris_job_applications_id_job_application" }),
	]);

export const hrisJobCreate = mysqlTable("hris_job_create", {
	idHrisJobCreate: int("id_hris_job_create").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	idDesignation: int("id_designation").notNull().references(() => hrDesignationMaster.designationId),
	numberOfEmployee: int("number_of_employee").notNull(),
	idUsers: int("id_users").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_department").on(table.idDepartment),
		index("id_designation").on(table.idDesignation),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisJobCreate], name: "hris_job_create_id_hris_job_create" }),
	]);

export const hrisJobCreateDetails = mysqlTable("hris_job_create_details", {
	idHrisJobCreateDetails: int("id_hris_job_create_details").autoincrement().notNull(),
	idHrisJobCreate: int("id_hris_job_create").notNull().references(() => hrisJobCreate.idHrisJobCreate),
	jobId: int("job_id"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	status: mysqlEnum(['New', 'Empty', 'Processing', 'Occupied']).default('New').notNull(),
},
	(table) => [
		index("id_hris_job_create").on(table.idHrisJobCreate),
		primaryKey({ columns: [table.idHrisJobCreateDetails], name: "hris_job_create_details_id_hris_job_create_details" }),
	]);

export const hrisJobDescription = mysqlTable("hris_job_description", {
	idHrisJobDescription: int("id_hris_job_description").autoincrement().notNull(),
	idUsers: int("id_users").notNull().references(() => hrEmployee.employeeId),
	reportingTo: int("reporting_to").notNull().references(() => hrEmployee.employeeId),
	jobNo: varchar("job_no", { length: 50 }),
	jobPurpose: text("job_purpose").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	gradeId: int("grade_id").notNull().references(() => hrGrades.idGrade),
	departmentId: int("department_id").notNull().references(() => hrDepartments.idDepartment),
	designationId: int("designation_id").notNull().references(() => hrDesignationMaster.designationId),
	workStationId: int("work_station_id").notNull().references(() => hrWorkStation.workStationId),
},
	(table) => [
		index("department_id").on(table.departmentId),
		index("designation_id").on(table.designationId),
		index("grade_id").on(table.gradeId),
		index("id_business_unit").on(table.idBusinessUnit),
		index("id_users").on(table.idUsers),
		index("work_station_id").on(table.workStationId),
		primaryKey({ columns: [table.idHrisJobDescription], name: "hris_job_description_id_hris_job_description" }),
	]);

export const hrisJobDescriptionDimension = mysqlTable("hris_job_description_dimension", {
	idHrisJdDimension: int("id_hris_jd_dimension").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	dimension: text().notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdDimension], name: "hris_job_description_dimension_id_hris_jd_dimension" }),
	]);

export const hrisJobDescriptionExperience = mysqlTable("hris_job_description_experience", {
	idHrisJdExperience: int("id_hris_jd_experience").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	experienceDetails: text("experience_details").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdExperience], name: "hris_job_description_experience_id_hris_jd_experience" }),
	]);

export const hrisJobDescriptionExternalCustomer = mysqlTable("hris_job_description_external_customer", {
	idHrisJdExternalCustomer: int("id_hris_jd_external_customer").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	externalCustomer: text("external_customer").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdExternalCustomer], name: "hris_job_description_external_customer_id_hris_jd_external_customer" }),
	]);

export const hrisJobDescriptionInternalCustomer = mysqlTable("hris_job_description_internal_customer", {
	idHrisJdInternalCustomer: int("id_hris_jd_internal_customer").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	internalCustomer: text("internal_customer").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdInternalCustomer], name: "hris_job_description_internal_customer_id_hris_jd_internal_customer" }),
	]);

export const hrisJobDescriptionNonPerformingAreas = mysqlTable("hris_job_description_non_performing_areas", {
	idJobDescriptionNonPerformingArea: int("id_job_description_non_performing_area").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idJobDescriptionPerformingArea: int("id_job_description_performing_area").notNull().references(() => hrisJobDescriptionPerformingArea.idHrisJdPerformingArea),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_job_description_performing_area").on(table.idJobDescriptionPerformingArea),
		primaryKey({ columns: [table.idJobDescriptionNonPerformingArea], name: "hris_job_description_non_performing_areas_id_job_description_non_performing_area" }),
	]);

export const hrisJobDescriptionPerformingArea = mysqlTable("hris_job_description_performing_area", {
	idHrisJdPerformingArea: int("id_hris_jd_performing_area").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	keyResultArea: text("key_result_area").notNull(),
	measureOfSuccess: text("measure_of_success").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdPerformingArea], name: "hris_job_description_performing_area_id_hris_jd_performing_area" }),
	]);

export const hrisJobDescriptionQualification = mysqlTable("hris_job_description_qualification", {
	idHrisJdQualification: int("id_hris_jd_qualification").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	qualificationDetails: text("qualification_details").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdQualification], name: "hris_job_description_qualification_id_hris_jd_qualification" }),
	]);

export const hrisJobDescriptionQualityParameter = mysqlTable("hris_job_description_quality_parameter", {
	idHrisJdQualityParameter: int("id_hris_jd_quality_parameter").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	qualityParameter: text("quality_parameter").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdQualityParameter], name: "hris_job_description_quality_parameter_id_hris_jd_quality_parameter" }),
	]);

export const hrisJobDescriptionSoftSkill = mysqlTable("hris_job_description_soft_skill", {
	idHrisJdSoftSkill: int("id_hris_jd_soft_skill").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	softSkill: text("soft_skill").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdSoftSkill], name: "hris_job_description_soft_skill_id_hris_jd_soft_skill" }),
	]);

export const hrisJobDescriptionSpecialRequirement = mysqlTable("hris_job_description_special_requirement", {
	idHrisJdSpecialRequirement: int("id_hris_jd_special_requirement").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	specialRequirement: text("special_requirement").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdSpecialRequirement], name: "hris_job_description_special_requirement_id_hris_jd_special_requirement" }),
	]);

export const hrisJobDescriptionTechnicalSkill = mysqlTable("hris_job_description_technical_skill", {
	idHrisJdTechnicalSkill: int("id_hris_jd_technical_skill").autoincrement().notNull(),
	idHrisJobDescription: int("id_hris_job_description").notNull().references(() => hrisJobDescription.idHrisJobDescription),
	technicalSkill: text("technical_skill").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_hris_job_description").on(table.idHrisJobDescription),
		primaryKey({ columns: [table.idHrisJdTechnicalSkill], name: "hris_job_description_technical_skill_id_hris_jd_technical_skill" }),
	]);

export const hrisJobRequisitionApprovalActivities = mysqlTable("hris_job_requisition_approval_activities", {
	idJobRequisitionApprovalActivity: int("id_job_requisition_approval_activity").autoincrement().notNull(),
	idJobRequisition: int("id_job_requisition").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	status: varchar({ length: 100 }).notNull(),
},
	(table) => [
		index("id_job_requisition").on(table.idJobRequisition),
		primaryKey({ columns: [table.idJobRequisitionApprovalActivity], name: "hris_job_requisition_approval_activities_id_job_requisition_approval_activity" }),
	]);

export const hrisJobRequisitionSummery = mysqlTable("hris_job_requisition_summery", {
	idHrisJobRequisitionSummery: int("id_hris_job_requisition_summery").autoincrement().notNull(),
	idProjects: int("id_projects").notNull().references(() => projects.idProjects),
	designationId: int("designation_id").notNull().references(() => hrDesignationMaster.designationId),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	totalPosts: int("total_posts").notNull(),
	idEmployeeNatureType: int("id_employee_nature_type").notNull().references(() => hrEmployeeNatureType.idEmployeeNatureType),
	positionSought: mysqlEnum("position_sought", ['New', 'Replacement']).notNull(),
	formerIncumbent: int("former_incumbent"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	tentativeJoiningDate: date("tentative_joining_date", { mode: 'string' }),
	requisitionRequestedBy: int("requisition_requested_by"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	requisitionDate: date("requisition_date", { mode: 'string' }),
	requisitionApprovedBy: int("requisition_approved_by"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	approvalDate: date("approval_date", { mode: 'string' }),
	remarks: text(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	managementType: mysqlEnum("management_type", ['Management', 'Non Management', 'MAX Worker']).notNull(),
	requisitionStatus: mysqlEnum("requisition_status", ['Pending', 'Done', 'Partial']).default('Pending').notNull(),
	deletedBy: int("deleted_by"),
	fileName: varchar("file_name", { length: 100 }),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("designation_id").on(table.designationId),
		index("id_department").on(table.idDepartment),
		index("id_projects").on(table.idProjects),
		index("id_users").on(table.idUsers),
		index("is_employee_nature_type").on(table.idEmployeeNatureType),
		primaryKey({ columns: [table.idHrisJobRequisitionSummery], name: "hris_job_requisition_summery_id_hris_job_requisition_summery" }),
	]);

export const hrisJobRequisitionSummeryFormerIncumbentEmployees = mysqlTable("hris_job_requisition_summery_former_incumbent_employees", {
	idHrisJobRequisitionSummeryFormerIncumbentEmployees: int("id_hris_job_requisition_summery_former_incumbent_employees").autoincrement().notNull(),
	idHrisJobRequisitionSummery: int("id_hris_job_requisition_summery").notNull(),
	employeeId: int("employee_id").notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisJobRequisitionSummeryFormerIncumbentEmployees], name: "hris_job_requisition_summery_former_incumbent_employees_id_hris_job_requisition_summery_former_incumbent_employees" }),
	]);

export const hrisJobRequisitionSummeryPotentialCandidateCv = mysqlTable("hris_job_requisition_summery_potential_candidate_cv", {
	idHrisJobRequisitionSummeryPotentialCandidateCv: int("id_hris_job_requisition_summery_potential_candidate_cv").autoincrement().notNull(),
	idHrisJobRequisitionSummery: int("id_hris_job_requisition_summery").notNull().references(() => hrisJobRequisitionSummery.idHrisJobRequisitionSummery),
	candidateName: text("candidate_name"),
	candidatePhoneNumber: varchar("candidate_phone_number", { length: 25 }).notNull(),
	comments: text(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	fileName: varchar("file_name", { length: 255 }),
	originalName: varchar("original_name", { length: 255 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	deletedBy: int("deleted_by"),
},
	(table) => [
		index("id_hris_job_requisition_summery").on(table.idHrisJobRequisitionSummery),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisJobRequisitionSummeryPotentialCandidateCv], name: "hris_job_requisition_summery_potential_candidate_cv_id_hris_job_requisition_summery_potential_candidate_cv" }),
	]);

export const hrisJobRequisitions = mysqlTable("hris_job_requisitions", {
	idJobRequisition: int("id_job_requisition").autoincrement().notNull(),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	idDesignation: int("id_designation").notNull().references(() => hrDesignationMaster.designationId),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	positionSought: mysqlEnum("position_sought", ['New', 'Replacement']).default('New').notNull(),
	idGrade: int("id_grade").references(() => hrGrades.idGrade),
	idEmployeeStatus: int("id_employee_status").notNull().references(() => hrEmployeeNatureType.idEmployeeNatureType),
	employeeType: mysqlEnum("employee_type", ['management', 'non-management']).default('non-management').notNull(),
	positionJustification: text("position_justification").notNull(),
	idDegree: int("id_degree").notNull(),
	idMajor: int("id_major"),
	result: varchar({ length: 30 }),
	gender: mysqlEnum(['Male', 'Female', 'Others']).default('Male').notNull(),
	idWorkStation: int("id_work_station").notNull().references(() => hrWorkStation.workStationId),
	budget: mysqlEnum(['yes', 'no']).default('yes').notNull(),
	minExperience: int("min_experience").default(0),
	maxExperience: int("max_experience"),
	minAge: int("min_age"),
	maxAge: int("max_age"),
	idRecommender: int("id_recommender").notNull().references(() => hrEmployee.employeeId),
	idProjectHr: int("id_project_hr").notNull().references(() => hrEmployee.employeeId),
	jdAttachment: varchar("jd_attachment", { length: 256 }),
	communicationSkills: varchar("communication_skills", { length: 256 }),
	status: mysqlEnum(['Pending For Recommender Approval', 'Pending For COO/CHRO Approval', 'Pending For Director/CEO Approval', 'Approved by Director/CEO', 'Denied by Project HR', 'Denied by COO/CHRO', 'Denied by Director/CEO', 'Denied by Recommender', 'Pending For Project HR Approval', 'Pending For Divisional HR Approval', 'Denied by Divisional HR', 'Approved']).default('Pending For Recommender Approval').notNull(),
	denyReason: text("deny_reason"),
	idCooChro: int("id_coo_chro").references(() => hrEmployee.employeeId),
	idCeo: int("id_ceo").references(() => hrEmployee.employeeId),
	idRecruitmentOfficer: int("id_recruitment_officer").references(() => hrEmployee.employeeId),
	idHrRecommendation: int("id_hr_recommendation").references(() => hrEmployee.employeeId),
	idCooRecommendation: int("id_coo_recommendation").references(() => hrEmployee.employeeId),
	hrRecommendationMessage: text("hr_recommendation_message"),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idRequester: int("id_requester").notNull().references(() => hrEmployee.employeeId),
	totalPosts: int("total_posts").notNull(),
	cooRecommendationMessage: text("coo_recommendation_message"),
	idDivisionalHr: int("id_divisional_hr").references(() => hrEmployee.employeeId),
	selectionStatus: mysqlEnum("selection_status", ['pending', 'complete']).default('pending').notNull(),
},
	(table) => [
		index("id_ceo").on(table.idCeo),
		index("id_coo_chro").on(table.idCooChro),
		index("id_coo_recommendation").on(table.idCooRecommendation),
		index("id_department").on(table.idDepartment),
		index("id_designation").on(table.idDesignation),
		index("id_divisional_hr").on(table.idDivisionalHr),
		index("id_employee_status").on(table.idEmployeeStatus),
		index("id_grade").on(table.idGrade),
		index("id_hr_recommendation").on(table.idHrRecommendation),
		index("id_project_hr").on(table.idProjectHr),
		index("id_recommender").on(table.idRecommender),
		index("id_recruitment_officer").on(table.idRecruitmentOfficer),
		index("id_requester").on(table.idRequester),
		index("id_work_station").on(table.idWorkStation),
		primaryKey({ columns: [table.idJobRequisition], name: "hris_job_requisitions_id_job_requisition" }),
	]);

export const hrisJobResponsibilities = mysqlTable("hris_job_responsibilities", {
	idJobResponsibility: int("id_job_responsibility").autoincrement().notNull(),
	responsibility: text().notNull(),
	idJobRequisition: int("id_job_requisition").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdate: timestamp("date_update", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("id_job_requisition").on(table.idJobRequisition),
		primaryKey({ columns: [table.idJobResponsibility], name: "hris_job_responsibilities_id_job_responsibility" }),
	]);

export const hrisLog = mysqlTable("hris_log", {
	idHrisLog: int("id_hris_log").autoincrement().notNull(),
	url: varchar({ length: 200 }),
	getData: text("get_data"),
	postData: text("post_data"),
	headerData: text("header_data"),
	idEmployee: int("id_employee"),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: varchar("user_agent", { length: 200 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	performanceTime: float("performance_time"),
},
	(table) => [
		primaryKey({ columns: [table.idHrisLog], name: "hris_log_id_hris_log" }),
	]);

export const hrisManPowerPlanning = mysqlTable("hris_man_power_planning", {
	idHrisManPowerPlanning: int("id_hris_man_power_planning").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	scanCopy: text("scan_copy"),
},
	(table) => [
		primaryKey({ columns: [table.idHrisManPowerPlanning], name: "hris_man_power_planning_id_hris_man_power_planning" }),
	]);

export const hrisManPowerPlanningDetails = mysqlTable("hris_man_power_planning_details", {
	idHrisManPowerPlanningDetails: int("id_hris_man_power_planning_details").autoincrement().notNull(),
	idDesignation: int("id_designation").notNull().references(() => hrDesignationMaster.designationId),
	numberOfPosition: int("number_of_position").notNull(),
	idHrisManPowerPlanning: int("id_hris_man_power_planning").notNull().references(() => hrisManPowerPlanning.idHrisManPowerPlanning),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisManPowerPlanningDetails], name: "hris_man_power_planning_details_id_hris_man_power_planning_details" }),
	]);

export const hrisMarkingSystemMaster = mysqlTable("hris_marking_system_master", {
	idHrisMarkingSystemMaster: int("id_hris_marking_system_master").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	markingPointName: varchar("marking_point_name", { length: 50 }).notNull(),
	markingPoint: int("marking_point").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisMarkingSystemMaster], name: "hris_marking_system_master_id_hris_marking_system_master" }),
	]);

export const hrisMediaMaster = mysqlTable("hris_media_master", {
	idMediaMaster: int("id_media_master").autoincrement().notNull(),
	mediaMasterName: varchar("media_master_name", { length: 50 }).notNull(),
	idMediaType: int("id_media_type").notNull().references(() => hrisMediaType.idMediaType),
	email: varchar({ length: 20 }),
	phone: varchar({ length: 20 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_media_type").on(table.idMediaType),
		primaryKey({ columns: [table.idMediaMaster], name: "hris_media_master_id_media_master" }),
	]);

export const hrisMediaType = mysqlTable("hris_media_type", {
	idMediaType: int("id_media_type").autoincrement().notNull(),
	typeName: varchar("type_name", { length: 50 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idMediaType], name: "hris_media_type_id_media_type" }),
	]);

export const hrisMenu = mysqlTable("hris_menu", {
	idMenu: int("id_menu").autoincrement().notNull(),
	menu: varchar({ length: 100 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).default('0000-00-00 00:00:00').onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idMenu], name: "hris_menu_id_menu" }),
	]);

export const hrisMenuSubmenu = mysqlTable("hris_menu_submenu", {
	idMenuSubmenu: int("id_menu_submenu").autoincrement().notNull(),
	idMenu: int("id_menu").notNull(),
	submenu: varchar({ length: 100 }).notNull(),
	submenuUrl: varchar("submenu_url", { length: 100 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).default('0000-00-00 00:00:00').onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idMenuSubmenu], name: "hris_menu_submenu_id_menu_submenu" }),
	]);

export const hrisPagePermission = mysqlTable("hris_page_permission", {
	idPagePermission: int("id_page_permission").autoincrement().notNull(),
	idMenuSubmenu: int("id_menu_submenu").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUser: int("id_user").notNull(),
	permittedBy: int("permitted_by").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	hasPermission: tinyint("has_permission").default(1).notNull(),
	idProject: int("id_project").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPagePermission], name: "hris_page_permission_id_page_permission" }),
	]);

export const hrisPerformanceAppraisalDateRanges = mysqlTable("hris_performance_appraisal_date_ranges", {
	idPerformanceAppraisalDateRange: int("id_performance_appraisal_date_range").autoincrement().notNull(),
	idPerformanceAppraisalSetup: int("id_performance_appraisal_setup").notNull().references(() => hrisPerformanceAppraisalSetup.idPerformanceAppraisalSetup),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }).notNull(),
	appraisalNo: int("appraisal_no").notNull(),
},
	(table) => [
		index("id_performance_appraisal_setup").on(table.idPerformanceAppraisalSetup),
		primaryKey({ columns: [table.idPerformanceAppraisalDateRange], name: "hris_performance_appraisal_date_ranges_id_performance_appraisal_date_range" }),
	]);

export const hrisPerformanceAppraisalSetup = mysqlTable("hris_performance_appraisal_setup", {
	idPerformanceAppraisalSetup: int("id_performance_appraisal_setup").autoincrement().notNull(),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	targetWorkFrom: date("target_work_from", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	targetWorkTo: date("target_work_to", { mode: 'string' }).notNull(),
	numberOfAppraise: int("number_of_appraise").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	flexibleDays: int("flexible_days").notNull(),
},
	(table) => [
		index("id_fiscal_year").on(table.idFiscalYear),
		primaryKey({ columns: [table.idPerformanceAppraisalSetup], name: "hris_performance_appraisal_setup_id_performance_appraisal_setup" }),
	]);

export const hrisPmsAppraisalApprovals = mysqlTable("hris_pms_appraisal_approvals", {
	idHrisPmsAppraisalApprovals: int("id_hris_pms_appraisal_approvals").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	idPerformanceAppraisalSetup: int("id_performance_appraisal_setup").notNull(),
	recommendedBy: int("recommended_by"),
	recommendedIncrement: decimal("recommended_increment", { precision: 10, scale: 2 }),
	recommendedIncrease: decimal("recommended_increase", { precision: 10, scale: 2 }),
	recommendedDesignation: int("recommended_designation"),
	approvedIncrement: decimal("approved_increment", { precision: 10, scale: 2 }),
	approvedIncrease: decimal("approved_increase", { precision: 10, scale: 2 }),
	approvedDesignation: int("approved_designation"),
	status: mysqlEnum(['Pending', 'Approved']).default('Pending'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idSupervisor: int("id_supervisor"),
	supervisorRecommendedIncrement: decimal("supervisor_recommended_increment", { precision: 10, scale: 2 }),
	supervisorRecommendedIncrease: decimal("supervisor_recommended_increase", { precision: 10, scale: 2 }),
	supervisorRecommendedDesignation: int("supervisor_recommended_designation"),
},
	(table) => [
		primaryKey({ columns: [table.idHrisPmsAppraisalApprovals], name: "hris_pms_appraisal_approvals_id_hris_pms_appraisal_approvals" }),
	]);

export const hrisPmsRecommendationDetails = mysqlTable("hris_pms_recommendation_details", {
	idPmsRecommendationDetails: int("id_pms_recommendation_details").autoincrement().notNull(),
	idPmsRecommendationMaster: int("id_pms_recommendation_master").notNull(),
	recommendationAsPerformance: varchar("recommendation_as_performance", { length: 100 }).notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idPmsRecommendationDetails], name: "hris_pms_recommendation_details_id_pms_recommendation_details" }),
	]);

export const hrisPmsRecommendationMaster = mysqlTable("hris_pms_recommendation_master", {
	idPmsRecommendationMaster: int("id_pms_recommendation_master").autoincrement().notNull(),
	idUser: int("id_user").notNull(),
	recommendationType: varchar("recommendation_type", { length: 50 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idPmsRecommendationMaster], name: "hris_pms_recommendation_master_id_pms_recommendation_master" }),
	]);

export const hrisPmsScoreMaster = mysqlTable("hris_pms_score_master", {
	idHrisPmsScoreMaster: int("id_hris_pms_score_master").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	pmsRank: varchar("pms_rank", { length: 50 }).notNull(),
	pmsPerformance: varchar("pms_performance", { length: 50 }).notNull(),
	pmsMaxScore: int("pms_max_score").notNull(),
	pmsMinScore: int("pms_min_score").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idPmsRecommendationMaster: int("id_pms_recommendation_master").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisPmsScoreMaster], name: "hris_pms_score_master_id_hris_pms_score_master" }),
	]);

export const hrisPolicies = mysqlTable("hris_policies", {
	idHrisPolicies: int("id_hris_policies").autoincrement().notNull(),
	policyName: varchar("policy_name", { length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	policyDate: date("policy_date", { mode: 'string' }).notNull(),
	policyRemarks: text("policy_remarks").notNull(),
	businessUnitType: varchar("business_unit_type", { length: 50 }).notNull(),
	businessUnitId: int("business_unit_id"),
	policyAttachment: varchar("policy_attachment", { length: 100 }).notNull(),
	idUsers: int("id_users").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		primaryKey({ columns: [table.idHrisPolicies], name: "hris_policies_id_hris_policies" }),
	]);

export const hrisPostOffices = mysqlTable("hris_post_offices", {
	idPostOffice: int("id_post_office").autoincrement().notNull(),
	postOfficeName: varchar("post_office_name", { length: 20 }),
	idThana: int("id_thana").notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPostOffice], name: "hris_post_offices_id_post_office" }),
	]);

export const hrisRentAgreementBenificiaryDetails = mysqlTable("hris_rent_agreement_benificiary_details", {
	idHrisRentAgreementBenificiaryDetails: int("id_hris_rent_agreement_benificiary_details").autoincrement().notNull(),
	idHrisRentAgreementDetails: int("id_hris_rent_agreement_details").notNull().references(() => hrisRentAgreementDetails.idHrisRentAgreementDetails),
	businessUnitIdBenificiary: int("business_unit_id_benificiary").notNull().references(() => projects.idProjects),
	costCenterIdBenificiary: int("cost_center_id_benificiary").notNull().references(() => costCenter.idCostCenter),
	benificiaryPercentage: int("benificiary_percentage").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		primaryKey({ columns: [table.idHrisRentAgreementBenificiaryDetails], name: "hris_rent_agreement_benificiary_details_id_hris_rent_agreement_benificiary_details" }),
	]);

export const hrisRentAgreementDetails = mysqlTable("hris_rent_agreement_details", {
	idHrisRentAgreementDetails: int("id_hris_rent_agreement_details").autoincrement().notNull(),
	workResidentType: mysqlEnum("work_resident_type", ['Resident', 'Workstation']).default('Workstation').notNull(),
	workOrResidentId: int("work_or_resident_id").notNull(),
	agreementName: varchar("agreement_name", { length: 255 }),
	agreementNumber: varchar("agreement_number", { length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	agreementDate: date("agreement_date", { mode: 'string' }).notNull(),
	agreementNote: text("agreement_note"),
	businessUnitIdLesses: int("business_unit_id_lesses").notNull().references(() => projects.idProjects),
	representorName: varchar("representor_name", { length: 255 }).notNull(),
	representorEmployeeId: int("representor_employee_id").notNull().references(() => hrEmployee.employeeId),
	representorEmployeeDesignaionId: int("representor_employee_designaion_id").notNull(),
	representorEmployeeFatherName: varchar("representor_employee_father_name", { length: 255 }),
	representorEmployeeAddress: varchar("representor_employee_address", { length: 255 }).notNull(),
	totalRent: decimal("total_rent", { precision: 12, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	rentEffectiveDate: date("rent_effective_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	rentExpireDate: date("rent_expire_date", { mode: 'string' }).notNull(),
	leesePeriodMonth: int("leese_period_month").notNull(),
	terminationNoticePeriod: int("termination_notice_period").notNull(),
	representorVendorId: int("representor_vendor_id").notNull().references(() => vendors.idVendors),
	bankId: int("bank_id").references(() => banksOriginal.idBanks),
	branchId: int("branch_id").references(() => hrBankBranchMaster.branchId),
	accountNumber: varchar("account_number", { length: 45 }),
	routingNumber: varchar("routing_number", { length: 45 }),
	paymentFrequency: mysqlEnum("payment_frequency", ['Monthly', 'Quarterly', 'HalfYearly', 'Yearly']).default('Monthly').notNull(),
	complyType: mysqlEnum("comply_type", ['Fully Comply', 'Partially Comply']).notNull(),
	complyNote: text("comply_note"),
	advanceType: mysqlEnum("advance_type", ['Month', 'Amount', 'NoAdvance']).default('Month').notNull(),
	advanceMonth: int("advance_month"),
	advanceRent: decimal("advance_rent", { precision: 12, scale: 2 }),
	advancePaid: decimal("advance_paid", { precision: 12, scale: 2 }).notNull(),
	advanceDue: decimal("advance_due", { precision: 12, scale: 2 }).notNull(),
	advanceCashAmount: decimal("advance_cash_amount", { precision: 12, scale: 2 }),
	advanceBankAmount: decimal("advance_bank_amount", { precision: 12, scale: 2 }),
	apEmployeeId: int("ap_employee_id").references(() => hrEmployee.employeeId),
	accountantEmployeeId: int("accountant_employee_id").references(() => hrEmployee.employeeId),
	advanceDeductionType: mysqlEnum("advance_deduction_type", ['Monthly', 'Refund', 'ExpireAdjustment']),
	advanceDeductionMonthlyAmount: decimal("advance_deduction_monthly_amount", { precision: 12, scale: 2 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	advanceDeductionStartMonth: date("advance_deduction_start_month", { mode: 'string' }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	leesePeriod: varchar("leese_period", { length: 45 }).notNull(),
	idVoucher: int("id_voucher").references(() => accVoucher.idVoucher),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	agreementNoteAttachment: varchar("agreement_note_attachment", { length: 100 }),
	agreementNoteAttachmentOriginalName: varchar("agreement_note_attachment_original_name", { length: 100 }),
	complyNoteAttachment: varchar("comply_note_attachment", { length: 100 }),
	complyNoteAttachmentOriginalName: varchar("comply_note_attachment_original_name", { length: 100 }),
},
	(table) => [
		primaryKey({ columns: [table.idHrisRentAgreementDetails], name: "hris_rent_agreement_details_id_hris_rent_agreement_details" }),
	]);

export const hrisRentAgreementFlatDetails = mysqlTable("hris_rent_agreement_flat_details", {
	idHrisRentAgreementFlatDetails: int("id_hris_rent_agreement_flat_details").autoincrement().notNull(),
	idHrisRentAgreementDetails: int("id_hris_rent_agreement_details").notNull(),
	workOrResidentFlatId: int("work_or_resident_flat_id").notNull(),
	idUsers: int("id_users").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).default('0000-00-00 00:00:00').onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisRentAgreementFlatDetails], name: "hris_rent_agreement_flat_details_id_hris_rent_agreement_flat_details" }),
	]);

export const hrisRentAgreementLessorsDetails = mysqlTable("hris_rent_agreement_lessors_details", {
	idHrisRentAgreementLessorsDetails: int("id_hris_rent_agreement_lessors_details").autoincrement().notNull(),
	idHrisRentAgreementDetails: int("id_hris_rent_agreement_details").notNull().references(() => hrisRentAgreementDetails.idHrisRentAgreementDetails),
	lessorName: varchar("lessor_name", { length: 255 }).notNull(),
	lessorFatherName: varchar("lessor_father_name", { length: 255 }).notNull(),
	lessorAddress: varchar("lessor_address", { length: 255 }).notNull(),
	lessorPhone: varchar("lessor_phone", { length: 45 }).notNull(),
	lessorEmail: varchar("lessor_email", { length: 45 }).notNull(),
	ownershipPercentage: int("ownership_percentage").notNull(),
	photoIdType: mysqlEnum("photo_id_type", ['Nid', 'BirthCertificate', 'Passport']).default('Nid').notNull(),
	photoId: varchar("photo_id", { length: 100 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	originalPhotoId: varchar("original_photo_id", { length: 100 }),
},
	(table) => [
		primaryKey({ columns: [table.idHrisRentAgreementLessorsDetails], name: "hris_rent_agreement_lessors_details_id_hris_rent_agreement_lessors_details" }),
	]);

export const hrisRentAgreementPaymentDetails = mysqlTable("hris_rent_agreement_payment_details", {
	idHrisRentAgreementPaymentDetails: int("id_hris_rent_agreement_payment_details").autoincrement().notNull(),
	idHrisRentAgreementDetails: int("id_hris_rent_agreement_details").notNull().references(() => hrisRentAgreementDetails.idHrisRentAgreementDetails),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idLedgers: int("id_ledgers").notNull().references(() => accLedgers.idLedgers),
	paymentType: mysqlEnum("payment_type", ['cash', 'bank']).default('cash').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	voucherDate: date("voucher_date", { mode: 'string' }).notNull(),
	paymentAmount: decimal("payment_amount", { precision: 12, scale: 2 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idVoucher: int("id_voucher"),
},
	(table) => [
		primaryKey({ columns: [table.idHrisRentAgreementPaymentDetails], name: "hris_rent_agreement_payment_details_id_hris_rent_agreement_payment_details" }),
	]);

export const hrisRentAgreementRentDetails = mysqlTable("hris_rent_agreement_rent_details", {
	idHrisRentAgreementRentDetails: int("id_hris_rent_agreement_rent_details").autoincrement().notNull(),
	idHrisRentAgreementDetails: int("id_hris_rent_agreement_details").notNull().references(() => hrisRentAgreementDetails.idHrisRentAgreementDetails),
	complyType: mysqlEnum("comply_type", ['Fully Comply', 'Partially Comply']).notNull(),
	rentBankAmount: decimal("rent_bank_amount", { precision: 12, scale: 2 }),
	rentCashAmount: decimal("rent_cash_amount", { precision: 12, scale: 2 }),
	vatDeductionPercentage: decimal("vat_deduction_percentage", { precision: 12, scale: 2 }),
	incomeTaxDeductionPercentage: decimal("income_tax_deduction_percentage", { precision: 12, scale: 2 }),
	vatDeductionAmount: decimal("vat_deduction_amount", { precision: 12, scale: 2 }),
	incomeTaxDeductionAmount: decimal("income_tax_deduction_amount", { precision: 12, scale: 2 }),
	status: mysqlEnum(['Running', 'Expired', 'Changed']).default('Running').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		primaryKey({ columns: [table.idHrisRentAgreementRentDetails], name: "hris_rent_agreement_rent_details_id_hris_rent_agreement_rent_details" }),
	]);

export const hrisRentGenerationAttachmentsDetails = mysqlTable("hris_rent_generation_attachments_details", {
	idHrisRentGenerationAttachmentsDetails: int("id_hris_rent_generation_attachments_details").autoincrement().notNull(),
	idHrisRentGenerationDetails: int("id_hris_rent_generation_details").notNull().references(() => hrisRentGenerationDetails.idHrisRentGenerationDetails),
	attachmentName: varchar("attachment_name", { length: 45 }).notNull(),
	attachmentImage: varchar("attachment_image", { length: 45 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	originalFile: varchar("original_file", { length: 100 }),
},
	(table) => [
		primaryKey({ columns: [table.idHrisRentGenerationAttachmentsDetails], name: "hris_rent_generation_attachments_details_id_hris_rent_generation_attachments_details" }),
	]);

export const hrisRentGenerationDetails = mysqlTable("hris_rent_generation_details", {
	idHrisRentGenerationDetails: int("id_hris_rent_generation_details").autoincrement().notNull(),
	workResidentType: mysqlEnum("work_resident_type", ['Resident', 'Workstation']).default('Workstation').notNull(),
	workOrResidentId: int("work_or_resident_id").notNull(),
	idHrisRentAgreementDetails: int("id_hris_rent_agreement_details").notNull().references(() => hrisRentAgreementDetails.idHrisRentAgreementDetails),
	rentFromYear: int("rent_from_year").notNull(),
	rentFromMonth: int("rent_from_month").notNull(),
	rentToYear: int("rent_to_year").notNull(),
	rentToMonth: int("rent_to_month").notNull(),
	totalRentMonth: varchar("total_rent_month", { length: 45 }).notNull(),
	totalRentAmount: decimal("total_rent_amount", { precision: 12, scale: 2 }).notNull(),
	advanceAdjustStatus: mysqlEnum("advance_adjust_status", ['true', 'false']).default('false').notNull(),
	advanceAdjustAmount: decimal("advance_adjust_amount", { precision: 12, scale: 2 }).notNull(),
	advanceAdjustReason: varchar("advance_adjust_reason", { length: 200 }),
	netRentAmount: decimal("net_rent_amount", { precision: 12, scale: 2 }).notNull(),
	rebateAmt: decimal("rebate_amt", { precision: 12, scale: 2 }).notNull(),
	vatDeductionAmount: decimal("vat_deduction_amount", { precision: 12, scale: 2 }).notNull(),
	taxDeductionAmount: decimal("tax_deduction_amount", { precision: 12, scale: 2 }).notNull(),
	netRentPayable: decimal("net_rent_payable", { precision: 12, scale: 2 }).notNull(),
	netPayableCashAmount: decimal("net_payable_cash_amount", { precision: 12, scale: 2 }).notNull(),
	netPayableBankAmount: decimal("net_payable_bank_amount", { precision: 12, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	lastPaymentDate: date("last_payment_date", { mode: 'string' }).notNull(),
	status: mysqlEnum(['Pending', 'Submitted', 'Checked', 'Certified', 'Approved', 'Denied']).default('Pending').notNull(),
	submittedBy: int("submitted_by").notNull().references(() => hrEmployee.employeeId),
	checkedBy: int("checked_by").notNull().references(() => hrEmployee.employeeId),
	certifiedBy: int("certified_by").notNull().references(() => hrEmployee.employeeId),
	approvedBy: int("approved_by").notNull().references(() => hrEmployee.employeeId),
	apEmployeeId: int("ap_employee_id").references(() => hrEmployee.employeeId),
	accountantEmployeeId: int("accountant_employee_id").references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull(),
	idVoucher: int("id_voucher"),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	deniedBy: int("denied_by"),
	deniedReason: text("denied_reason"),
},
	(table) => [
		index("accountant_employee_id").on(table.accountantEmployeeId),
		index("ap_employee_id").on(table.apEmployeeId),
		index("approved_by").on(table.approvedBy),
		index("certified_by").on(table.certifiedBy),
		index("checked_by").on(table.checkedBy),
		index("id_hris_rent_agreement_details").on(table.idHrisRentAgreementDetails),
		index("submitted_by").on(table.submittedBy),
		primaryKey({ columns: [table.idHrisRentGenerationDetails], name: "hris_rent_generation_details_id_hris_rent_generation_details" }),
	]);

export const hrisRentGenerationPaymentDetails = mysqlTable("hris_rent_generation_payment_details", {
	idHrisRentGenerationPaymentDetails: int("id_hris_rent_generation_payment_details").autoincrement().notNull(),
	idHrisRentGenerationDetails: int("id_hris_rent_generation_details").notNull().references(() => hrisRentGenerationDetails.idHrisRentGenerationDetails),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idLedgers: int("id_ledgers").notNull().references(() => accLedgers.idLedgers),
	paymentType: mysqlEnum("payment_type", ['cash', 'bank']).default('cash').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	voucherDate: date("voucher_date", { mode: 'string' }).notNull(),
	paymentAmount: decimal("payment_amount", { precision: 12, scale: 2 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisRentGenerationPaymentDetails], name: "hris_rent_generation_payment_details_id_hris_rent_generation_payment_details" }),
	]);

export const hrisResidentDetails = mysqlTable("hris_resident_details", {
	idHrisResidentDetails: int("id_hris_resident_details").autoincrement().notNull(),
	residentType: mysqlEnum("resident_type", ['Own', 'Rent']).default('Own').notNull(),
	buildingName: varchar("building_name", { length: 45 }).notNull(),
	houseNumber: varchar("house_number", { length: 45 }).notNull(),
	roadNumber: varchar("road_number", { length: 45 }).notNull(),
	location: varchar({ length: 45 }).notNull(),
	totalAreaSquareFeet: decimal("total_area_square_feet", { precision: 12, scale: 2 }).notNull(),
	totalRoom: int("total_room").notNull(),
	totalWashRoom: int("total_wash_room").notNull(),
	totalKitchen: int("total_kitchen").notNull(),
	totalStoreRoom: int("total_store_room").notNull(),
	totalCorridor: int("total_corridor").notNull(),
	totalCarParking: int("total_car_parking").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	buildingImage: varchar("building_image", { length: 100 }),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisResidentDetails], name: "hris_resident_details_id_hris_resident_details" }),
	]);

export const hrisResidentFlatDetails = mysqlTable("hris_resident_flat_details", {
	idHrisResidentFlatDetails: int("id_hris_resident_flat_details").autoincrement().notNull(),
	idHrisResidentFloorDetails: int("id_hris_resident_floor_details").notNull().references(() => hrisResidentFloorDetails.idHrisResidentFloorDetails),
	flatNo: varchar("flat_no", { length: 45 }).notNull(),
	floor: int().notNull(),
	squareFeet: decimal("square_feet", { precision: 12, scale: 2 }).notNull(),
	room: int().notNull(),
	washRoom: int("wash_room").notNull(),
	kitchen: int().notNull(),
	storeRoom: int("store_room").notNull(),
	corridor: int().notNull(),
	carParking: mysqlEnum("car_parking", ['Yes', 'No']).default('No').notNull(),
	floorDetailsData: mysqlEnum("floor_details_data", ['NotUpdated', 'Updated']).default('NotUpdated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_hris_resident_floor_details").on(table.idHrisResidentFloorDetails),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisResidentFlatDetails], name: "hris_resident_flat_details_id_hris_resident_flat_details" }),
	]);

export const hrisResidentFlatRoomDetails = mysqlTable("hris_resident_flat_room_details", {
	idHrisResidentFlatRoomDetails: int("id_hris_resident_flat_room_details").autoincrement().notNull(),
	idHrisResidentFlatDetails: int("id_hris_resident_flat_details").notNull().references(() => hrisResidentFlatDetails.idHrisResidentFlatDetails),
	roomNo: varchar("room_no", { length: 45 }),
	roomType: mysqlEnum("room_type", ['Single', 'Multiple', 'Hall Room', 'Prayer Room', 'Meeting Room', 'Dining Space']).default('Multiple').notNull(),
	noOfPerson: int("no_of_person").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_hris_resident_flat_details").on(table.idHrisResidentFlatDetails),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisResidentFlatRoomDetails], name: "hris_resident_flat_room_details_id_hris_resident_flat_room_details" }),
	]);

export const hrisResidentFloorDetails = mysqlTable("hris_resident_floor_details", {
	idHrisResidentFloorDetails: int("id_hris_resident_floor_details").autoincrement().notNull(),
	idHrisResidentDetails: int("id_hris_resident_details").notNull().references(() => hrisResidentDetails.idHrisResidentDetails),
	floor: int().notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_hris_resident_details").on(table.idHrisResidentDetails),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisResidentFloorDetails], name: "hris_resident_floor_details_id_hris_resident_floor_details" }),
	]);

export const hrisResponsibilityMatrixFunction = mysqlTable("hris_responsibility_matrix_function", {
	idHrisResponsibilityMatrixFunction: int("id_hris_responsibility_matrix_function").autoincrement().notNull(),
	functionName: varchar("function_name", { length: 200 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	remarks: text(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisResponsibilityMatrixFunction], name: "hris_responsibility_matrix_function_id_hris_responsibility_matrix_function" }),
	]);

export const hrisResponsibilityMatrixIncharge = mysqlTable("hris_responsibility_matrix_incharge", {
	idHrisResponsibilityMatrixIncharge: int("id_hris_responsibility_matrix_incharge").autoincrement().notNull(),
	subFunctionIncharge: int("sub_function_incharge").notNull(),
	idHrisResponsibilityMatrixSubFunction: int("id_hris_responsibility_matrix_sub_function").notNull().references(() => hrisResponsibilityMatrixSubFunction.idHrisResponsibilityMatrixSubFunction),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_hris_responsibility_matrix_sub_function").on(table.idHrisResponsibilityMatrixSubFunction),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisResponsibilityMatrixIncharge], name: "hris_responsibility_matrix_incharge_id_hris_responsibility_matrix_incharge" }),
	]);

export const hrisResponsibilityMatrixSubFunction = mysqlTable("hris_responsibility_matrix_sub_function", {
	idHrisResponsibilityMatrixSubFunction: int("id_hris_responsibility_matrix_sub_function").autoincrement().notNull(),
	subFunctionName: varchar("sub_function_name", { length: 250 }).notNull(),
	idHrisResponsibilityMatrixFunction: int("id_hris_responsibility_matrix_function").notNull().references(() => hrisResponsibilityMatrixFunction.idHrisResponsibilityMatrixFunction),
	idUsers: int("id_users").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_hris_responsibility_matrix_function").on(table.idHrisResponsibilityMatrixFunction),
		primaryKey({ columns: [table.idHrisResponsibilityMatrixSubFunction], name: "hris_responsibility_matrix_sub_function_id_hris_responsibility_matrix_sub_function" }),
	]);

export const hrisResponsibilitySubFunctionDetails = mysqlTable("hris_responsibility_sub_function_details", {
	idHrisResponsibilitySubFunctionDetails: int("id_hris_responsibility_sub_function_details").autoincrement().notNull(),
	subFunctionDetails: text("sub_function_details").notNull(),
	idHrisResponsibilitySubFunction: int("id_hris_responsibility_sub_function").notNull().references(() => hrisResponsibilityMatrixSubFunction.idHrisResponsibilityMatrixSubFunction),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_hris_responsibility_sub_function").on(table.idHrisResponsibilitySubFunction),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisResponsibilitySubFunctionDetails], name: "hris_responsibility_sub_function_details_id_hris_responsibility_sub_function_details" }),
	]);

export const hrisSpecialNotes = mysqlTable("hris_special_notes", {
	idSpecialNote: int("id_special_note").autoincrement().notNull(),
	specialNote: text("special_note"),
	idJobRequisition: int("id_job_requisition").notNull().references(() => hrisJobRequisitions.idJobRequisition),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_job_requisition").on(table.idJobRequisition),
		primaryKey({ columns: [table.idSpecialNote], name: "hris_special_notes_id_special_note" }),
	]);

export const hrisTalentAcquisitionJoiningDetails = mysqlTable("hris_talent_acquisition_joining_details", {
	idHrisTalentAcquisitionJoiningDetails: int("id_hris_talent_acquisition_joining_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idAppointmentLetter: int("id_appointment_letter").notNull().references(() => hrisInterviewAppraisedCandidates.idInterviewAppraisedCandidate, { onUpdate: "cascade" }),
	candidateId: int("candidate_id").notNull().references(() => hrisCandidateUsers.idCandidateUser),
	candidateName: varchar("candidate_name", { length: 50 }).notNull(),
	candidateDetails: varchar("candidate_details", { length: 250 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	joiningDate: date("joining_date", { mode: 'string' }).notNull(),
	provationPeriod: varchar("provation_period", { length: 50 }).notNull(),
	joiningLetterScanCopy: varchar("joining_letter_scan_copy", { length: 50 }),
	employeeFileReferenceNumber: varchar("employee_file_reference_number", { length: 50 }),
	corporateEmail: varchar("corporate_email", { length: 50 }).notNull(),
	corporateSim: varchar("corporate_sim", { length: 50 }).notNull(),
	corporateOfficeId: varchar("corporate_office_id", { length: 50 }).notNull(),
	concernSuperVisorId: int("concern_super_visor_id").notNull().references(() => hrEmployee.employeeId),
	concernHrId: int("concern_hr_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("candidate_id").on(table.candidateId),
		index("concern_hr_id").on(table.concernHrId),
		index("concern_super_visor_id").on(table.concernSuperVisorId),
		index("id_appointment_letter").on(table.idAppointmentLetter),
		index("id_project").on(table.idProject),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisTalentAcquisitionJoiningDetails], name: "hris_talent_acquisition_joining_details_id_hris_talent_acquisition_joining_details" }),
	]);

export const hrisTalentAcquisitionJoiningHandoverDocumentsDetails = mysqlTable("hris_talent_acquisition_joining_handover_documents_details", {
	idHrisTalentAcquisitionJoiningHandoverDocumentsDetails: int("id_hris_talent_acquisition_joining_handover_documents_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idHrisTalentAcquisitionJoiningDetails: int("id_hris_talent_acquisition_joining_details").notNull().references(() => hrisTalentAcquisitionJoiningDetails.idHrisTalentAcquisitionJoiningDetails),
	idHrisDocumentMaster: int("id_hris_document_master").notNull().references(() => hrisDocumentMaster.idHrisDocumentMaster),
	handoverDocumentStatus: mysqlEnum("handover_document_status", ['Yes', 'No']).default('No').notNull(),
	handoverDocumentImage: varchar("handover_document_image", { length: 50 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisTalentAcquisitionJoiningHandoverDocumentsDetails], name: "hris_talent_acquisition_joining_handover_documents_details_id_hris_talent_acquisition_joining_handover_documents_details" }),
	]);

export const hrisTalentAcquisitionJoiningReceiveDocumentsDetails = mysqlTable("hris_talent_acquisition_joining_receive_documents_details", {
	idHrisTalentAcquisitionJoiningReceiveDocumentsDetails: int("id_hris_talent_acquisition_joining_receive_documents_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idHrisTalentAcquisitionJoiningDetails: int("id_hris_talent_acquisition_joining_details").notNull().references(() => hrisTalentAcquisitionJoiningDetails.idHrisTalentAcquisitionJoiningDetails),
	idHrisDocumentMaster: int("id_hris_document_master").notNull().references(() => hrisDocumentMaster.idHrisDocumentMaster),
	receiveDocumentStatus: mysqlEnum("receive_document_status", ['Yes', 'No']).default('No').notNull(),
	receiveDocumentImage: varchar("receive_document_image", { length: 50 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisTalentAcquisitionJoiningReceiveDocumentsDetails], name: "hris_talent_acquisition_joining_receive_documents_details_id_hris_talent_acquisition_joining_receive_documents_details" }),
	]);

export const hrisThanas = mysqlTable("hris_thanas", {
	idThana: int("id_thana").autoincrement().notNull(),
	thanaName: varchar("thana_name", { length: 20 }),
	idDistrict: int("id_district").default(14).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idThana], name: "hris_thanas_id_thana" }),
	]);

export const hrisTraitsMaster = mysqlTable("hris_traits_master", {
	idHrisTraitsMaster: int("id_hris_traits_master").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	traitsName: varchar("traits_name", { length: 50 }).notNull(),
	traitsDescription: varchar("traits_description", { length: 1000 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_project").on(table.idProject),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisTraitsMaster], name: "hris_traits_master_id_hris_traits_master" }),
	]);

export const hrisTraitsSetupDetails = mysqlTable("hris_traits_setup_details", {
	idHrisTraitsSetupDetails: int("id_hris_traits_setup_details").autoincrement().notNull(),
	idProject: int("id_project").references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idDesignation: int("id_designation").notNull().references(() => hrDesignationMaster.designationId),
	idHrisTraitsMaster: int("id_hris_traits_master").notNull().references(() => hrisTraitsMaster.idHrisTraitsMaster),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	evaluationScoreCalculationPercentage: int("evaluation_score_calculation_percentage").notNull(),
},
	(table) => [
		index("id_designation").on(table.idDesignation),
		index("id_hris_traits_master").on(table.idHrisTraitsMaster),
		index("id_project").on(table.idProject),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisTraitsSetupDetails], name: "hris_traits_setup_details_id_hris_traits_setup_details" }),
	]);

export const hrisUniversities = mysqlTable("hris_universities", {
	idUniversity: int("id_university").autoincrement().notNull(),
	universityName: varchar("university_name", { length: 100 }).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idUniversity], name: "hris_universities_id_university" }),
	]);

export const hrisUserRoles = mysqlTable("hris_user_roles", {
	idUserRole: int("id_user_role").autoincrement().notNull(),
	idUser: int("id_user").notNull(),
	roleStatus: varchar("role_status", { length: 20 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	submittedBy: int("submitted_by").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idUserRole], name: "hris_user_roles_id_user_role" }),
	]);

export const hrisUtilityGenerationAttachmentsDetails = mysqlTable("hris_utility_generation_attachments_details", {
	idHrisUtilityGenerationAttachmentsDetails: int("id_hris_utility_generation_attachments_details").autoincrement().notNull(),
	idHrisUtilityGenerationDetails: int("id_hris_utility_generation_details").notNull().references(() => hrisUtilityGenerationDetails.idHrisUtilityGenerationDetails),
	attachmentName: varchar("attachment_name", { length: 45 }).notNull(),
	attachmentImage: varchar("attachment_image", { length: 45 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	originalFile: varchar("original_file", { length: 100 }),
},
	(table) => [
		primaryKey({ columns: [table.idHrisUtilityGenerationAttachmentsDetails], name: "hris_utility_generation_attachments_details_id_hris_utility_generation_attachments_details" }),
	]);

export const hrisUtilityGenerationChargeDetails = mysqlTable("hris_utility_generation_charge_details", {
	idHrisUtilityGenerationChargeDetails: int("id_hris_utility_generation_charge_details").autoincrement().notNull(),
	idHrisUtilityGenerationDetails: int("id_hris_utility_generation_details").notNull().references(() => hrisUtilityGenerationDetails.idHrisUtilityGenerationDetails),
	idHrisUtilityService: int("id_hris_utility_service").notNull().references(() => hrisUtilityService.idHrisUtilityService),
	utilityChargeAmount: int("utility_charge_amount").notNull(),
	utilityChargeYear: int("utility_charge_year").notNull(),
	utilityChargeMonth: int("utility_charge_month").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_hris_utility_generation_details").on(table.idHrisUtilityGenerationDetails),
		index("id_hris_utility_service").on(table.idHrisUtilityService),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisUtilityGenerationChargeDetails], name: "hris_utility_generation_charge_details_id_hris_utility_generation_charge_details" }),
	]);

export const hrisUtilityGenerationDetails = mysqlTable("hris_utility_generation_details", {
	idHrisUtilityGenerationDetails: int("id_hris_utility_generation_details").autoincrement().notNull(),
	workResidentType: mysqlEnum("work_resident_type", ['Resident', 'Workstation']).default('Workstation').notNull(),
	workOrResidentId: int("work_or_resident_id").notNull(),
	idHrisRentAgreementDetails: int("id_hris_rent_agreement_details").notNull().references(() => hrisRentAgreementDetails.idHrisRentAgreementDetails),
	utilityFromYear: int("utility_from_year").notNull(),
	utilityFromMonth: int("utility_from_month").notNull(),
	utilityToYear: int("utility_to_year").notNull(),
	utilityToMonth: int("utility_to_month").notNull(),
	totalUtilityMonth: varchar("total_utility_month", { length: 45 }).notNull(),
	totalUtilityAmount: decimal("total_utility_amount", { precision: 12, scale: 2 }).notNull(),
	utilityCashAmount: decimal("utility_cash_amount", { precision: 12, scale: 2 }).notNull(),
	utilityBankAmount: decimal("utility_bank_amount", { precision: 12, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	lastPaymentDate: date("last_payment_date", { mode: 'string' }).notNull(),
	status: mysqlEnum(['Pending', 'Submitted', 'Checked', 'Certified', 'Approved', 'Denied']).default('Pending').notNull(),
	submittedBy: int("submitted_by").notNull().references(() => hrEmployee.employeeId),
	checkedBy: int("checked_by").notNull().references(() => hrEmployee.employeeId),
	certifiedBy: int("certified_by").notNull().references(() => hrEmployee.employeeId),
	approvedBy: int("approved_by").notNull().references(() => hrEmployee.employeeId),
	apEmployeeId: int("ap_employee_id").references(() => hrEmployee.employeeId),
	accountantEmployeeId: int("accountant_employee_id").references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull(),
	idVoucher: int("id_voucher"),
	paymentStatus: mysqlEnum("payment_status", ['Pending', 'Partial', 'Completed']).default('Pending').notNull(),
	deniedBy: int("denied_by"),
	deniedReason: text("denied_reason"),
},
	(table) => [
		index("accountant_employee_id").on(table.accountantEmployeeId),
		index("ap_employee_id").on(table.apEmployeeId),
		index("approved_by").on(table.approvedBy),
		index("certified_by").on(table.certifiedBy),
		index("checked_by").on(table.checkedBy),
		index("id_hris_rent_agreement_details").on(table.idHrisRentAgreementDetails),
		index("submitted_by").on(table.submittedBy),
		primaryKey({ columns: [table.idHrisUtilityGenerationDetails], name: "hris_utility_generation_details_id_hris_utility_generation_details" }),
	]);

export const hrisUtilityGenerationPaymentDetails = mysqlTable("hris_utility_generation_payment_details", {
	idHrisUtilityGenerationPaymentDetails: int("id_hris_utility_generation_payment_details").autoincrement().notNull(),
	idHrisUtilityGenerationDetails: int("id_hris_utility_generation_details").notNull().references(() => hrisUtilityGenerationDetails.idHrisUtilityGenerationDetails),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idLedgers: int("id_ledgers").notNull().references(() => accLedgers.idLedgers),
	paymentType: mysqlEnum("payment_type", ['cash', 'bank']).default('cash').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	voucherDate: date("voucher_date", { mode: 'string' }).notNull(),
	paymentAmount: decimal("payment_amount", { precision: 12, scale: 2 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idHrisUtilityGenerationPaymentDetails], name: "hris_utility_generation_payment_details_id_hris_utility_generation_payment_details" }),
	]);

export const hrisUtilityService = mysqlTable("hris_utility_service", {
	idHrisUtilityService: int("id_hris_utility_service").autoincrement().notNull(),
	utilityName: varchar("utility_name", { length: 150 }).notNull(),
	utilityDetails: text("utility_details"),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	dateCreted: timestamp("date_creted", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisUtilityService], name: "hris_utility_service_id_hris_utility_service" }),
	]);

export const hrisWorkStationDetails = mysqlTable("hris_work_station_details", {
	idHrisWorkStationDetails: int("id_hris_work_station_details").autoincrement().notNull(),
	workStationId: int("work_station_id").notNull().references(() => hrWorkStation.workStationId),
	workStationType: mysqlEnum("work_station_type", ['Own', 'Rent']).default('Own').notNull(),
	buildingName: varchar("building_name", { length: 45 }).notNull(),
	houseNumber: varchar("house_number", { length: 45 }).notNull(),
	roadNumber: varchar("road_number", { length: 45 }).notNull(),
	location: varchar({ length: 45 }).notNull(),
	totalAreaSquareFeet: decimal("total_area_square_feet", { precision: 12, scale: 2 }).notNull(),
	totalRoom: int("total_room").notNull(),
	totalWashRoom: int("total_wash_room").notNull(),
	totalKitchen: int("total_kitchen").notNull(),
	totalStoreRoom: int("total_store_room").notNull(),
	totalCorridor: int("total_corridor").notNull(),
	totalCarParking: int("total_car_parking").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	buildingImage: varchar("building_image", { length: 100 }),
	originalName: varchar("original_name", { length: 100 }),
},
	(table) => [
		index("id_users").on(table.idUsers),
		index("work_station_id").on(table.workStationId),
		primaryKey({ columns: [table.idHrisWorkStationDetails], name: "hris_work_station_details_id_hris_work_station_details" }),
	]);

export const hrisWorkStationFlatDetails = mysqlTable("hris_work_station_flat_details", {
	idHrisWorkStationFlatDetails: int("id_hris_work_station_flat_details").autoincrement().notNull(),
	idHrisWorkStationFloorDetails: int("id_hris_work_station_floor_details").notNull().references(() => hrisWorkStationFloorDetails.idHrisWorkStationFloorDetails),
	flatNo: varchar("flat_no", { length: 45 }).notNull(),
	floor: int().notNull(),
	squareFeet: decimal("square_feet", { precision: 12, scale: 2 }).notNull(),
	room: int().notNull(),
	washRoom: int("wash_room").notNull(),
	kitchen: int().notNull(),
	storeRoom: int("store_room").notNull(),
	corridor: int().notNull(),
	carParking: mysqlEnum("car_parking", ['Yes', 'No']).default('No').notNull(),
	floorDetailsData: mysqlEnum("floor_details_data", ['NotUpdated', 'Updated']).default('NotUpdated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_hris_work_station_floor_details").on(table.idHrisWorkStationFloorDetails),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisWorkStationFlatDetails], name: "hris_work_station_flat_details_id_hris_work_station_flat_details" }),
	]);

export const hrisWorkStationFlatRoomDetails = mysqlTable("hris_work_station_flat_room_details", {
	idHrisWorkStationFlatRoomDetails: int("id_hris_work_station_flat_room_details").autoincrement().notNull(),
	idHrisWorkStationFlatDetails: int("id_hris_work_station_flat_details").notNull().references(() => hrisWorkStationFlatDetails.idHrisWorkStationFlatDetails),
	roomNo: varchar("room_no", { length: 45 }).notNull(),
	roomType: mysqlEnum("room_type", ['Single', 'Multiple', 'Hall Room', 'Prayer Room', 'Meeting Room', 'Dining Space']).default('Multiple').notNull(),
	noOfPerson: int("no_of_person").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_hris_work_station_flat_details").on(table.idHrisWorkStationFlatDetails),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisWorkStationFlatRoomDetails], name: "hris_work_station_flat_room_details_id_hris_work_station_flat_room_details" }),
	]);

export const hrisWorkStationFloorDetails = mysqlTable("hris_work_station_floor_details", {
	idHrisWorkStationFloorDetails: int("id_hris_work_station_floor_details").autoincrement().notNull(),
	idHrisWorkStationDetails: int("id_hris_work_station_details").notNull().references(() => hrisWorkStationDetails.idHrisWorkStationDetails),
	floor: int().notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
},
	(table) => [
		index("id_hris_work_station_details").on(table.idHrisWorkStationDetails),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idHrisWorkStationFloorDetails], name: "hris_work_station_floor_details_id_hris_work_station_floor_details" }),
	]);

export const porAdvance = mysqlTable("por_advance", {
	idPorAdvance: int("id_por_advance").autoincrement().notNull(),
	idAdvanceTemplate: int("id_advance_template").notNull(),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	idCurSalBusUnit: int("id_cur_sal_bus_unit"),
	amount: decimal({ precision: 13, scale: 2 }).notNull(),
	noOfInstallment: int("no_of_installment").notNull(),
	monthlyDeductionAmnt: decimal("monthly_deduction_amnt", { precision: 13, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }).notNull(),
	reasonForAdvance: text("reason_for_advance"),
	remark: text(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	voucherNo: int("voucher_no"),
	paid: decimal({ precision: 13, scale: 2 }).default('0.00'),
	due: decimal({ precision: 13, scale: 2 }).default('0.00'),
	idCurBusinessUnit: int("id_cur_business_unit").references(() => projects.idProjects),
	budgetConnection: mysqlEnum("budget_connection", ['yes', 'no']).default('no').notNull(),
	approvedSupervisorId: int("approved_supervisor_id").references(() => hrEmployee.employeeId),
	approvedHrId: int("approved_hr_id").references(() => hrEmployee.employeeId),
	status: mysqlEnum(['deleted_by_employee', 'pending_for_supervisor_approval', 'approved_by_supervisor', 'approved_by_hr', 'denied_by_supervisor', 'denied_by_hr']).default('pending_for_supervisor_approval').notNull(),
	approvedAmount: decimal("approved_amount", { precision: 13, scale: 2 }),
},
	(table) => [
		index("approved_hr_id").on(table.approvedHrId),
		index("approved_supervisor_id").on(table.approvedSupervisorId),
		index("id_cur_business_unit").on(table.idCurBusinessUnit),
		index("id_employee").on(table.idEmployee),
		primaryKey({ columns: [table.idPorAdvance], name: "por_advance_id_por_advance" }),
	]);

export const porAppFcmTokens = mysqlTable("por_app_fcm_tokens", {
	id: int().autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	fcmToken: varchar("fcm_token", { length: 255 }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.id], name: "por_app_fcm_tokens_id" }),
	]);

export const porAttendance = mysqlTable("por_attendance", {
	idPorAttendance: int("id_por_attendance").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	inTime: time("in_time").notNull(),
	outTime: time("out_time").notNull(),
	type: mysqlEnum(['Partial Info', 'Early Out', 'Late Present - Early Out', 'Late Present', 'Present']).default('Partial Info').notNull(),
	status: mysqlEnum(['pending', 'deleted', 'acknowledged', 'approved', 'denied']).default('pending').notNull(),
	reason: text().notNull(),
	dateCreated: timestamp("date_created", { fsp: 6, mode: 'string' }).default(sql`(CURRENT_TIMESTAMP(6))`).notNull(),
	dateUpdated: timestamp("date_updated", { fsp: 6, mode: 'string' }).default(sql`(CURRENT_TIMESTAMP(6))`).onUpdateNow(),
	expendedTime: bigint("expended_time", { mode: "number" }).notNull(),
	idAttendance: int("id_attendance").notNull(),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
	lineSupervisorRemark: text("line_supervisor_remark"),
	reportingSupervisorRemark: text("reporting_supervisor_remark"),
	hrRemark: text("hr_remark"),
	lineSupervisorId: int("line_supervisor_id").references(() => hrEmployee.employeeId),
	reportingSupervisorId: int("reporting_supervisor_id"),
	hrId: int("hr_id").references(() => hrEmployee.employeeId),
},
	(table) => [
		index("hr_id").on(table.hrId),
		index("line_supervisor_id").on(table.lineSupervisorId),
		primaryKey({ columns: [table.idPorAttendance], name: "por_attendance_id_por_attendance" }),
	]);

export const porAttendanceHistory = mysqlTable("por_attendance_history", {
	idPorAttendanceHistory: int("id_por_attendance_history").autoincrement().notNull(),
	idPorAttendance: int("id_por_attendance").notNull(),
	status: varchar({ length: 15 }).notNull(),
	actionTakenBy: int("action_taken_by").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorAttendanceHistory], name: "por_attendance_history_id_por_attendance_history" }),
	]);

export const porBulletinBoard = mysqlTable("por_bulletin_board", {
	idPorBulletin: int("id_por_bulletin").autoincrement().notNull(),
	title: text().notNull(),
	body: longtext().notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: varchar("publication_status", { length: 100 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	publishFrom: date("publish_from", { mode: 'string' }).notNull(),
	bulletinTag: varchar("bulletin_tag", { length: 100 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorBulletin], name: "por_bulletin_board_id_por_bulletin" }),
	]);

export const porCertificateMaster = mysqlTable("por_certificate_master", {
	idPorCertificateMaster: int("id_por_certificate_master").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	supervisorApproval: mysqlEnum("supervisor_approval", ['Yes', 'No']).default('Yes').notNull(),
	certificateName: varchar("certificate_name", { length: 50 }).notNull(),
	certificateDescription: varchar("certificate_description", { length: 1000 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("hris_citeria_master_ibfk_2").on(table.idUsers),
		index("id_project").on(table.idProject),
		primaryKey({ columns: [table.idPorCertificateMaster], name: "por_certificate_master_id_por_certificate_master" }),
	]);

export const porCertificateRequest = mysqlTable("por_certificate_request", {
	idCertificateRequest: int("id_certificate_request").autoincrement().notNull(),
	certificateType: varchar("certificate_type", { length: 100 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	deliveryDate: date("delivery_date", { mode: 'string' }).notNull(),
	reason: text().notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	requestedBy: int("requested_by").notNull().references(() => hrEmployee.employeeId),
	requestStatus: mysqlEnum("request_status", ['Pending', 'Approved', 'Deleted', 'Denied', 'Done', 'Acknowledged', 'Pending For Report Supervisor']).default('Pending').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }),
	nocCountry: varchar("noc_country", { length: 100 }),
	actionTakenBy: int("action_taken_by"),
	idPorCertificateMaster: int("id_por_certificate_master").notNull().references(() => porCertificateMaster.idPorCertificateMaster),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	resignationDate: date("resignation_date", { mode: 'string' }),
	originalFile: varchar("original_file", { length: 250 }),
	file: varchar({ length: 250 }),
	isAttached: mysqlEnum("is_attached", ['yes', 'no']).default('no').notNull(),
	deniedBy: int("denied_by"),
	deniedReason: text("denied_reason"),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
},
	(table) => [
		index("id").on(table.idPorCertificateMaster),
		index("requested_by").on(table.requestedBy),
		primaryKey({ columns: [table.idCertificateRequest], name: "por_certificate_request_id_certificate_request" }),
	]);

export const porCompensationBenefitDetails = mysqlTable("por_compensation_benefit_details", {
	idPorCompensationBenefitDetails: int("id_por_compensation_benefit_details").autoincrement().notNull(),
	idUsers: int("id_users").notNull(),
	idInterViewSetupDetails: int("id_inter_view_setup_details").notNull(),
	existingSalary: int("existing_salary").notNull(),
	expectedSalary: int("expected_salary").notNull(),
	negotiatedSalary: int("negotiated_salary").notNull(),
	existingMobileBill: int("existing_mobile_bill"),
	expectedMobileBill: int("expected_mobile_bill"),
	negotiatedMobileBill: int("negotiated_mobile_bill"),
	existingTransport: varchar("existing_transport", { length: 500 }),
	expectedTransport: varchar("expected_transport", { length: 500 }),
	negotiatedTransport: varchar("negotiated_transport", { length: 500 }),
	noticePeriod: varchar("notice_period", { length: 500 }),
	exitingOthers: varchar("exiting_others", { length: 500 }),
	expectedOthers: varchar("expected_others", { length: 500 }),
	negotiatedOthers: varchar("negotiated_others", { length: 500 }),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorCompensationBenefitDetails], name: "por_compensation_benefit_details_id_por_compensation_benefit_details" }),
	]);

export const porCompensatoryLeaves = mysqlTable("por_compensatory_leaves", {
	idPorCompensatoryLeave: int("id_por_compensatory_leave").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	idBusinessUnit: int("id_business_unit").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateOfDuty: date("date_of_duty", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	cplDate: date("cpl_date", { mode: 'string' }),
	year: int().notNull(),
	month: int().notNull(),
	type: mysqlEnum(['allowance', 'cpl', 'monthly']).default('cpl').notNull(),
	status: mysqlEnum(['approved', 'pending', 'acknowledged', 'deleted', 'denied', 'done', 'pending for report supervisor']).default('pending').notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	remark: varchar({ length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }),
	noOfDays: int("no_of_days"),
	replacementPerson: int("replacement_person"),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
	lineSupervisorId: int("line_supervisor_id").references(() => hrEmployee.employeeId),
	reportingSupervisorId: int("reporting_supervisor_id").references(() => hrEmployee.employeeId),
	leaveHrId: int("leave_hr_id"),
	buHrId: int("bu_hr_id").references(() => hrEmployee.employeeId),
	lineSupervisorRemark: text("line_supervisor_remark"),
	reportingSupervisorRemark: text("reporting_supervisor_remark"),
	leaveHrRemark: text("leave_hr_remark"),
	buHrRemark: text("bu_hr_remark"),
},
	(table) => [
		index("hr_id").on(table.buHrId),
		index("line_supervisor_id").on(table.lineSupervisorId),
		index("report_supervisor_id").on(table.reportingSupervisorId),
		primaryKey({ columns: [table.idPorCompensatoryLeave], name: "por_compensatory_leaves_id_por_compensatory_leave" }),
	]);

export const porEmployee = mysqlTable("por_employee", {
	porEmployeeId: int("por_employee_id").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	phoneNumber: varchar("phone_number", { length: 45 }).notNull(),
	gender: varchar({ length: 45 }),
	maritalStatus: varchar("marital_status", { length: 45 }),
	fatherName: varchar("father_name", { length: 45 }).notNull(),
	motherName: varchar("mother_name", { length: 45 }).notNull(),
	presentAddress: text("present_address").notNull(),
	permanantAddress: text("permanant_address").notNull(),
	email: varchar({ length: 100 }).notNull(),
	nid: varchar({ length: 100 }).notNull(),
	bloodGroup: varchar("blood_group", { length: 45 }),
	religion: varchar({ length: 45 }),
	avatar: varchar({ length: 45 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dob: date({ mode: 'string' }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated'),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	telephoneNumber: varchar("telephone_number", { length: 100 }).notNull(),
	drivingLiscence: varchar("driving_liscence", { length: 200 }).notNull(),
	spouseName: varchar("spouse_name", { length: 100 }).notNull(),
	passport: varchar({ length: 100 }).notNull(),
	birthCertificateNumber: varchar("birth_certificate_number", { length: 100 }).notNull(),
	emergencyPhoneNumber: varchar("emergency_phone_number", { length: 100 }).notNull(),
	homeDistrict: varchar("home_district", { length: 100 }),
	status: mysqlEnum(['Pending', 'Approved', 'Denied']).default('Approved').notNull(),
	employeeCustomId: varchar("employee_custom_id", { length: 100 }).notNull(),
	spouseProfession: varchar("spouse_profession", { length: 100 }),
	spouseDob: varchar("spouse_dob", { length: 100 }),
	spouseBloodGroup: varchar("spouse_blood_group", { length: 100 }),
	marraigeDate: varchar({ length: 100 }),
	emergencyContactName: varchar("emergency_contact_name", { length: 100 }),
	emergencyContactRelation: varchar("emergency_contact_relation", { length: 100 }),
	tinNumber: varchar("tin_number", { length: 100 }),
	tinCertificate: varchar("tin_certificate", { length: 100 }),
	firstName: varchar("first_name", { length: 100 }),
	middleName: varchar("middle_name", { length: 100 }),
	lastName: varchar("last_name", { length: 100 }),
	fullName: varchar("full_name", { length: 100 }).notNull(),
	taxCircle: varchar("tax_circle", { length: 100 }),
	taxZone: varchar("tax_zone", { length: 100 }),
	tinOriginalName: varchar("tin_original_name", { length: 100 }),
	idHrTaxAreaType: int("id_hr_tax_area_type"),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.porEmployeeId], name: "por_employee_por_employee_id" }),
	]);

export const porEmployeeAppraisalDetails = mysqlTable("por_employee_appraisal_details", {
	idPorEmployeeAppraisalDetails: int("id_por_employee_appraisal_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	appraisalHeadPmPdCeoId: int("appraisal_head_pm_pd_ceo_id").notNull().references(() => hrEmployee.employeeId),
	idPerformanceAppraisalSetup: int("id_performance_appraisal_setup").references(() => hrisPerformanceAppraisalSetup.idPerformanceAppraisalSetup),
	appraisalStatus: mysqlEnum("appraisal_status", ['Employee Submitted', 'Head/PM/PD/CEO Approved', 'Head/PM/PD/CEO Denied', 'Supervisor 1st Reviewed', 'Supervisor 2nd Reviewed', 'Supervisor 3rd Reviewed']).default('Employee Submitted').notNull(),
	additionalAppraisorType: mysqlEnum("additional_appraisor_type", ['Yes', 'No']).notNull(),
	additionalAppraisorId: int("additional_appraisor_id"),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("appraisal_head_pm_pd_ceo_id").on(table.appraisalHeadPmPdCeoId),
		index("employee_id").on(table.employeeId),
		index("id_performance_appraisal_setup").on(table.idPerformanceAppraisalSetup),
		index("id_project").on(table.idProject),
		primaryKey({ columns: [table.idPorEmployeeAppraisalDetails], name: "por_employee_appraisal_details_id_por_employee_appraisal_details" }),
	]);

export const porEmployeeAppraisalTargetDetails = mysqlTable("por_employee_appraisal_target_details", {
	idPorEmployeeAppraisalTargetDetails: int("id_por_employee_appraisal_target_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => hrEmployee.employeeId),
	idPorEmployeeAppraisalDetails: int("id_por_employee_appraisal_details").notNull().references(() => porEmployeeAppraisalDetails.idPorEmployeeAppraisalDetails),
	kras: varchar({ length: 2000 }).notNull(),
	kpis: varchar({ length: 2000 }).notNull(),
	presentState: varchar("present_state", { length: 1000 }).notNull(),
	desiredState: varchar("desired_state", { length: 1000 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorEmployeeAppraisalTargetDetails], name: "por_employee_appraisal_target_details_id_por_employee_appraisal_target_details" }),
	]);

export const porEmployeeCarAit = mysqlTable("por_employee_car_ait", {
	idPorEmployeeCarAit: int("id_por_employee_car_ait").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	approverId: int("approver_id").notNull().references(() => hrEmployee.employeeId),
	idFiscalYear: int("id_fiscal_year").notNull().references(() => accFiscalYear.idFiscalYear),
	carAitAmount: double("car_ait_amount", { precision: 12, scale: 2 }).notNull(),
	status: mysqlEnum(['pending', 'approved', 'deleted', 'denied', 'expired']).default('pending').notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	carAitAttachment: text("car_ait_attachment"),
	carAitOriginalName: text("car_ait_original_name"),
	reason: text(),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	aitSubmissionDate: date("ait_submission_date", { mode: 'string' }).notNull(),
},
	(table) => [
		index("approver_id").on(table.approverId),
		index("employee_id").on(table.employeeId),
		index("id_fiscal_year").on(table.idFiscalYear),
		primaryKey({ columns: [table.idPorEmployeeCarAit], name: "por_employee_car_ait_id_por_employee_car_ait" }),
	]);

export const porEmployeeHr = mysqlTable("por_employee_hr", {
	idEmployeeHr: int("id_employee_hr").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idEmployeeHr], name: "por_employee_hr_id_employee_hr" }),
	]);

export const porEmployeeHrDetails = mysqlTable("por_employee_hr_details", {
	idEmployeeHrDetails: int("id_employee_hr_details").autoincrement().notNull(),
	hrId: int("hr_id").notNull().references(() => hrEmployee.employeeId),
	type: varchar({ length: 50 }).notNull(),
	idEmployeeHr: int("id_employee_hr").notNull().references(() => porEmployeeHr.idEmployeeHr),
	status: mysqlEnum(['Pending', 'Deleted', 'Denied', 'Approved', 'Removed']).default('Pending').notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	deletedBy: int("deleted_by").references(() => users.idUsers),
	idUsers: int("id_users").references(() => users.idUsers),
},
	(table) => [
		index("deleted_by").on(table.deletedBy),
		index("hr_id").on(table.hrId),
		index("id_employee_hr").on(table.idEmployeeHr),
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idEmployeeHrDetails], name: "por_employee_hr_details_id_employee_hr_details" }),
	]);

export const porEmployeeReview = mysqlTable("por_employee_review", {
	idPorEmployeeReview: int("id_por_employee_review").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	reviewSubmittedBy: int("review_submitted_by").notNull().references(() => hrEmployee.employeeId),
	review: text().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	reminderDate: date("reminder_date", { mode: 'string' }).notNull(),
	reviewerRole: mysqlEnum("reviewer_role", ['Line Supervisor', 'Report Supervisor', 'Audit Team', 'Reviewer']),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("review_submitted_by").on(table.reviewSubmittedBy),
		primaryKey({ columns: [table.idPorEmployeeReview], name: "por_employee_review_id_por_employee_review" }),
	]);

export const porEmployeeReviewReminder = mysqlTable("por_employee_review_reminder", {
	idEmployeeReviewReminder: int("id_employee_review_reminder").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	reviewerId: int("reviewer_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('App').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idEmployeeReviewReminder], name: "por_employee_review_reminder_id_employee_review_reminder" }),
	]);

export const porEmployeeSupervisor = mysqlTable("por_employee_supervisor", {
	idEmployeeSupervisor: int("id_employee_supervisor").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	supervisorId: int("supervisor_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	status: varchar({ length: 100 }).notNull(),
	requestedFor: mysqlEnum("requested_for", ['Dept. Head', 'Reporting Supervisor']).notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("supervisor_id").on(table.supervisorId),
		primaryKey({ columns: [table.idEmployeeSupervisor], name: "por_employee_supervisor_id_employee_supervisor" }),
	]);

export const porEmployeeTinInfo = mysqlTable("por_employee_tin_info", {
	idPorEmployeeTinInfo: int("id_por_employee_tin_info").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	tinNumber: varchar("tin_number", { length: 100 }).notNull(),
	taxCircle: varchar("tax_circle", { length: 100 }).notNull(),
	taxZone: varchar("tax_zone", { length: 100 }).notNull(),
	idHrTaxAreaType: int("id_hr_tax_area_type").notNull().references(() => hrTaxAreaType.idHrTaxAreaType),
	tinCertificate: varchar("tin_certificate", { length: 100 }).notNull(),
	tinOriginalName: text("tin_original_name").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: datetime("date_created", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hr_tax_area_type").on(table.idHrTaxAreaType),
		primaryKey({ columns: [table.idPorEmployeeTinInfo], name: "por_employee_tin_info_id_por_employee_tin_info" }),
	]);

export const porItGoodsDetails = mysqlTable("por_it_goods_details", {
	idPorItGoodsDetails: int("id_por_it_goods_details").autoincrement().notNull(),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idUsers: int("id_users").notNull().references(() => hrEmployee.employeeId),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	designationId: int("designation_id").notNull().references(() => hrDesignationMaster.designationId),
	idDepartment: int("id_department").notNull().references(() => hrDepartments.idDepartment),
	concernItPersonId: int("concern_it_person_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorItGoodsDetails], name: "por_it_goods_details_id_por_it_goods_details" }),
	]);

export const porJobDescriptionAdditionalDimensions = mysqlTable("por_job_description_additional_dimensions", {
	idJobDescriptionAdditionalDimension: int("id_job_description_additional_dimension").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dimension: text().notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Approved', 'Pending', 'Denied']).default('Pending').notNull(),
	oldDimension: text("old_dimension"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalDimension], name: "por_job_description_additional_dimensions_id_job_description_additional_dimension" }),
	]);

export const porJobDescriptionAdditionalDimensionsHistory = mysqlTable("por_job_description_additional_dimensions_history", {
	idJobDescriptionAdditionalDimensionHistory: int("id_job_description_additional_dimension_history").autoincrement().notNull(),
	idJobDescriptionAdditionalDimension: int("id_job_description_additional_dimension").notNull().references(() => porJobDescriptionAdditionalDimensions.idJobDescriptionAdditionalDimension),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		index("id_job_description_additional_dimension").on(table.idJobDescriptionAdditionalDimension),
		primaryKey({ columns: [table.idJobDescriptionAdditionalDimensionHistory], name: "por_job_description_additional_dimensions_history_id_job_description_additional_dimension_history" }),
	]);

export const porJobDescriptionAdditionalExperiences = mysqlTable("por_job_description_additional_experiences", {
	idJobDescriptionAdditionalExperience: int("id_job_description_additional_experience").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	experienceDetails: text("experience_details").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Approved', 'Pending', 'Denied']).default('Pending').notNull(),
	oldExperienceDetails: text("old_experience_details"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalExperience], name: "por_job_description_additional_experiences_id_job_description_additional_experience" }),
	]);

export const porJobDescriptionAdditionalExperiencesHistory = mysqlTable("por_job_description_additional_experiences_history", {
	idJobDescriptionAdditionalExperienceHistory: int("id_job_description_additional_experience_history").autoincrement().notNull(),
	idJobDescriptionAdditionalExperience: int("id_job_description_additional_experience").notNull().references(() => porJobDescriptionAdditionalExperiences.idJobDescriptionAdditionalExperience),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		index("id_job_description_additional_experience").on(table.idJobDescriptionAdditionalExperience),
		primaryKey({ columns: [table.idJobDescriptionAdditionalExperienceHistory], name: "por_job_description_additional_experiences_history_id_job_description_additional_experience_history" }),
	]);

export const porJobDescriptionAdditionalExternalCustomers = mysqlTable("por_job_description_additional_external_customers", {
	idJobDescriptionAdditionalExternalCustomer: int("id_job_description_additional_external_customer").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	externalCustomer: text("external_customer").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Approved', 'Pending', 'Denied']).default('Pending').notNull(),
	oldExternalCustomer: text("old_external_customer"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalExternalCustomer], name: "por_job_description_additional_external_customers_id_job_description_additional_external_customer" }),
	]);

export const porJobDescriptionAdditionalExternalCustomersHistory = mysqlTable("por_job_description_additional_external_customers_history", {
	idJobDescriptionAdditionalExternalCustomerHistory: int("id_job_description_additional_external_customer_history").autoincrement().notNull(),
	idJobDescriptionAdditionalExternalCustomer: int("id_job_description_additional_external_customer").notNull().references(() => porJobDescriptionAdditionalExternalCustomers.idJobDescriptionAdditionalExternalCustomer),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		index("id_job_description_additional_external_customer").on(table.idJobDescriptionAdditionalExternalCustomer),
		primaryKey({ columns: [table.idJobDescriptionAdditionalExternalCustomerHistory], name: "por_job_description_additional_external_customers_history_id_job_description_additional_external_customer_history" }),
	]);

export const porJobDescriptionAdditionalInternalCustomers = mysqlTable("por_job_description_additional_internal_customers", {
	idJobDescriptionAdditionalInternalCustomer: int("id_job_description_additional_internal_customer").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	internalCustomer: text("internal_customer").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved', 'Denied']).default('Pending').notNull(),
	oldInternalCustomer: text("old_internal_customer"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalInternalCustomer], name: "por_job_description_additional_internal_customers_id_job_description_additional_internal_customer" }),
	]);

export const porJobDescriptionAdditionalInternalCustomersHistory = mysqlTable("por_job_description_additional_internal_customers_history", {
	idJobDescriptionAdditionalInternalCustomerHistory: int("id_job_description_additional_internal_customer_history").autoincrement().notNull(),
	idJobDescriptionAdditionalInternalCustomer: int("id_job_description_additional_internal_customer").notNull().references(() => porJobDescriptionAdditionalInternalCustomers.idJobDescriptionAdditionalInternalCustomer),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		index("id_job_description_additional_internal_customer").on(table.idJobDescriptionAdditionalInternalCustomer),
		primaryKey({ columns: [table.idJobDescriptionAdditionalInternalCustomerHistory], name: "por_job_description_additional_internal_customers_history_id_job_description_additional_internal_customer_history" }),
	]);

export const porJobDescriptionAdditionalPerformingAreas = mysqlTable("por_job_description_additional_performing_areas", {
	idJobDescriptionAdditionalPerformingArea: int("id_job_description_additional_performing_area").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	keyResultArea: text("key_result_area").notNull(),
	measureOfSuccess: text("measure_of_success").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved', 'Denied']).default('Pending').notNull(),
	oldKeyResultArea: text("old_key_result_area"),
	oldMeasureOfSuccess: text("old_measure_of_success"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalPerformingArea], name: "por_job_description_additional_performing_areas_id_job_description_additional_performing_area" }),
	]);

export const porJobDescriptionAdditionalPerformingAreasHistory = mysqlTable("por_job_description_additional_performing_areas_history", {
	idJobDescriptionAdditionalPerformingAreaHistory: int("id_job_description_additional_performing_area_history").autoincrement().notNull(),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	idUser: int("id_user").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idJobDescriptionAdditionalPerformingArea: int("id_job_description_additional_performing_area").notNull().references(() => porJobDescriptionAdditionalPerformingAreas.idJobDescriptionAdditionalPerformingArea),
},
	(table) => [
		index("id_job_description_additional_performing_area").on(table.idJobDescriptionAdditionalPerformingArea),
		primaryKey({ columns: [table.idJobDescriptionAdditionalPerformingAreaHistory], name: "por_job_description_additional_performing_areas_history_id_job_description_additional_performing_area_history" }),
	]);

export const porJobDescriptionAdditionalQualifications = mysqlTable("por_job_description_additional_qualifications", {
	idJobDescriptionAdditionalQualification: int("id_job_description_additional_qualification").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	qualificationDetails: text("qualification_details").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved', 'Denied']).default('Pending').notNull(),
	oldQualificationDetails: text("old_qualification_details"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalQualification], name: "por_job_description_additional_qualifications_id_job_description_additional_qualification" }),
	]);

export const porJobDescriptionAdditionalQualificationsHistory = mysqlTable("por_job_description_additional_qualifications_history", {
	idJobDescriptionAdditionalQualificationHistory: int("id_job_description_additional_qualification_history").autoincrement().notNull(),
	idJobDescriptionAdditionalQualification: int("id_job_description_additional_qualification").notNull().references(() => porJobDescriptionAdditionalQualifications.idJobDescriptionAdditionalQualification),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		index("id_job_description_additional_qualification").on(table.idJobDescriptionAdditionalQualification),
		primaryKey({ columns: [table.idJobDescriptionAdditionalQualificationHistory], name: "por_job_description_additional_qualifications_history_id_job_description_additional_qualification_history" }),
	]);

export const porJobDescriptionAdditionalQualityParameters = mysqlTable("por_job_description_additional_quality_parameters", {
	idJobDescriptionAdditionalQualityParameter: int("id_job_description_additional_quality_parameter").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	qualityParameter: text("quality_parameter").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved', 'Denied']).default('Pending').notNull(),
	oldQualityParameter: text("old_quality_parameter"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalQualityParameter], name: "por_job_description_additional_quality_parameters_id_job_description_additional_quality_parameter" }),
	]);

export const porJobDescriptionAdditionalQualityParametersHistory = mysqlTable("por_job_description_additional_quality_parameters_history", {
	idJobDescriptionAdditionalQualityParameterHistory: int("id_job_description_additional_quality_parameter_history").autoincrement().notNull(),
	idJobDescriptionAdditionalQualityParameter: int("id_job_description_additional_quality_parameter").notNull().references(() => porJobDescriptionAdditionalQualityParameters.idJobDescriptionAdditionalQualityParameter),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		index("id_job_description_additional_quality_parameter").on(table.idJobDescriptionAdditionalQualityParameter),
		primaryKey({ columns: [table.idJobDescriptionAdditionalQualityParameterHistory], name: "por_job_description_additional_quality_parameters_history_id_job_description_additional_quality_parameter_history" }),
	]);

export const porJobDescriptionAdditionalSoftSkills = mysqlTable("por_job_description_additional_soft_skills", {
	idJobDescriptionAdditionalSoftSkill: int("id_job_description_additional_soft_skill").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	softSkill: text("soft_skill").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved', 'Denied']).default('Pending').notNull(),
	oldSoftSkill: text("old_soft_skill"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalSoftSkill], name: "por_job_description_additional_soft_skills_id_job_description_additional_soft_skill" }),
	]);

export const porJobDescriptionAdditionalSoftSkillsHistory = mysqlTable("por_job_description_additional_soft_skills_history", {
	idJobDescriptionAdditionalSoftSkillHistory: int("id_job_description_additional_soft_skill_history").autoincrement().notNull(),
	idJobDescriptionAdditionalSoftSkill: int("id_job_description_additional_soft_skill").notNull().references(() => porJobDescriptionAdditionalSoftSkills.idJobDescriptionAdditionalSoftSkill),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		index("id_job_description_additional_soft_skill").on(table.idJobDescriptionAdditionalSoftSkill),
		primaryKey({ columns: [table.idJobDescriptionAdditionalSoftSkillHistory], name: "por_job_description_additional_soft_skills_history_id_job_description_additional_soft_skill_history" }),
	]);

export const porJobDescriptionAdditionalSpecialRequirements = mysqlTable("por_job_description_additional_special_requirements", {
	idJobDescriptionAdditionalSpecialRequirement: int("id_job_description_additional_special_requirement").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	specialRequirement: text("special_requirement").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved', 'Denied']).default('Pending').notNull(),
	oldSpecialRequirement: text("old_special_requirement"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalSpecialRequirement], name: "por_job_description_additional_special_requirements_id_job_description_additional_special_requirement" }),
	]);

export const porJobDescriptionAdditionalSpecialRequirementsHistory = mysqlTable("por_job_description_additional_special_requirements_history", {
	idJobDescriptionAdditionalSpecialRequirementHistory: int("id_job_description_additional_special_requirement_history").autoincrement().notNull(),
	idJobDescriptionAdditionalSpecialRequirement: int("id_job_description_additional_special_requirement").notNull().references(() => porJobDescriptionAdditionalSpecialRequirements.idJobDescriptionAdditionalSpecialRequirement),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idJobDescriptionAdditionalSpecialRequirementHistory], name: "por_job_description_additional_special_requirements_history_id_job_description_additional_special_requirement_history" }),
	]);

export const porJobDescriptionAdditionalTechSkills = mysqlTable("por_job_description_additional_tech_skills", {
	idJobDescriptionAdditionalTechSkill: int("id_job_description_additional_tech_skill").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	technicalSkill: text("technical_skill").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved', 'Denied']).default('Pending').notNull(),
	oldTechnicalSkill: text("old_technical_skill"),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		primaryKey({ columns: [table.idJobDescriptionAdditionalTechSkill], name: "por_job_description_additional_tech_skills_id_job_description_additional_tech_skill" }),
	]);

export const porJobDescriptionAdditionalTechSkillsHistory = mysqlTable("por_job_description_additional_tech_skills_history", {
	idJobDescriptionAdditionalTechSkillHistory: int("id_job_description_additional_tech_skill_history").autoincrement().notNull(),
	idJobDescriptionAdditionalTechSkill: int("id_job_description_additional_tech_skill").notNull().references(() => porJobDescriptionAdditionalTechSkills.idJobDescriptionAdditionalTechSkill),
	previousData: text("previous_data").notNull(),
	newData: text("new_data").notNull(),
	action: mysqlEnum(['edit', 'delete']).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		index("id_job_description_additional_tech_skill").on(table.idJobDescriptionAdditionalTechSkill),
		primaryKey({ columns: [table.idJobDescriptionAdditionalTechSkillHistory], name: "por_job_description_additional_tech_skills_history_id_job_description_additional_tech_skill_history" }),
	]);

export const porJobRequisitionCandidateAppraisals = mysqlTable("por_job_requisition_candidate_appraisals", {
	idPorJobRequisitionCandidateAppraisal: int("id_por_job_requisition_candidate_appraisal").autoincrement().notNull(),
	idPorJobRequisitionCandidate: int("id_por_job_requisition_candidate").notNull(),
	idAppraiser: int("id_appraiser").notNull(),
	rating: mysqlEnum(['Excellent', 'Good', 'Average', 'Below Average', 'Poor']).notNull(),
	comment: text(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	interviewDate: date("interview_date", { mode: 'string' }).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorJobRequisitionCandidateAppraisal], name: "por_job_requisition_candidate_appraisals_id_por_job_requisition_candidate_appraisal" }),
	]);

export const porJobRequisitionCandidates = mysqlTable("por_job_requisition_candidates", {
	idPorJobRequisitionCandidates: int("id_por_job_requisition_candidates").autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 100 }),
	phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
	idPorJobRequisitionDetails: int("id_por_job_requisition_details").notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	totalExperience: int("total_experience"),
	attachment: varchar({ length: 100 }).notNull(),
	highestEducation: int("highest_education"),
	educationInstitute: int("education_institute"),
	originalName: varchar("original_name", { length: 100 }).notNull(),
	appraisalStatus: mysqlEnum("appraisal_status", ['Incomplete', 'Done']).default('Incomplete').notNull(),
	joiningStatus: mysqlEnum("joining_status", ['Accept Offer Letter', 'Reject Offer Letter', 'Pending', 'Joined', 'Not Joined', 'Potential Candidate', 'Rejected', 'Missing In Interview']).default('Pending').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorJobRequisitionCandidates], name: "por_job_requisition_candidates_id_por_job_requisition_candidates" }),
	]);

export const porJobRequisitionDetails = mysqlTable("por_job_requisition_details", {
	idPorJobRequisitionDetails: int("id_por_job_requisition_details").autoincrement().notNull(),
	idPorJobRequisitions: int("id_por_job_requisitions").notNull(),
	idDesignation: int("id_designation").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }).notNull(),
	noOfRecruit: int("no_of_recruit").notNull(),
	idDepartment: int("id_department").notNull(),
	idEmployeeStatus: int("id_employee_status").notNull(),
	positionJustification: text("position_justification"),
	jobResponsibilities: text("job_responsibilities"),
	approvalStatus: mysqlEnum("approval_status", ['Pending For Re-Approval', 'Re-Approval Denied', 'Pending For Project Head Approval', 'Denied by Project Head', 'Pending For Project Control Recommendation', 'Denied by Project Control', 'Pending For Divisional Hr Acknowledgement', 'Pending For Recruitment Hr Approval', 'Approved by Recruitment Hr', 'Deleted by Requester']),
	recruitmentStatus: mysqlEnum("recruitment_status", ['Pending', 'Partial', 'Completed', 'Closed', 'Action Required']).default('Pending').notNull(),
	year: int().notNull(),
	month: int().notNull(),
	sendTo: mysqlEnum("send_to", ['Project Control', 'Requester', 'Divisional Hr', 'Recruitment Hr', 'Project Head', 'Business Unit Hr']),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	denyReason: text("deny_reason"),
	attachment: varchar({ length: 255 }),
	originalName: varchar("original_name", { length: 255 }),
	closingRemark: varchar("closing_remark", { length: 255 }),
	managementType: mysqlEnum("management_type", ['Management', 'Non Management', 'Max Worker']).notNull(),
	experience: varchar({ length: 20 }),
	education: int(),
	minSalary: int("min_salary").notNull(),
	maxSalary: int("max_salary").notNull(),
	idDivisionalHr: int("id_divisional_hr"),
	idProjectControl: int("id_project_control"),
	idRecruitmentHr: int("id_recruitment_hr"),
	duration: varchar({ length: 5 }),
	noOfRecruitRecommended: int("no_of_recruit_recommended").notNull(),
	requisitionType: mysqlEnum("requisition_type", ['new', 'replace']).default('new').notNull(),
	idProjectHead: int("id_project_head"),
	remarksByProjectHead: varchar("remarks_by_project_head", { length: 255 }),
	remarksByRecruitmentHr: varchar("remarks_by_recruitment_hr", { length: 255 }),
	remarksByDivisionalHr: varchar("remarks_by_divisional_hr", { length: 255 }),
	remarksByProjectControl: varchar("remarks_by_project_control", { length: 255 }),
	replaceEmployees: varchar("replace_employees", { length: 255 }),
	recruitmentType: mysqlEnum("recruitment_type", ['internal', 'external']).default('external').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorJobRequisitionDetails], name: "por_job_requisition_details_id_por_job_requisition_details" }),
	]);

export const porJobRequisitionInternalEmployees = mysqlTable("por_job_requisition_internal_employees", {
	idJobRequisitionInternalEmployees: int("id_job_requisition_internal_employees").autoincrement().notNull(),
	idJobRequisitionDetails: int("id_job_requisition_details").notNull(),
	employeeId: int("employee_id").notNull(),
	createdBy: int("created_by").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idJobRequisitionInternalEmployees], name: "por_job_requisition_internal_employees_id_job_requisition_internal_employees" }),
	]);

export const porJobRequisitionMailNotifiers = mysqlTable("por_job_requisition_mail_notifiers", {
	idPorJobRequisitionMailNotifiers: int("id_por_job_requisition_mail_notifiers").autoincrement().notNull(),
	idPorJobRequisitions: int("id_por_job_requisitions").notNull(),
	employeeId: int("employee_id").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorJobRequisitionMailNotifiers], name: "por_job_requisition_mail_notifiers_id_por_job_requisition_mail_notifiers" }),
	]);

export const porJobRequisitionReplaceEmployees = mysqlTable("por_job_requisition_replace_employees", {
	idJobRequisitionReplaceEmployees: int("id_job_requisition_replace_employees").autoincrement().notNull(),
	idJobRequisitionDetails: int("id_job_requisition_details").notNull(),
	employeeId: int("employee_id").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idJobRequisitionReplaceEmployees], name: "por_job_requisition_replace_employees_id_job_requisition_replace_employees" }),
	]);

export const porJobRequisitions = mysqlTable("por_job_requisitions", {
	idPorJobRequisition: int("id_por_job_requisition").autoincrement().notNull(),
	idBusinessUnit: int("id_business_unit").notNull().references(() => projects.idProjects),
	status: mysqlEnum(['Pending', 'Partial', 'Completed', 'Closed']).default('Pending').notNull(),
	submittedBy: int("submitted_by").notNull().references(() => hrEmployee.employeeId),
	updatedBy: int("updated_by"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
},
	(table) => [
		index("id_business_unit").on(table.idBusinessUnit),
		index("submitted_by").on(table.submittedBy),
		primaryKey({ columns: [table.idPorJobRequisition], name: "por_job_requisitions_id_por_job_requisition" }),
	]);

export const porJobRequisitionsHistory = mysqlTable("por_job_requisitions_history", {
	idPorJobRequisitionsHistory: int("id_por_job_requisitions_history").autoincrement().notNull(),
	idPorJobRequisitionDetails: int("id_por_job_requisition_details").notNull(),
	oldData: text("old_data").notNull(),
	newData: text("new_data").notNull(),
	actionTakenBy: int("action_taken_by").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	remarks: text(),
},
	(table) => [
		primaryKey({ columns: [table.idPorJobRequisitionsHistory], name: "por_job_requisitions_history_id_por_job_requisitions_history" }),
	]);

export const porLeave = mysqlTable("por_leave", {
	idPorLeave: int("id_por_leave").autoincrement().notNull(),
	idEmployee: int("id_employee").notNull().references(() => hrEmployee.employeeId),
	idProject: int("id_project").notNull().references(() => projects.idProjects),
	idDepartment: int("id_department"),
	idLeaveType: int("id_leave_type").notNull().references(() => hrLeaveType.idLeaveType),
	idLeavePolicy: int("id_leave_policy"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }).notNull(),
	noOfLeaveDay: int("no_of_leave_day"),
	weekendHolidayInside: int("weekend_holiday_inside"),
	addressDuringLeave: text("address_during_leave"),
	phoneDuringLeave: varchar("phone_during_leave", { length: 20 }),
	file: varchar({ length: 250 }),
	originalFile: varchar("original_file", { length: 250 }),
	reason: text(),
	reasonDetails: varchar("reason_details", { length: 256 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user"),
	remainingLeave: int("remaining_leave"),
	reportingSupervisorId: int("reporting_supervisor_id"),
	lineSupervisorId: int("line_supervisor_id").references(() => hrEmployee.employeeId),
	hrId: int("hr_id").references(() => hrEmployee.employeeId),
	status: mysqlEnum(['pending', 'approved', 'done', 'deleted', 'recommended', 'acknowledged', 'denied', 'pending for report supervisor']).default('pending'),
	remarks: varchar({ length: 255 }),
	deniedBy: int("denied_by"),
	deniedReason: text("denied_reason"),
	replacementPerson: int("replacement_person"),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
	lineSupervisorRemark: text("line_supervisor_remark"),
	reportingSupervisorRemark: text("reporting_supervisor_remark"),
	leaveHrRemark: text("leave_hr_remark"),
	buHrRemark: text("bu_hr_remark"),
	leaveHrId: int("leave_hr_id").references(() => hrEmployee.employeeId),
},
	(table) => [
		index("hr_id").on(table.hrId),
		index("id_employee").on(table.idEmployee),
		index("id_leave_policy").on(table.idLeavePolicy),
		index("id_leave_type").on(table.idLeaveType),
		index("id_project").on(table.idProject),
		index("leave_hr_id").on(table.leaveHrId),
		index("supervisor_id").on(table.lineSupervisorId),
		primaryKey({ columns: [table.idPorLeave], name: "por_leave_id_por_leave" }),
	]);

export const porLeaveDetails = mysqlTable("por_leave_details", {
	idPorLeaveDetails: int("id_por_leave_details").autoincrement().notNull(),
	idPorLeave: int("id_por_leave").notNull().references(() => porLeave.idPorLeave),
	leaveCategory: mysqlEnum("leave_category", ['with_pay', 'without_pay']).notNull(),
	approvedDays: int("approved_days"),
	deductionAmount: double("deduction_amount", { precision: 12, scale: 2 }).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	leaveDate: date("leave_date", { mode: 'string' }).notNull(),
},
	(table) => [
		index("id_por_leave").on(table.idPorLeave),
		primaryKey({ columns: [table.idPorLeaveDetails], name: "por_leave_details_id_por_leave_details" }),
	]);

export const porLeaveNotificationReceiver = mysqlTable("por_leave_notification_receiver", {
	idPorLeaveNotificationReceiver: int("id_por_leave_notification_receiver").autoincrement().notNull(),
	receiverId: int("receiver_id"),
	idPorLeave: int("id_por_leave").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorLeaveNotificationReceiver], name: "por_leave_notification_receiver_id_por_leave_notification_receiver" }),
	]);

export const porLog = mysqlTable("por_log", {
	idPorLog: int("id_por_log").autoincrement().notNull(),
	url: varchar({ length: 200 }),
	getData: text("get_data"),
	postData: text("post_data"),
	headerData: text("header_data"),
	idEmployee: int("id_employee"),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: varchar("user_agent", { length: 200 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	performanceTime: float("performance_time"),
	updateDate: timestamp("update_date", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idPorLog], name: "por_log_id_por_log" }),
	]);

export const porOutstations = mysqlTable("por_outstations", {
	idPorOutstation: int("id_por_outstation").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	type: mysqlEnum(['Site Visit', 'Official Visit', 'Work From Home', 'Replaced Offday']).notNull(),
	location: varchar({ length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }).notNull(),
	noOfDays: int("no_of_days").notNull(),
	reason: text().notNull(),
	status: mysqlEnum(['pending', 'acknowledged', 'approved', 'deleted', 'denied', 'pending for report supervisor']).default('pending').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	isEdited: mysqlEnum("is_edited", ['yes', 'no']).default('no').notNull(),
	remarks: text(),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
	lineSupervisorId: int("line_supervisor_id"),
	reportingSupervisorId: int("reporting_supervisor_id"),
	hrId: int("hr_id"),
	lineSupervisorRemark: text("line_supervisor_remark"),
	reportingSupervisorRemark: text("reporting_supervisor_remark"),
	hrRemark: text("hr_remark"),
},
	(table) => [
		primaryKey({ columns: [table.idPorOutstation], name: "por_outstations_id_por_outstation" }),
	]);

export const porPerformanceAppraise = mysqlTable("por_performance_appraise", {
	idPerformanceAppraise: int("id_performance_appraise").autoincrement().notNull(),
	employeeId: int("employee_id").notNull().references(() => hrEmployee.employeeId),
	idPerformanceAppraisalSetup: int("id_performance_appraisal_setup").notNull().references(() => hrisPerformanceAppraisalSetup.idPerformanceAppraisalSetup),
	idHrisPmsScoreMaster: int("id_hris_pms_score_master").notNull().references(() => hrisPmsScoreMaster.idHrisPmsScoreMaster),
	overallScore: decimal("overall_score", { precision: 5, scale: 2 }).default('0.00'),
	completedAppraise: int("completed_appraise"),
	requiredAppraise: int("required_appraise"),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	recommendationStatus: mysqlEnum("recommendation_status", ['Pending', 'Submitted', 'Approved']).default('Pending').notNull(),
	numberOfAppraise: int("number_of_appraise").notNull(),
	approvalStatus: mysqlEnum("approval_status", ['Pending', 'Approved']).default('Pending').notNull(),
},
	(table) => [
		index("employee_id").on(table.employeeId),
		index("id_hris_pms_score_master").on(table.idHrisPmsScoreMaster),
		index("id_performance_appraisal_setup").on(table.idPerformanceAppraisalSetup),
		primaryKey({ columns: [table.idPerformanceAppraise], name: "por_performance_appraise_id_performance_appraise" }),
	]);

export const porPerformanceAppraiseAchievements = mysqlTable("por_performance_appraise_achievements", {
	idPerformanceAppraiseAchievement: int("id_performance_appraise_achievement").autoincrement().notNull(),
	idPerformanceAppraise: int("id_performance_appraise").notNull().references(() => porPerformanceAppraise.idPerformanceAppraise),
	kpi: varchar({ length: 256 }).notNull(),
	achivedScore: decimal("achived_score", { precision: 12, scale: 2 }),
	comments: varchar({ length: 1000 }),
	achievementPercentage: varchar("achievement_percentage", { length: 256 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		index("id_performance_appraise_details").on(table.idPerformanceAppraise),
		index("id_por_employee_appraisal_target_details").on(table.kpi),
		primaryKey({ columns: [table.idPerformanceAppraiseAchievement], name: "por_performance_appraise_achievements_id_performance_appraise_achievement" }),
	]);

export const porPerformanceAppraiseDetails = mysqlTable("por_performance_appraise_details", {
	idPerformanceAppraiseDetails: int("id_performance_appraise_details").autoincrement().notNull(),
	totalQuantifyAchievement: int("total_quantify_achievement").notNull(),
	totalQuantifyTrait: int("total_quantify_trait").notNull(),
	totalAchievementScores: int("total_achievement_scores").notNull(),
	totalTraitPoints: int("total_trait_points").notNull(),
	calculatedTraitPoints: float("calculated_trait_points").notNull(),
	calculatedAchievementScores: float("calculated_achievement_scores").notNull(),
	idPerformanceAppraisalDateRange: int("id_performance_appraisal_date_range").references(() => hrisPerformanceAppraisalDateRanges.idPerformanceAppraisalDateRange).references(() => hrisPerformanceAppraisalDateRanges.idPerformanceAppraisalDateRange),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	idAppraiser: int("id_appraiser").notNull().references(() => hrEmployee.employeeId),
	overallScorePerAppraise: float("overall_score_per_appraise"),
	idPerformanceAppraise: int("id_performance_appraise").references(() => porPerformanceAppraise.idPerformanceAppraise),
	calculationPercentage: int("calculation_percentage").notNull(),
	appraisalNo: int("appraisal_no").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		index("id_appraiser").on(table.idAppraiser),
		index("id_performance_appraisal_date_range").on(table.idPerformanceAppraisalDateRange),
		index("id_performance_appraise").on(table.idPerformanceAppraise),
		primaryKey({ columns: [table.idPerformanceAppraiseDetails], name: "por_performance_appraise_details_id_performance_appraise_details" }),
	]);

export const porPerformanceAppraiseTraits = mysqlTable("por_performance_appraise_traits", {
	idPerformanceAppraiseTrait: int("id_performance_appraise_trait").autoincrement().notNull(),
	idPerformanceAppraise: int("id_performance_appraise").notNull().references(() => porPerformanceAppraise.idPerformanceAppraise),
	idHrisTraitsMaster: int("id_hris_traits_master").notNull().references(() => hrisTraitsMaster.idHrisTraitsMaster),
	traitsPoint: int("traits_point"),
	comments: text(),
},
	(table) => [
		index("id_hris_traits_master").on(table.idHrisTraitsMaster),
		index("id_performance_appraise_details").on(table.idPerformanceAppraise),
		primaryKey({ columns: [table.idPerformanceAppraiseTrait], name: "por_performance_appraise_traits_id_performance_appraise_trait" }),
	]);

export const porPmsEmployeeRecommendationDetails = mysqlTable("por_pms_employee_recommendation_details", {
	idPmsEmployeeRecommendationDetails: int("id_pms_employee_recommendation_details").autoincrement().notNull(),
	idPmsEmployeeRecommendations: int("id_pms_employee_recommendations").notNull(),
	idPmsRecommendationDetails: int("id_pms_recommendation_details").notNull(),
	specification: varchar({ length: 150 }).notNull(),
	remarks: varchar({ length: 150 }),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	idUser: int("id_user").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPmsEmployeeRecommendationDetails], name: "por_pms_employee_recommendation_details_id_pms_employee_recommendation_details" }),
	]);

export const porPmsEmployeeRecommendations = mysqlTable("por_pms_employee_recommendations", {
	idPmsEmployeeRecommendations: int("id_pms_employee_recommendations").autoincrement().notNull(),
	idPmsRecommendationMaster: int("id_pms_recommendation_master").notNull(),
	idPerformanceAppraise: int("id_performance_appraise").notNull(),
	idUser: int("id_user").notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idPmsEmployeeRecommendations], name: "por_pms_employee_recommendations_id_pms_employee_recommendations" }),
	]);

export const porPresentOffdays = mysqlTable("por_present_offdays", {
	idPorPresentOffday: int("id_por_present_offday").autoincrement().notNull(),
	employeeId: int("employee_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	status: mysqlEnum(['Pending', 'Approved', 'Acknowledged']).default('Pending').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idPorPresentOffday], name: "por_present_offdays_id_por_present_offday" }),
	]);

export const porRequestsUpdateHistory = mysqlTable("por_requests_update_history", {
	idPorRequestsUpdateHistory: int("id_por_requests_update_history").autoincrement().notNull(),
	idRequest: int("id_request").notNull(),
	requestTable: varchar("request_table", { length: 50 }).notNull(),
	requestType: mysqlEnum("request_type", ['regular-leave', 'certificate', 'outstation', 'compensatory-leave', 'monthly-leave', 'vehicle', 'late-attendance', 'rent-generation', 'utility-generation', 'car-ait', 'travel-advance']).notNull(),
	updatedStatus: varchar("updated_status", { length: 30 }).notNull(),
	updatedBy: int("updated_by").notNull(),
	oldStatus: varchar("old_status", { length: 30 }).notNull(),
	oldData: text("old_data").notNull(),
	newData: text("new_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	remarks: text(),
	employeeId: int("employee_id").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorRequestsUpdateHistory], name: "por_requests_update_history_id_por_requests_update_history" }),
	]);

export const porRoles = mysqlTable("por_roles", {
	idPorRoles: int("id_por_roles").autoincrement().notNull(),
	role: mysqlEnum(['Recruitment HR', 'Divisional HR', 'Business Unit HR', 'Leave HR', 'Certificate HR', 'Project Control', 'Director/CEO', 'COO/CHRO', 'Income Tax', 'Audit Team', 'VMS Approver', 'Reviewer', 'Project Head']).notNull(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorRoles], name: "por_roles_id_por_roles" }),
	]);

export const porRolesAssign = mysqlTable("por_roles_assign", {
	idPorRoleAssign: int("id_por_role_assign").autoincrement().notNull(),
	idPorRoles: int("id_por_roles").notNull(),
	employeeId: int("employee_id").notNull(),
	idProjects: int("id_projects"),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
},
	(table) => [
		primaryKey({ columns: [table.idPorRoleAssign], name: "por_roles_assign_id_por_role_assign" }),
	]);

export const porTravelAdvanceRequest = mysqlTable("por_travel_advance_request", {
	idPorTravelAdvanceRequest: int("id_por_travel_advance_request").autoincrement().notNull(),
	visitingPlace: varchar("visiting_place", { length: 255 }).notNull(),
	purposeOfVisit: text("purpose_of_visit").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }).notNull(),
	advanceAmount: decimal("advance_amount", { precision: 12, scale: 2 }).notNull(),
	centralAccountant: int("central_accountant").notNull(),
	cashier: int().notNull(),
	travelType: mysqlEnum("travel_type", ['Single', 'Group']).notNull(),
	transportMode: varchar("transport_mode", { length: 20 }).notNull(),
	nightAccomodation: varchar("night_accomodation", { length: 50 }).notNull(),
	remarks: text(),
	employeeId: int("employee_id").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	status: mysqlEnum(['Approved', 'Deleted', 'Denied', 'Pending']).default('Pending').notNull(),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorTravelAdvanceRequest], name: "por_travel_advance_request_id_por_travel_advance_request" }),
	]);

export const porTravelBillRequest = mysqlTable("por_travel_bill_request", {
	idPorTravelBillRequest: int("id_por_travel_bill_request").autoincrement().notNull(),
	remarks: text(),
	status: mysqlEnum(['Pending', 'Denied', 'Deleted', 'Drafted', 'Approved', 'Acknowledged']).default('Drafted').notNull(),
	employeeId: int("employee_id").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	denyReason: text("deny_reason"),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorTravelBillRequest], name: "por_travel_bill_request_id_por_travel_bill_request" }),
	]);

export const porTravelBillRequestDetails = mysqlTable("por_travel_bill_request_details", {
	idPorTravelBillRequestDetails: int("id_por_travel_bill_request_details").autoincrement().notNull(),
	idPorTravelBillRequest: int("id_por_travel_bill_request").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	idExpenseType: int("id_expense_type").notNull(),
	description: text(),
	amount: int().notNull(),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	originalName: varchar("original_name", { length: 100 }).notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	publicationStatus: mysqlEnum("publication_status", ['activated', 'deactivated']).default('activated').notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorTravelBillRequestDetails], name: "por_travel_bill_request_details_id_por_travel_bill_request_details" }),
	]);

export const porTravelBillRequestHistory = mysqlTable("por_travel_bill_request_history", {
	idPorTravelBillRequestHistory: int("id_por_travel_bill_request_history").autoincrement().notNull(),
	idPorTravelBillRequestDetails: int("id_por_travel_bill_request_details").notNull(),
	oldData: text("old_data").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorTravelBillRequestHistory], name: "por_travel_bill_request_history_id_por_travel_bill_request_history" }),
	]);

export const porTravelGroupMembers = mysqlTable("por_travel_group_members", {
	idPorTravelGroupMember: int("id_por_travel_group_member").autoincrement().notNull(),
	idPorTravelAdvanceRequest: int("id_por_travel_advance_request").notNull(),
	memberId: int("member_id").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorTravelGroupMember], name: "por_travel_group_members_id_por_travel_group_member" }),
	]);

export const porVehicleRequest = mysqlTable("por_vehicle_request", {
	idPorVehicleRequest: int("id_por_vehicle_request").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }).notNull(),
	destinationFrom: varchar("destination_from", { length: 255 }).notNull(),
	destinationTo: varchar("destination_to", { length: 255 }).notNull(),
	departureTime: time("departure_time").notNull(),
	idVehicleType: int("id_vehicle_type").notNull(),
	reason: text().notNull(),
	specialNote: text("special_note"),
	status: mysqlEnum(['pending', 'approved', 'deleted', 'acknowledged', 'denied']).default('pending').notNull(),
	idUser: int("id_user").notNull(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow().notNull(),
	dateUpdated: timestamp("date_updated", { mode: 'string' }).onUpdateNow(),
	assignedVehicle: int("assigned_vehicle"),
	denyReason: varchar("deny_reason", { length: 255 }),
	requestThrough: mysqlEnum("request_through", ['Web', 'App']).default('Web').notNull(),
	idVmsDriver: int("id_vms_driver"),
	driverPhoneNumber: varchar("driver_phone_number", { length: 15 }),
	approvedBy: int("approved_by"),
},
	(table) => [
		primaryKey({ columns: [table.idPorVehicleRequest], name: "por_vehicle_request_id_por_vehicle_request" }),
	]);

export const porVehicleRequestEmailNotifiers = mysqlTable("por_vehicle_request_email_notifiers", {
	idPorVehicleRequestEmailNotifiers: int("id_por_vehicle_request_email_notifiers").autoincrement().notNull(),
	idPorVehicleRequest: int("id_por_vehicle_request").notNull(),
	employeeId: int("employee_id").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorVehicleRequestEmailNotifiers], name: "por_vehicle_request_email_notifiers_id_por_vehicle_request_email_notifiers" }),
	]);

export const porVehicleRequestPassengers = mysqlTable("por_vehicle_request_passengers", {
	idPorVehicleRequestPassengers: int("id_por_vehicle_request_passengers").autoincrement().notNull(),
	idPorVehicleRequest: int("id_por_vehicle_request").notNull(),
	employeeId: int("employee_id").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idPorVehicleRequestPassengers], name: "por_vehicle_request_passengers_id_por_vehicle_request_passengers" }),
	]);

export const projects = mysqlTable("projects", {
	idProjects: int("id_projects").autoincrement().notNull(),
	projectId: varchar("project_id", { length: 30 }),
	payrollCompaniesId: int("payroll_companies_id"),
	taxCompaniesId: int("tax_companies_id"),
	projectType: varchar("project_type", { length: 45 }),
	projectName: varchar("project_name", { length: 100 }).notNull(),
	abbreviationName: varchar("abbreviation_name", { length: 100 }),
	projectLocation: varchar("project_location", { length: 200 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: datetime("update_date", { mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	remarks: text(),
	details: text(),
	status: mysqlEnum(['tender_submitted', 'tender_approved', 'running', 'completed', 'closed', 'hidden']),
	idCompanies: int("id_companies").notNull().references(() => companies.idCompanies),
	contactPersonName: varchar("contact_person_name", { length: 100 }),
	contactPersonNo: varchar("contact_person_no", { length: 45 }),
	budgetType: mysqlEnum("budget_type", ['recurring', 'fixed']).default('fixed'),
	isProject: mysqlEnum("is_project", ['yes', 'no']),
	isOfflineProject: mysqlEnum("is_offline_project", ['yes', 'no']).default('no'),
	leaveCalculationCalendarType: mysqlEnum("leave_calculation_calendar_type", ['fiscal-year', 'calendar-year']).default('fiscal-year').notNull(),
	blockAccess: tinyint("block_access").default(0).notNull(),
	parentId: int("parent_id"),
},
	(table) => [
		index("fk_projects_companies1_idx").on(table.idCompanies),
		primaryKey({ columns: [table.idProjects], name: "projects_id_projects" }),
	]);

export const users = mysqlTable("users", {
	idUsers: int("id_users").autoincrement().notNull(),
	employeeId: int("employee_id").references(() => hrEmployee.employeeId),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dob: date({ mode: 'string' }).notNull(),
	username: varchar({ length: 45 }).notNull(),
	password: varchar({ length: 45 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	idStatus: tinyint("id_status").default(0).notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	userRole: mysqlEnum("user_role", ['creator', 'approver']),
},
	(table) => [
		primaryKey({ columns: [table.idUsers], name: "users_id_users" }),
		unique("email").on(table.email, table.username),
		unique("employee_id").on(table.employeeId),
	]);

export const banksOriginal = mysqlTable("banks", {
	idBanks: int("id_banks").autoincrement().notNull(),
	deliveryMethod: mysqlEnum("delivery_method", ['Manual', 'SFTP', 'Portal']).default('Manual').notNull(),
	bankName: varchar("bank_name", { length: 45 }).notNull(),
	bankNameShort: varchar("bank_name_short", { length: 15 }),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	bankNameFull: varchar("bank_name_full", { length: 125 }),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		primaryKey({ columns: [table.idBanks], name: "banks_id_banks" }),
	]);

export const files = mysqlTable("files", {
	idFiles: int("id_files").autoincrement().notNull(),
	fileDirectory: text("file_directory"),
	fileName: varchar("file_name", { length: 100 }).notNull(),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	idFileTypes: int("id_file_types"),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("id_users").on(table.idUsers),
		primaryKey({ columns: [table.idFiles], name: "files_id_files" }),
	]);

export const personalInfo = mysqlTable("personal_info", {
	idPersonalInfo: int("id_personal_info").autoincrement().notNull(),
	firstName: varchar("first_name", { length: 45 }).notNull(),
	lastName: varchar("last_name", { length: 45 }),
	gender: varchar({ length: 15 }),
	maritalStatus: varchar("marital_status", { length: 45 }),
	nationalId: varchar("national_id", { length: 45 }),
	idUsers: int("id_users").notNull().references(() => users.idUsers),
	createDate: timestamp("create_date", { mode: 'string' }).defaultNow().notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
	(table) => [
		index("fk_basic_infos_users_idx").on(table.idUsers),
		primaryKey({ columns: [table.idPersonalInfo], name: "personal_info_id_personal_info" }),
		unique("user_unique").on(table.idUsers),
	]);