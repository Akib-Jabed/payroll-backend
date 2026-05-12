-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `acc_fiscal_year` (
	`id_fiscal_year` int AUTO_INCREMENT NOT NULL,
	`fiscal_title` varchar(40) NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`actual_start_date` date,
	`actual_end_date` date,
	`details` varchar(200),
	`active_status` tinyint NOT NULL DEFAULT 1,
	`is_current_year` enum('0','1') NOT NULL DEFAULT 0,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `acc_fiscal_year_id_fiscal_year` PRIMARY KEY(`id_fiscal_year`)
);
--> statement-breakpoint
CREATE TABLE `acc_ledgers` (
	`id_ledgers` int AUTO_INCREMENT NOT NULL,
	`parent_id` int,
	`ledger_code` varchar(50),
	`ledger_name` varchar(250) NOT NULL,
	`ledger_type` enum('group','gl','cl','sl') NOT NULL,
	`bank_cash_type` enum('bank','cash','general') NOT NULL DEFAULT 'general',
	`is_reconciliation` tinyint DEFAULT 0,
	`category` enum('a','e','l','r') NOT NULL,
	`ledger_level` tinyint,
	`reference_type` enum('bank','cash','vendor','customer','employee','business_unit','lc','short_term_loan','long_term_loan','fdr','bank_guarantee'),
	`id_reference` int,
	`active_status` tinyint NOT NULL DEFAULT 1,
	`ledger_path` text,
	`is_system` enum('yes','no') DEFAULT 'no',
	`is_gross_net` enum('gross','net') DEFAULT 'gross',
	`serial_no` int,
	`expense_type` varchar(200),
	`create_date` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `acc_ledgers_id_ledgers` PRIMARY KEY(`id_ledgers`)
);
--> statement-breakpoint
CREATE TABLE `acc_voucher` (
	`id_voucher` int AUTO_INCREMENT NOT NULL,
	`voucher_no` varchar(100) NOT NULL,
	`voucher_date` date NOT NULL,
	`voucher_type` enum('cr','br','cp','bp','con','jv') NOT NULL,
	`narration` text,
	`mode_of_transaction` varchar(30),
	`id_bank` int,
	`cheque_no` varchar(50),
	`transaction_date` date,
	`id_application` int,
	`id_company` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`voucher_status` enum('created','approved','modified','deleted') NOT NULL,
	`id_bill_invoice` varchar(50),
	`bill_invoice_type` varchar(50),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_ref` varchar(50),
	`id_task` int,
	`id_bu_voucher` int,
	CONSTRAINT `acc_voucher_id_voucher` PRIMARY KEY(`id_voucher`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id_companies` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(45) NOT NULL,
	`short_name` varchar(45),
	`company_id` varchar(45) NOT NULL,
	`remarks` text,
	`company_address` text,
	`id_city` int,
	`establish_date` date,
	`company_ac_number` varchar(45),
	`trade_license` varchar(45),
	`tax_deduction_ac` varchar(45),
	`pf_reg_number` int,
	`pf_reg_date` date,
	`gratuity_reg_num` int,
	`retirement_age` int,
	`contact_person_name` varchar(100),
	`contact_person_designation` varchar(100),
	`website` varchar(80),
	`company_email` varchar(80),
	`telephone_num` varchar(45),
	`fax_number` varchar(45),
	`business_type` varchar(45),
	`business_group` varchar(45),
	`company_category` varchar(45),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`tin_no` varchar(50),
	`bin_no` varchar(50),
	CONSTRAINT `companies_id_companies` PRIMARY KEY(`id_companies`)
);
--> statement-breakpoint
CREATE TABLE `cost_center` (
	`id_cost_center` int AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`id_projects` int,
	`budget_type` enum('recurring','fixed','special') NOT NULL DEFAULT 'fixed',
	`amount` double NOT NULL DEFAULT 0,
	`start_date` date,
	`end_date` date,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`cost_center_id` varchar(45) NOT NULL,
	`location` text,
	`parent_cost_center` int,
	`cost_center_type` varchar(100),
	`milestone_no` varchar(50) DEFAULT 'Cost Center',
	`lock_level` int DEFAULT 100,
	`selectable` enum('yes','no') NOT NULL DEFAULT 'yes',
	`boq_section_id` varchar(128),
	`boq_item_id` varchar(128),
	`status` enum('Completed','Work in progress','Invoice submitted','Yet to Start'),
	`shared_pool_milestone_budget` double,
	`shared_pool_milestone_budget_type` enum('Percentage','Amount'),
	CONSTRAINT `cost_center_id_cost_center` PRIMARY KEY(`id_cost_center`)
);
--> statement-breakpoint
CREATE TABLE `hr_absent_entry` (
	`id_hr_absent_entry` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date` date NOT NULL,
	`id_hr_absent_entry_file_upload` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_absent_entry_id_hr_absent_entry` PRIMARY KEY(`id_hr_absent_entry`)
);
--> statement-breakpoint
CREATE TABLE `hr_absent_entry_file_upload` (
	`id_hr_absent_entry_file_upload` int AUTO_INCREMENT NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100) NOT NULL,
	`id_business_unit` int NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` int,
	`reason` varchar(100),
	`invalid_entry` int DEFAULT 0,
	`invalid_entries` text,
	`not_found` int DEFAULT 0,
	`duplicate_entry` int DEFAULT 0,
	`not_founds` text,
	`duplicate_entries` text,
	`total_entry` int NOT NULL,
	CONSTRAINT `hr_absent_entry_file_upload_id_hr_absent_entry_file_upload` PRIMARY KEY(`id_hr_absent_entry_file_upload`)
);
--> statement-breakpoint
CREATE TABLE `hr_absent_setup` (
	`hr_absent_setup_id` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`hr_absent_template_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`changes_by` int,
	CONSTRAINT `hr_absent_setup_hr_absent_setup_id` PRIMARY KEY(`hr_absent_setup_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_absent_template` (
	`hr_absent_template_id` int AUTO_INCREMENT NOT NULL,
	`template_name` varchar(150) NOT NULL,
	`calculation_type` enum('Basic','Gross') NOT NULL,
	`number_of_days` varchar(80) NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_absent_template_hr_absent_template_id` PRIMARY KEY(`hr_absent_template_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_accounting_setup` (
	`id_accounting_setup` int AUTO_INCREMENT NOT NULL,
	`id_head` int,
	`id_ledger` int,
	`type` enum('Earning','Deduction'),
	`id_user` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_accounting_setup_id_accounting_setup` PRIMARY KEY(`id_accounting_setup`)
);
--> statement-breakpoint
CREATE TABLE `hr_advance` (
	`id_advance` int AUTO_INCREMENT NOT NULL,
	`id_advance_template` int NOT NULL,
	`id_employee` int NOT NULL,
	`id_cur_sal_bus_unit` int,
	`amount` decimal(13,2) NOT NULL,
	`no_of_installment` int NOT NULL,
	`monthly_deduction_amnt` decimal(13,2) NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`reason_for_advance` text,
	`remark` text,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_voucher` int,
	`paid` decimal(13,2) DEFAULT '0.00',
	`due` decimal(13,2) DEFAULT '0.00',
	`id_cur_business_unit` int,
	`budget_connection` enum('yes','no') NOT NULL DEFAULT 'no',
	`id_por_advance` int,
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`account_paid` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`remaining_installment` int NOT NULL,
	`file_name` varchar(100),
	`original_name` varchar(100),
	`advanced_date` date NOT NULL,
	CONSTRAINT `hr_advance_id_advance` PRIMARY KEY(`id_advance`)
);
--> statement-breakpoint
CREATE TABLE `hr_advance_holds` (
	`id_advance_hold` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_advance_holds_id_advance_hold` PRIMARY KEY(`id_advance_hold`)
);
--> statement-breakpoint
CREATE TABLE `hr_advance_payment_history` (
	`id_adv_pay_hist` int AUTO_INCREMENT NOT NULL,
	`id_advance` int NOT NULL,
	`id_employee` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`payment_type` enum('Early settlement','Monthly deduction') NOT NULL DEFAULT 'Monthly deduction',
	`paying_amount` decimal(13,2) NOT NULL,
	`paying_date` date,
	`installment_no` int NOT NULL,
	`id_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_cur_sal_bus_unit` int NOT NULL,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`remark` text,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deduction_month_year` varchar(20),
	CONSTRAINT `hr_advance_payment_history_id_adv_pay_hist` PRIMARY KEY(`id_adv_pay_hist`)
);
--> statement-breakpoint
CREATE TABLE `hr_advance_payment_template` (
	`id_advance_payment_template` int AUTO_INCREMENT NOT NULL,
	`advance_template_name` varchar(50) NOT NULL,
	`id_grade` int,
	`max_advance_amnt` decimal(14,2) NOT NULL,
	`remark` text,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hr_advance_payment_template_id_advance_payment_template` PRIMARY KEY(`id_advance_payment_template`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance` (
	`id_attendance` int AUTO_INCREMENT NOT NULL,
	`id_employee` int NOT NULL,
	`employee_custom_id` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_hr_attendance_file_import` int,
	`date` date NOT NULL,
	`in_time` varchar(50) NOT NULL,
	`out_time` varchar(50),
	`expended_time` bigint,
	`type` enum('Present','Late Present','Late Present - Early Out','Early Out','Partial Info','Outstation','Site Visit','Work From Home','Official Visit') NOT NULL DEFAULT 'Partial Info',
	`late_entry` varchar(10),
	`early_leave` varchar(10),
	`remark` text,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user_operator` int,
	`is_requested_from_portal` tinyint(1) NOT NULL DEFAULT 0,
	`id_por_outstation` int,
	`is_cpl_applied` enum('yes','no') NOT NULL DEFAULT 'no',
	CONSTRAINT `hr_attendance_id_attendance` PRIMARY KEY(`id_attendance`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_calculation_info` (
	`id_hr_attendance_calculation_info` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	`id_calendar_setup` int NOT NULL,
	`date_range` enum('default','custom') NOT NULL DEFAULT 'default',
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	CONSTRAINT `hr_attendance_calculation_info_id_hr_attendance_calculation_info` PRIMARY KEY(`id_hr_attendance_calculation_info`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_calendar_file_import` (
	`id_attendance_calendar_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`file_name` varchar(256) NOT NULL,
	`total_entry` int NOT NULL DEFAULT 0,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime,
	`invalid_entry` int NOT NULL DEFAULT 0,
	`id_project` int NOT NULL,
	`duplicate_entry` int NOT NULL DEFAULT 0,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`new_entry` int NOT NULL DEFAULT 0,
	`duplicate_ids` text,
	`invalid_ids` text,
	`not_found` int NOT NULL DEFAULT 0,
	`not_found_ids` text,
	`delete_by` int,
	`original_name` varchar(100),
	CONSTRAINT `hr_attendance_calendar_file_import_id_attendance_calendar_file_import` PRIMARY KEY(`id_attendance_calendar_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_delete_history` (
	`id_hr_attendance_delete_history` int AUTO_INCREMENT NOT NULL,
	`id_attendance` int NOT NULL,
	`employee_id` int NOT NULL,
	`attendance_data` text NOT NULL,
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`delete_reason` varchar(100) NOT NULL,
	CONSTRAINT `hr_attendance_delete_history_id_hr_attendance_delete_history` PRIMARY KEY(`id_hr_attendance_delete_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_entry` (
	`id_attendance_entry` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_department` int NOT NULL DEFAULT 0,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`entry_type` enum('file_entry','calender_entry') NOT NULL DEFAULT 'file_entry',
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`total_entry` int NOT NULL,
	`date_range` enum('default','custom') NOT NULL DEFAULT 'default',
	`date_from` date NOT NULL,
	`date_to` date NOT NULL,
	CONSTRAINT `hr_attendance_entry_id_attendance_entry` PRIMARY KEY(`id_attendance_entry`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_entry_error` (
	`id_hr_attendance_entry_error` int AUTO_INCREMENT NOT NULL,
	`id_hr_attendance_file_import` int,
	`employee_custom_id` int,
	`error_status` varchar(30),
	`id_user` int,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_attendance_entry_error_id_hr_attendance_entry_error` PRIMARY KEY(`id_hr_attendance_entry_error`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_file_import` (
	`id_hr_attendance_file_import` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` text,
	`insert_data` int NOT NULL DEFAULT 0,
	`update_data` int NOT NULL DEFAULT 0,
	`not_found_data` int NOT NULL DEFAULT 0,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	CONSTRAINT `hr_attendance_file_import_id_hr_attendance_file_import` PRIMARY KEY(`id_hr_attendance_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_file_import_errors` (
	`hr_attendance_file_import_errors_id` int NOT NULL,
	`hr_attendance_file_import_id` int NOT NULL,
	`employee_custom_id` int NOT NULL,
	`id_user` int NOT NULL,
	`error_message` varchar(256) NOT NULL,
	`publication_status` enum('activated') DEFAULT 'activated',
	`date_created` datetime DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime,
	CONSTRAINT `hr_attendance_file_import_errors_hr_attendance_file_import_errors_id` PRIMARY KEY(`hr_attendance_file_import_errors_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_monthly` (
	`id_att_monthly` int AUTO_INCREMENT NOT NULL,
	`id_employee` int NOT NULL,
	`id_project` int NOT NULL,
	`id_department` int NOT NULL DEFAULT 0,
	`month` int NOT NULL,
	`month_year` char(200) NOT NULL,
	`year` int NOT NULL,
	`att_data` text NOT NULL,
	`tot_present` int NOT NULL,
	`tot_with_pay_leave` float NOT NULL DEFAULT 0,
	`tot_without_pay_leave` float NOT NULL DEFAULT 0,
	`tot_weekend` int NOT NULL,
	`tot_holiday` int NOT NULL,
	`tot_late_present` int NOT NULL,
	`tot_present_offday` int NOT NULL DEFAULT 0,
	`tot_absent` int NOT NULL,
	`tot_early_out` int NOT NULL,
	`tot_compensatory_leave` int NOT NULL DEFAULT 0,
	`tot_expended_time` time NOT NULL,
	`entry_type` enum('dept_entry','single_entry','excel_entry','machine_entry') NOT NULL DEFAULT 'dept_entry',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	`amount_for_late_present` decimal(12,2) NOT NULL DEFAULT '0.00',
	`amount_for_leave_without_pay` decimal(12,2) NOT NULL DEFAULT '0.00',
	`amount_for_absent` decimal(12,2) NOT NULL DEFAULT '0.00',
	`amount_for_present_offday` decimal(12,2) NOT NULL DEFAULT '0.00',
	`status` enum('editable','not_editable') NOT NULL DEFAULT 'not_editable',
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_attendance_calendar_file_import` int,
	CONSTRAINT `hr_attendance_monthly_id_att_monthly` PRIMARY KEY(`id_att_monthly`)
);
--> statement-breakpoint
CREATE TABLE `hr_attendance_update_history` (
	`id_hr_attendance_update_history` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`id_hr_attendance` int NOT NULL,
	`old_data` varchar(256) NOT NULL,
	`new_data` varchar(256) NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`reason` enum('Edit','Delete','Update') NOT NULL DEFAULT 'Edit',
	CONSTRAINT `hr_attendance_update_history_id_hr_attendance_update_history` PRIMARY KEY(`id_hr_attendance_update_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_bank_branch_master` (
	`branch_id` int AUTO_INCREMENT NOT NULL,
	`branch_name` varchar(200) NOT NULL,
	`branch_address` text NOT NULL,
	`branch_routing_number` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`id_hr_tax_area_type` int,
	CONSTRAINT `hr_bank_branch_master_branch_id` PRIMARY KEY(`branch_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_bank_master` (
	`bank_id` int AUTO_INCREMENT NOT NULL,
	`bank_name` varchar(200) NOT NULL,
	`swift_code` varchar(100) NOT NULL,
	`routing_number` int NOT NULL,
	`description` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_bank_master_bank_id` PRIMARY KEY(`bank_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_bonus_setup` (
	`bonus_setup_id` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`salary_type` enum('Basic','Gross') NOT NULL,
	`bonus_percentage` decimal(10,2) NOT NULL,
	`description` text NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`bonus_type_id` int NOT NULL,
	`payable_type` enum('With Payslip','Without Payslip') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`year_month` date NOT NULL,
	`budget_connection` enum('yes','no') NOT NULL DEFAULT 'no',
	`id_voucher` int,
	`eligible_days` int NOT NULL,
	`eligible_date` date NOT NULL,
	`status` enum('pending','approved','deleted','denied') NOT NULL DEFAULT 'pending',
	`id_fiscal_year` int,
	`employee_group` enum('local','local_expat_both') NOT NULL DEFAULT 'local',
	CONSTRAINT `hr_bonus_setup_bonus_setup_id` PRIMARY KEY(`bonus_setup_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_bonus_setup_history` (
	`bonus_setup_history_id` int AUTO_INCREMENT NOT NULL,
	`bonus_setup_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`previous_id_users` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_bonus_setup_history_bonus_setup_history_id` PRIMARY KEY(`bonus_setup_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_bonus_setup_vouchers` (
	`id_hr_bonus_setup_vouchers` int AUTO_INCREMENT NOT NULL,
	`id_hr_bonus_setup` int NOT NULL,
	`id_voucher` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`amount` decimal(12,2) NOT NULL,
	`id_cost_center_business_unit` int NOT NULL,
	CONSTRAINT `hr_bonus_setup_vouchers_id_hr_bonus_setup_vouchers` PRIMARY KEY(`id_hr_bonus_setup_vouchers`)
);
--> statement-breakpoint
CREATE TABLE `hr_business_unit` (
	`id_business_unit` int AUTO_INCREMENT NOT NULL,
	`unit_name` varchar(50) NOT NULL,
	`id_company` int NOT NULL,
	`id_city` int NOT NULL,
	`contact_person_name` varchar(50) NOT NULL,
	`contact_person_no` varchar(20) NOT NULL,
	`id_user` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_business_unit_id_business_unit` PRIMARY KEY(`id_business_unit`)
);
--> statement-breakpoint
CREATE TABLE `hr_calendar_setup` (
	`id_calendar_setup` int AUTO_INCREMENT NOT NULL,
	`start_day` int NOT NULL,
	`end_day` varchar(5),
	`month_count` enum('Single','Multiple') NOT NULL DEFAULT 'Single',
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_calendar_setup_id_calendar_setup` PRIMARY KEY(`id_calendar_setup`)
);
--> statement-breakpoint
CREATE TABLE `hr_city` (
	`id_city` int AUTO_INCREMENT NOT NULL,
	`city_name` varchar(100) NOT NULL,
	`id_user` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_city_id_city` PRIMARY KEY(`id_city`)
);
--> statement-breakpoint
CREATE TABLE `hr_company_setup` (
	`company_setup_id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(100) NOT NULL,
	`company_address` text NOT NULL,
	`city` varchar(80) NOT NULL,
	`establish_date` date NOT NULL,
	`company_ac_number` int,
	`trade_license` int,
	`tax_deduction_ac` int NOT NULL,
	`pf_reg_number` int NOT NULL,
	`pf_reg_date` date NOT NULL,
	`gratuity_reg_num` int,
	`retirement_age` int,
	`contact_person_id` int NOT NULL,
	`contact_person_desig` int NOT NULL,
	`website` varchar(80) NOT NULL,
	`company_email` varchar(80) NOT NULL,
	`telephone_num` int NOT NULL,
	`fax_number` int NOT NULL,
	`business_type` varchar(80) NOT NULL,
	`business_group` varchar(100),
	`company_category` varchar(255) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`group_id` int NOT NULL,
	CONSTRAINT `hr_company_setup_company_setup_id` PRIMARY KEY(`company_setup_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_compensatory_leave` (
	`id_compensatory_leave` int AUTO_INCREMENT NOT NULL,
	`id_employee` int,
	`date_of_duty` date,
	`cpl_date` date,
	`remark` text,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_business_unit` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int,
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_por_compensatory_leave` int,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`type` varchar(10) NOT NULL DEFAULT 'cpl',
	`leave_type` enum('CPL','Monthly') NOT NULL,
	`id_monthly_leave_file_import` int,
	`replacement_person` int,
	CONSTRAINT `hr_compensatory_leave_id_compensatory_leave` PRIMARY KEY(`id_compensatory_leave`)
);
--> statement-breakpoint
CREATE TABLE `hr_compensatory_leave_policy` (
	`id_compensatory_leave_policy` int AUTO_INCREMENT NOT NULL,
	`salary_limit` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hr_compensatory_leave_policy_id_compensatory_leave_policy` PRIMARY KEY(`id_compensatory_leave_policy`)
);
--> statement-breakpoint
CREATE TABLE `hr_contact_employee_details` (
	`id_hr_contact_employee_details` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_users` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`time_period_status` enum('New','Renewed') NOT NULL DEFAULT 'New',
	`time_period_month` int NOT NULL,
	`time_period_start_date` date NOT NULL,
	`time_period_end_date` date NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`contact_status` enum('Expired','Running') NOT NULL DEFAULT 'Running',
	`id_hr_organization_setup_file_import` int,
	CONSTRAINT `hr_contact_employee_details_id_hr_contact_employee_details` PRIMARY KEY(`id_hr_contact_employee_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_csv_file_upload` (
	`id_hr_csv_file_upload` int AUTO_INCREMENT NOT NULL,
	`file_name` text,
	`original_name` text,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`total_data` int,
	`valid_entry` int,
	CONSTRAINT `hr_csv_file_upload_id_hr_csv_file_upload` PRIMARY KEY(`id_hr_csv_file_upload`)
);
--> statement-breakpoint
CREATE TABLE `hr_csv_file_upload_data` (
	`id_hr_csv_file_upload_data` int AUTO_INCREMENT NOT NULL,
	`id_hr_csv_file_upload` int,
	`author` text,
	`title` text,
	`publish_at` text,
	`publish_year` text,
	`doi_link` text,
	`science_direct_link` text,
	`abstract` text,
	`keywords` text,
	CONSTRAINT `hr_csv_file_upload_data_id_hr_csv_file_upload_data` PRIMARY KEY(`id_hr_csv_file_upload_data`)
);
--> statement-breakpoint
CREATE TABLE `hr_deduction_heads` (
	`deduction_heads_id` int AUTO_INCREMENT NOT NULL,
	`deduction_heads_name` varchar(200) NOT NULL,
	`deduction_heads_type` enum('Fixed','Variable') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`is_system` enum('yes','no') NOT NULL DEFAULT 'no',
	`is_tax` enum('yes','no') NOT NULL DEFAULT 'no',
	`is_taxable` enum('yes','no') NOT NULL DEFAULT 'yes',
	CONSTRAINT `hr_deduction_heads_deduction_heads_id` PRIMARY KEY(`deduction_heads_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_deduction_heads_history` (
	`deduction_heads_history_id` int AUTO_INCREMENT NOT NULL,
	`deduction_heads_id` int NOT NULL,
	`deduction_heads_name` varchar(200) NOT NULL,
	`deduction_heads_type` enum('Fixed','Variable') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`is_system` enum('yes','no'),
	`is_tax` enum('yes','no') NOT NULL,
	`is_taxable` enum('yes','no') NOT NULL,
	CONSTRAINT `hr_deduction_heads_history_deduction_heads_history_id` PRIMARY KEY(`deduction_heads_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_denomination` (
	`denomination_id` int AUTO_INCREMENT NOT NULL,
	`currency_value` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_denomination_denomination_id` PRIMARY KEY(`denomination_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_departments` (
	`id_department` int AUTO_INCREMENT NOT NULL,
	`department` varchar(200) NOT NULL,
	`description` text,
	`id_user` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_departments_id_department` PRIMARY KEY(`id_department`)
);
--> statement-breakpoint
CREATE TABLE `hr_designation_master` (
	`designation_id` int AUTO_INCREMENT NOT NULL,
	`designation_title` varchar(100) NOT NULL,
	`short_form` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_designation_master_designation_id` PRIMARY KEY(`designation_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_earning_heads` (
	`earning_heads_id` int AUTO_INCREMENT NOT NULL,
	`earning_heads_name` varchar(200) NOT NULL,
	`earning_heads_type` enum('Fixed','Variable') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`is_system` enum('yes','no') DEFAULT 'no',
	`part_of_gross` enum('yes','no','bonus'),
	CONSTRAINT `hr_earning_heads_earning_heads_id` PRIMARY KEY(`earning_heads_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_earning_heads_history` (
	`earning_heads_history_id` int AUTO_INCREMENT NOT NULL,
	`earning_heads_id` int NOT NULL,
	`earning_heads_name` varchar(200) NOT NULL,
	`earning_heads_type` enum('Fixed','Variable') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`is_system` enum('yes','no') NOT NULL,
	`part_of_gross` enum('yes','no','bonus'),
	CONSTRAINT `hr_earning_heads_history_earning_heads_history_id` PRIMARY KEY(`earning_heads_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_education` (
	`education_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_users` int NOT NULL,
	`id_hr_employee_education_file_import` int,
	`id_hris_file_entry_details` int,
	`id_hr_education_levels` int NOT NULL,
	`id_hr_exam_titles` int NOT NULL,
	`id_hr_institutes` int NOT NULL,
	`id_hr_education_boards` int,
	`id_hr_education_concentrations` int,
	`result` varchar(45) NOT NULL,
	`marks` double(12,2),
	`scale` double(12,2),
	`cgpa` double(12,2),
	`year_of_passing` varchar(6) NOT NULL,
	`duration` varchar(2) NOT NULL,
	`achievement` text,
	`remark` text,
	`file_name` varchar(255),
	`original_name` varchar(255),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_education_education_id` PRIMARY KEY(`education_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_education_boards` (
	`id_hr_education_boards` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`board_name` varchar(50) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_education_boards_id_hr_education_boards` PRIMARY KEY(`id_hr_education_boards`)
);
--> statement-breakpoint
CREATE TABLE `hr_education_concentrations` (
	`id_hr_education_concentrations` int AUTO_INCREMENT NOT NULL,
	`concentration_name` text NOT NULL,
	`remark` text,
	`id_hr_employee_education_file_import` int,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_upated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_education_concentrations_id_hr_education_concentrations` PRIMARY KEY(`id_hr_education_concentrations`)
);
--> statement-breakpoint
CREATE TABLE `hr_education_levels` (
	`id_hr_education_levels` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`education_level` varchar(100) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`remarks` text,
	CONSTRAINT `hr_education_levels_id_hr_education_levels` PRIMARY KEY(`id_hr_education_levels`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee` (
	`employee_id` int AUTO_INCREMENT NOT NULL,
	`employee_custom_id` varchar(100) NOT NULL,
	`employee_legacy_id` varchar(100),
	`temp_id_projects` int,
	`first_name` varchar(45) NOT NULL,
	`middle_name` varchar(100) NOT NULL,
	`last_name` varchar(45),
	`phone_number` varchar(45) NOT NULL,
	`gender` varchar(45),
	`marital_status` varchar(45),
	`father_name` varchar(45) NOT NULL,
	`mother_name` varchar(45) NOT NULL,
	`present_address` text NOT NULL,
	`permanant_address` text NOT NULL,
	`email` varchar(100) NOT NULL,
	`nid` varchar(100) NOT NULL,
	`blood_group` varchar(45),
	`religion` varchar(45),
	`avatar` varchar(45),
	`dob` date,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`telephone_number` varchar(100) NOT NULL,
	`driving_liscence` varchar(200) NOT NULL,
	`spouse_name` varchar(100) NOT NULL,
	`passport` varchar(100) NOT NULL,
	`start_title` varchar(100) NOT NULL,
	`end_title` varchar(100) NOT NULL,
	`birth_certificate_number` varchar(100) NOT NULL,
	`emergency_phone_number` varchar(100) NOT NULL,
	`home_district` varchar(100),
	`full_name` varchar(200) NOT NULL,
	`password` varchar(100),
	`password_changed` enum('yes','no') DEFAULT 'no',
	`tin_number` varchar(100) NOT NULL,
	`emergency_contact_name` varchar(100) NOT NULL,
	`emergency_contact_relation` varchar(100) NOT NULL,
	`spouse_profession` varchar(100) NOT NULL,
	`spouse_dob` varchar(100) NOT NULL,
	`marraigeDate` varchar(100) NOT NULL,
	`spouse_blood_group` varchar(100) NOT NULL,
	`tin_certificate` varchar(100) NOT NULL,
	`tax_circle` varchar(100),
	`tax_zone` varchar(100),
	`id_hr_tax_area_type` int,
	`id_hris_talent_acquisition_joining_details` int,
	`id_interview_appraised_candidate` int,
	`id_hr_employee_insert_file_import` int,
	`id_country_details` int,
	`avatar_original_name` text,
	`tin_original_name` text,
	`remarks` text,
	`id_hris_job_requisition_summery` int,
	`id_hris_file_entry_details` int,
	`id_por_employee_car_ait` int,
	`id_por_employee_tin_info` int,
	`id_users` int,
	CONSTRAINT `hr_employee_employee_id` PRIMARY KEY(`employee_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_bonus_info` (
	`employee_bonus_info_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`bonus_setup_id` int NOT NULL,
	`bonus_amount` decimal(12,2) NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`payable_type` enum('With Payslip','Without Payslip') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`year_month` date NOT NULL,
	`paid_amount` decimal(12,2) NOT NULL,
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`remarks` text,
	CONSTRAINT `hr_employee_bonus_info_employee_bonus_info_id` PRIMARY KEY(`employee_bonus_info_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_bonus_info_history` (
	`employee_bonus_info_history_id` int AUTO_INCREMENT NOT NULL,
	`bonus_setup_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_employee_bonus_info_history_employee_bonus_info_history_id` PRIMARY KEY(`employee_bonus_info_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_bonus_info_individual_history` (
	`individual_bonus_history_id` int AUTO_INCREMENT NOT NULL,
	`employee_bonus_info_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_employee_bonus_info_individual_history_individual_bonus_history_id` PRIMARY KEY(`individual_bonus_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_cost_center_setup` (
	`id_hr_employee_cost_center_setup` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`remarks` text,
	`id_users` int NOT NULL,
	`deleted_by` int,
	`id_hr_organization_setup_file_import` int,
	CONSTRAINT `hr_employee_cost_center_setup_id_hr_employee_cost_center_setup` PRIMARY KEY(`id_hr_employee_cost_center_setup`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_cost_center_setup_details` (
	`id_hr_employee_cost_center_setup_details` int AUTO_INCREMENT NOT NULL,
	`id_hr_employee_cost_center_setup` int NOT NULL,
	`id_cost_center` int NOT NULL,
	`cost_center_percentage` decimal(5,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`remarks` text,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` int,
	`id_users` int NOT NULL,
	`id_cost_center_business_unit` int,
	CONSTRAINT `hr_employee_cost_center_setup_details_id_hr_employee_cost_center_setup_details` PRIMARY KEY(`id_hr_employee_cost_center_setup_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_description` (
	`employee_description_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`description` text NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_employee_description_employee_description_id` PRIMARY KEY(`employee_description_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_education_file_import` (
	`id_hr_employee_education_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`id_projects` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` text,
	`data_type` enum('Education','Institute','Concentration'),
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	CONSTRAINT `hr_employee_education_file_import_id_hr_employee_education_file_import` PRIMARY KEY(`id_hr_employee_education_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_experience_file_import` (
	`id_hr_employee_experience_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`id_projects` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` text,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	CONSTRAINT `hr_employee_experience_file_import_id_hr_employee_experience_file_import` PRIMARY KEY(`id_hr_employee_experience_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_history` (
	`hr_employee_history_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`employee_custom_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit_ind','delete','edit_excel') NOT NULL,
	`id_hr_employee_update_file_import` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_employee_history_hr_employee_history_id` PRIMARY KEY(`hr_employee_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_insert_file_import` (
	`id_hr_employee_insert_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`id_projects` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	`original_name` varchar(100),
	CONSTRAINT `hr_employee_insert_file_import_id_hr_employee_insert_file_import` PRIMARY KEY(`id_hr_employee_insert_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_nature_type` (
	`id_employee_nature_type` int AUTO_INCREMENT NOT NULL,
	`type_name` varchar(50) NOT NULL,
	`remark` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`time_period` enum('YES','NO') NOT NULL DEFAULT 'NO',
	`id_users` int NOT NULL,
	CONSTRAINT `hr_employee_nature_type_id_employee_nature_type` PRIMARY KEY(`id_employee_nature_type`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_remarks` (
	`id_hr_employee_remarks` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`remarks` text NOT NULL,
	`reminder_date` date,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`file_name` text,
	`original_name` text,
	CONSTRAINT `hr_employee_remarks_id_hr_employee_remarks` PRIMARY KEY(`id_hr_employee_remarks`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_remarks_email_notifiers` (
	`id_hr_employee_remarks_email_notifiers` int unsigned AUTO_INCREMENT NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_hr_employee_remarks` int NOT NULL,
	`notifier_employee_id` int NOT NULL,
	CONSTRAINT `hr_employee_remarks_email_notifiers_id_hr_employee_remarks_email_notifiers` PRIMARY KEY(`id_hr_employee_remarks_email_notifiers`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_remarks_history` (
	`id_hr_employee_remarks_history` int unsigned AUTO_INCREMENT NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_hr_employee_remarks` int NOT NULL,
	`old_data` text NOT NULL,
	`updated_by` int NOT NULL,
	CONSTRAINT `hr_employee_remarks_history_id_hr_employee_remarks_history` PRIMARY KEY(`id_hr_employee_remarks_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_salary_business_unit` (
	`employee_salary_business_unit_id` int AUTO_INCREMENT NOT NULL,
	`organization_setup_id` int NOT NULL,
	`employee_id` int NOT NULL,
	`salary_business_unit_id` int NOT NULL,
	`salary_percentage` decimal(5,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_employee_salary_business_unit_employee_salary_business_unit_id` PRIMARY KEY(`employee_salary_business_unit_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_salary_business_unit_history` (
	`employee_salary_business_unit_history_id` int AUTO_INCREMENT NOT NULL,
	`organization_setup_id` int NOT NULL,
	`employee_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_employee_salary_business_unit_history_employee_salary_business_unit_history_id` PRIMARY KEY(`employee_salary_business_unit_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_salary_info` (
	`employee_salary_info_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`pay_structure_template_id` int NOT NULL,
	`basic_salary` decimal(12,2) NOT NULL,
	`gross_salary` decimal(12,2) NOT NULL,
	`gross_deduction` decimal(12,2) NOT NULL,
	`net_salary` decimal(12,2) NOT NULL,
	`ctc_salary` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`pay_structure_setup_records_id` int NOT NULL,
	`year_month` date NOT NULL,
	`id_hr_pay_structure_setup_file_import` int,
	CONSTRAINT `hr_employee_salary_info_employee_salary_info_id` PRIMARY KEY(`employee_salary_info_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_salary_info_history` (
	`employee_salary_info_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_structure_setup_records_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_employee_salary_info_history_employee_salary_info_history_id` PRIMARY KEY(`employee_salary_info_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_sepcial_weekends_file_upload` (
	`id_hr_employee_sepcial_weekends_file_upload` int AUTO_INCREMENT NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_file_name` varchar(100) NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`valid_entry` int,
	`invalid_entry` int,
	`id_project` int NOT NULL,
	CONSTRAINT `hr_employee_sepcial_weekends_file_upload_id_hr_employee_sepcial_weekends_file_upload` PRIMARY KEY(`id_hr_employee_sepcial_weekends_file_upload`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_special_weekends` (
	`id_hr_employee_special_weekends` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`weekend_date` date NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_hr_employee_sepcial_weekends_file_upload` int NOT NULL,
	CONSTRAINT `hr_employee_special_weekends_id_hr_employee_special_weekends` PRIMARY KEY(`id_hr_employee_special_weekends`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_tax_changes_history` (
	`id_hr_employee_tax_changes_history` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`previous_tax` double(12,2),
	`new_tax` double(12,2),
	`tax_difference` double(12,2),
	`prev_pay_structure_setup_records_id` int,
	`pay_structure_setup_records_id` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`year_month` date NOT NULL,
	`id_hr_tax_recalculate` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_employee_tax_changes_history_id_hr_employee_tax_changes_history` PRIMARY KEY(`id_hr_employee_tax_changes_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_tax_info` (
	`id_hr_employee_tax_info` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`total_tax_paid_amount` double(12,2) NOT NULL,
	`total_basic_salary` double(12,2) NOT NULL,
	`total_gross_salary` double(12,2) NOT NULL,
	`total_ctc_salary` double(12,2) NOT NULL,
	`total_month` int NOT NULL,
	`total_deduction_others` double(12,2),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`previous_employee_id` int,
	`adjusted_amount` double(12,2),
	`adjusted_type` enum('tax_added','tax_return'),
	`id_por_employee_car_ait` int,
	`basic_salary` double(12,2) DEFAULT 0,
	`gross_salary` double(12,2) DEFAULT 0,
	`ctc_salary` double(12,2) DEFAULT 0,
	`remarks` text,
	`setup_from` text,
	CONSTRAINT `hr_employee_tax_info_id_hr_employee_tax_info` PRIMARY KEY(`id_hr_employee_tax_info`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_tax_info_details` (
	`id_hr_employee_tax_info_details` int AUTO_INCREMENT NOT NULL,
	`id_hr_employee_tax_info` int NOT NULL,
	`employee_id` int NOT NULL,
	`id_pay_slip_generation_info` int,
	`pay_slip_generation_id` int,
	`bonus_setup_id` int,
	`employee_bonus_info_id` int,
	`bonus_type_id` int,
	`bonus_amount` double(12,2),
	`payable_type` enum('With Payslip','Without Payslip'),
	`type` enum('salary','bonus') NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`entry_from` text,
	CONSTRAINT `hr_employee_tax_info_details_id_hr_employee_tax_info_details` PRIMARY KEY(`id_hr_employee_tax_info_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_transfer` (
	`employee_transfer_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`previous_business_unit_id` int NOT NULL,
	`current_business_unit_id` int NOT NULL,
	`previous_effective_date` date NOT NULL,
	`current_effective_date` date NOT NULL,
	`transfer_entry_date` date NOT NULL,
	`transfer_status` enum('Done','Pending','Denied') NOT NULL DEFAULT 'Pending',
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`id_reporting_person` int,
	`previous_id_hr_employee_cost_center_setup` int,
	`pay_structure_record_id` int,
	CONSTRAINT `hr_employee_transfer_employee_transfer_id` PRIMARY KEY(`employee_transfer_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_update_file_import` (
	`id_hr_employee_update_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`id_projects` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` text,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	CONSTRAINT `hr_employee_update_file_import_id_hr_employee_update_file_import` PRIMARY KEY(`id_hr_employee_update_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_weekends` (
	`id_hr_employee_weekends` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_hr_weekend` int NOT NULL DEFAULT 7,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`weekend_type` enum('all','custom') NOT NULL DEFAULT 'all',
	CONSTRAINT `hr_employee_weekends_id_hr_employee_weekends` PRIMARY KEY(`id_hr_employee_weekends`)
);
--> statement-breakpoint
CREATE TABLE `hr_employee_weekends_special_cases` (
	`id_hr_employee_weekends_special_cases` int AUTO_INCREMENT NOT NULL,
	`id_hr_employee_weekends` int NOT NULL,
	`first_week` tinyint(1) NOT NULL DEFAULT 0,
	`second_week` tinyint(1) NOT NULL DEFAULT 0,
	`third_week` tinyint(1) NOT NULL DEFAULT 0,
	`fourth_week` tinyint(1) NOT NULL DEFAULT 0,
	`fifth_week` tinyint(1) NOT NULL DEFAULT 0,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_employee_weekends_special_cases_id_hr_employee_weekends_special_cases` PRIMARY KEY(`id_hr_employee_weekends_special_cases`)
);
--> statement-breakpoint
CREATE TABLE `hr_equivalent_designation` (
	`equivalent_designation_id` int AUTO_INCREMENT NOT NULL,
	`equivalent_designation_title` varchar(100) NOT NULL,
	`equivalent_short_form` varchar(25) NOT NULL,
	`description` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_equivalent_designation_equivalent_designation_id` PRIMARY KEY(`equivalent_designation_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_exam_titles` (
	`id_hr_exam_titles` int AUTO_INCREMENT NOT NULL,
	`id_hr_education_levels` int NOT NULL,
	`id_users` int NOT NULL,
	`exam_titles` varchar(100) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
	`remarks` text,
	CONSTRAINT `hr_exam_titles_id_hr_exam_titles` PRIMARY KEY(`id_hr_exam_titles`)
);
--> statement-breakpoint
CREATE TABLE `hr_excel_updated_employee_info` (
	`id_hr_excel_updated_employee_info` int AUTO_INCREMENT NOT NULL,
	`id_hr_employee_insert_file_import` int NOT NULL,
	`employee_id` int NOT NULL,
	`employee_custom_id` int NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	CONSTRAINT `hr_excel_updated_employee_info_id_hr_excel_updated_employee_info` PRIMARY KEY(`id_hr_excel_updated_employee_info`)
);
--> statement-breakpoint
CREATE TABLE `hr_experience` (
	`experience_id` int AUTO_INCREMENT NOT NULL,
	`designation` varchar(100) NOT NULL,
	`department` varchar(45) NOT NULL,
	`company` varchar(100) NOT NULL,
	`remark` text,
	`start_date` date,
	`end_date` date,
	`duration_year` int,
	`duration_month` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`employee_id` int NOT NULL,
	`file_name` varchar(200),
	`original_name` varchar(200),
	`id_hris_file_entry_details` int,
	`id_hr_employee_experience_file_import` int,
	CONSTRAINT `hr_experience_experience_id` PRIMARY KEY(`experience_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_farewell` (
	`id_hr_farewell` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`farewell_date` date NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`resign_date` date,
	CONSTRAINT `hr_farewell_id_hr_farewell` PRIMARY KEY(`id_hr_farewell`)
);
--> statement-breakpoint
CREATE TABLE `hr_final_settlement` (
	`final_settlement_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`year_month` date NOT NULL,
	`month_year` varchar(50) NOT NULL,
	`id_business_unit` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`budget_connection` enum('yes','no') DEFAULT 'no',
	`id_earning_voucher` int,
	`id_deduction_voucher` int,
	`voucher_date` date,
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`account_paid` decimal(12,2) NOT NULL DEFAULT '0.00',
	`account_receipt` decimal(12,2) NOT NULL DEFAULT '0.00',
	`performance_status` enum('Excellent','Good','Average','Below Average','Not Required'),
	`validated_by` int,
	`remarks` varchar(255),
	CONSTRAINT `hr_final_settlement_final_settlement_id` PRIMARY KEY(`final_settlement_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_final_settlement_details` (
	`final_settlement_details_id` int AUTO_INCREMENT NOT NULL,
	`final_settlement_id` int NOT NULL,
	`employee_id` int NOT NULL,
	`head_type` varchar(150) NOT NULL,
	`earning_deduction_heads_id` int NOT NULL,
	`heads_amount` decimal(12,2) NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`particular` text,
	`remark` text,
	CONSTRAINT `hr_final_settlement_details_final_settlement_details_id` PRIMARY KEY(`final_settlement_details_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_final_settlement_history` (
	`final_settlement_history_id` int AUTO_INCREMENT NOT NULL,
	`final_settlement_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_final_settlement_history_final_settlement_history_id` PRIMARY KEY(`final_settlement_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_final_settlement_performance_status_providers` (
	`id_hr_final_settlement_performance_status_provider` int AUTO_INCREMENT NOT NULL,
	`id_hr_final_settlement` int NOT NULL,
	`employee_id` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_final_settlement_performance_status_providers_id_hr_final_settlement_performance_status_provider` PRIMARY KEY(`id_hr_final_settlement_performance_status_provider`)
);
--> statement-breakpoint
CREATE TABLE `hr_finger_print_marge_file_import` (
	`id_finger_print_marge_file_import` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`file_name` text NOT NULL,
	`valid_entry` int,
	`invalid_entry` int,
	`invalid_ids` text,
	`duplicate_entry` int,
	`duplicate_ids` text,
	`total_invalid_employee_id` int,
	`invalid_employee_ids` text,
	`total_duplicate_machine_id` int,
	`total_duplicate_machine_ids` text,
	`original_name` varchar(100),
	CONSTRAINT `hr_finger_print_marge_file_import_id_finger_print_marge_file_import` PRIMARY KEY(`id_finger_print_marge_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_finger_print_marge_record` (
	`id_finger_print_marge_record` int AUTO_INCREMENT NOT NULL,
	`id_finger_print_marge_file_import` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`employee_id` int NOT NULL,
	`office_id` int NOT NULL,
	`finger_print_id` int NOT NULL,
	CONSTRAINT `hr_finger_print_marge_record_id_finger_print_marge_record` PRIMARY KEY(`id_finger_print_marge_record`)
);
--> statement-breakpoint
CREATE TABLE `hr_fp_machine_attendance_logs` (
	`id_hr_fp_machine_attendance_log` int AUTO_INCREMENT NOT NULL,
	`id_hr_fp_machines` int NOT NULL,
	`machine_uid` int,
	`attendance_status` int NOT NULL,
	`attendance_timestamp` datetime NOT NULL,
	`attendance_punch` int,
	`machine_user_id` varchar(35) NOT NULL,
	`input_method` enum('live','pull') NOT NULL DEFAULT 'live',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_fp_machine_attendance_logs_id_hr_fp_machine_attendance_log` PRIMARY KEY(`id_hr_fp_machine_attendance_log`)
);
--> statement-breakpoint
CREATE TABLE `hr_fp_machine_attendance_logs_copy` (
	`id_hr_fp_machine_attendance_log` int AUTO_INCREMENT NOT NULL,
	`id_hr_fp_machines` int NOT NULL,
	`machine_uid` int,
	`attendance_status` int NOT NULL,
	`attendance_timestamp` datetime NOT NULL,
	`attendance_punch` int,
	`machine_user_id` varchar(35) NOT NULL,
	`input_method` enum('live','pull') NOT NULL DEFAULT 'live',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_fp_machine_attendance_logs_copy_id_hr_fp_machine_attendance_log` PRIMARY KEY(`id_hr_fp_machine_attendance_log`)
);
--> statement-breakpoint
CREATE TABLE `hr_fp_machine_sync_log` (
	`id_hr_fp_machine_sync_log` int AUTO_INCREMENT NOT NULL,
	`id_hr_fp_machines` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`attendance_count` int,
	`user_count` int,
	`status` enum('started','success','failed'),
	`message` text,
	CONSTRAINT `hr_fp_machine_sync_log_id_hr_fp_machine_sync_log` PRIMARY KEY(`id_hr_fp_machine_sync_log`)
);
--> statement-breakpoint
CREATE TABLE `hr_fp_machine_user_templates` (
	`id_hr_fp_machine_template` int AUTO_INCREMENT NOT NULL,
	`machine_template_data` text NOT NULL,
	`template_hash` varchar(64) NOT NULL,
	`fid` int NOT NULL,
	`valid` int NOT NULL,
	`id_hr_fp_machine_users` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_fp_machine_user_templates_id_hr_fp_machine_template` PRIMARY KEY(`id_hr_fp_machine_template`)
);
--> statement-breakpoint
CREATE TABLE `hr_fp_machine_users` (
	`id_hr_fp_machine_users` int AUTO_INCREMENT NOT NULL,
	`id_hr_fp_machines` int NOT NULL,
	`machine_user_name` varchar(128),
	`machine_user_privilege` int,
	`machine_user_group` varchar(32),
	`machine_uid` int NOT NULL,
	`machine_user_id` varchar(32),
	`machine_user_password` varchar(45),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
	`status` enum('active','deleted') DEFAULT 'active',
	CONSTRAINT `hr_fp_machine_users_id_hr_fp_machine_users` PRIMARY KEY(`id_hr_fp_machine_users`),
	CONSTRAINT `ux_machine_user` UNIQUE(`id_hr_fp_machines`,`machine_uid`)
);
--> statement-breakpoint
CREATE TABLE `hr_fp_machines` (
	`id_hr_fp_machines` int AUTO_INCREMENT NOT NULL,
	`ip_address` varchar(15) NOT NULL,
	`work_station_id` int,
	`remarks` text,
	`id_users` int,
	`type` enum('fixed','floating'),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`machine_serial_number` varchar(45),
	`machine_firmware_version` varchar(45),
	`machine_device_name` varchar(45) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`machine_status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`port` varchar(6) DEFAULT '4370',
	`current_user_count` int,
	`max_user_count` int,
	`current_fingerprint_count` int,
	`max_fingerprint_count` int,
	`current_face_count` int,
	`max_face_count` int,
	`current_attendance_count` int,
	`max_attendance_count` int,
	`current_system_time` timestamp,
	`last_data_cleaned` timestamp,
	`time_difference` int,
	CONSTRAINT `hr_fp_machines_id_hr_fp_machines` PRIMARY KEY(`id_hr_fp_machines`),
	CONSTRAINT `ux_machine_ip` UNIQUE(`ip_address`)
);
--> statement-breakpoint
CREATE TABLE `hr_fp_pages` (
	`id_hr_fp_pages` int AUTO_INCREMENT NOT NULL,
	`id_parent` int,
	`page_title` varchar(250),
	`page_link` varchar(250),
	`slug` varchar(250),
	`menu_type` enum('menu','sub-menu') DEFAULT 'menu',
	`sequence` int,
	`is_visible` enum('yes','no') DEFAULT 'yes',
	`icon` varchar(250),
	`active_status` enum('active','inactive') DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_fp_pages_id_hr_fp_pages` PRIMARY KEY(`id_hr_fp_pages`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `hr_fp_user_permission` (
	`id_hr_fp_users_permission` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`id_hr_fp_pages` int NOT NULL,
	`active_status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_fp_user_permission_id_hr_fp_users_permission` PRIMARY KEY(`id_hr_fp_users_permission`)
);
--> statement-breakpoint
CREATE TABLE `hr_grades` (
	`id_grade` int AUTO_INCREMENT NOT NULL,
	`grade_name` varchar(200) NOT NULL,
	`min_range` double NOT NULL,
	`max_range` double NOT NULL,
	`remark` varchar(200),
	`id_user` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_grades_id_grade` PRIMARY KEY(`id_grade`)
);
--> statement-breakpoint
CREATE TABLE `hr_group_setup` (
	`group_id` int AUTO_INCREMENT NOT NULL,
	`group_name` varchar(200) NOT NULL,
	`group_address` text NOT NULL,
	`fax_number` int NOT NULL,
	`group_email` varchar(200) NOT NULL,
	`telephone_number` int NOT NULL,
	`website` varchar(80) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_group_setup_group_id` PRIMARY KEY(`group_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_holding_heads` (
	`id_holding_heads` int AUTO_INCREMENT NOT NULL,
	`earning_deduction_id` int NOT NULL,
	`head_type` varchar(20) NOT NULL,
	`id_business_unit` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`remarks` varchar(150),
	CONSTRAINT `hr_holding_heads_id_holding_heads` PRIMARY KEY(`id_holding_heads`)
);
--> statement-breakpoint
CREATE TABLE `hr_holiday_type` (
	`holiday_type_id` int AUTO_INCREMENT NOT NULL,
	`holiday_type_name` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_holiday_type_holiday_type_id` PRIMARY KEY(`holiday_type_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_holidays` (
	`id_holiday` int AUTO_INCREMENT NOT NULL,
	`id_holiday_type` int,
	`start_date` date,
	`end_date` date,
	`dates` date,
	`total_days` int,
	`remark` text,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int,
	`id_project` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hr_holidays_id_holiday` PRIMARY KEY(`id_holiday`)
);
--> statement-breakpoint
CREATE TABLE `hr_increment_file_import` (
	`id_increment_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`file_name` varchar(256) NOT NULL,
	`total_entry` int NOT NULL DEFAULT 0,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime,
	`invalid_entry` int NOT NULL DEFAULT 0,
	`id_project` int NOT NULL,
	`duplicate_entry` int NOT NULL DEFAULT 0,
	`id_fiscal_year` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`new_entry` int NOT NULL DEFAULT 0,
	`duplicate_ids` text,
	`invalid_ids` text,
	`not_found` int NOT NULL DEFAULT 0,
	`not_found_ids` text,
	`delete_by` int,
	`original_name` varchar(100),
	CONSTRAINT `hr_increment_file_import_id_increment_file_import` PRIMARY KEY(`id_increment_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_increment_history` (
	`id_hr_increment_history` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`increment_percentage` decimal(5,2) NOT NULL,
	`increment_amount` decimal(7,2) NOT NULL,
	`id_hr_increment_file_import` int,
	`effective_date` date,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_increment_history_id_hr_increment_history` PRIMARY KEY(`id_hr_increment_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_increment_records` (
	`id_increment_record` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_heads` int NOT NULL,
	`head_type` enum('earning','deduction') NOT NULL DEFAULT 'earning',
	`increment_amount` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime,
	`id_increment_file_import` int,
	CONSTRAINT `hr_increment_records_id_increment_record` PRIMARY KEY(`id_increment_record`)
);
--> statement-breakpoint
CREATE TABLE `hr_institutes` (
	`id_hr_institutes` int AUTO_INCREMENT NOT NULL,
	`institute_type` enum('School','College','School And College','University','Technical','Madrasha','Professional Degree','Training') NOT NULL,
	`institute_name` text NOT NULL,
	`id_hr_employee_education_file_import` int,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_country` int,
	`division` varchar(255),
	`id_division` int,
	`district` varchar(255),
	`id_districts` int,
	`thana` varchar(255),
	`eiin` int,
	`village_road` varchar(255),
	`post_office` varchar(255),
	`management_type` enum('Govt.','Non-Govt','Public','Private'),
	`mobile` varchar(15),
	`email` varchar(255),
	`remark` text,
	CONSTRAINT `hr_institutes_id_hr_institutes` PRIMARY KEY(`id_hr_institutes`)
);
--> statement-breakpoint
CREATE TABLE `hr_job_description` (
	`id_job_description` int AUTO_INCREMENT NOT NULL,
	`job_no` int NOT NULL,
	`create_date` date NOT NULL,
	`job_title` int NOT NULL,
	`reporting_to` varchar(50) NOT NULL,
	`grade` varchar(100) NOT NULL,
	`location` int NOT NULL,
	`quality_parameters` varchar(256),
	`dimensions` varchar(256),
	`internal_customers` varchar(256),
	`external_customers` varchar(256),
	`qualifications` varchar(256),
	`tech_skills` varchar(256),
	`soft_skills` varchar(256),
	`special_requirements` varchar(256),
	`organization_hierarchy` varchar(256),
	`access_control` varchar(256),
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_job_description_id_job_description` PRIMARY KEY(`id_job_description`)
);
--> statement-breakpoint
CREATE TABLE `hr_job_performance_area` (
	`id_job_performance_area` int AUTO_INCREMENT NOT NULL,
	`key_result_area` varchar(256) NOT NULL,
	`measure_of_success` varchar(256) NOT NULL,
	`id_job_description` int NOT NULL,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_job_performance_area_id_job_performance_area` PRIMARY KEY(`id_job_performance_area`)
);
--> statement-breakpoint
CREATE TABLE `hr_late_present` (
	`late_present_id` int AUTO_INCREMENT NOT NULL,
	`salary_variable` enum('basic','gross'),
	`lp_percentage` float,
	`number_penalty_days` int,
	`publication_status` enum('activated','deactivated'),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int,
	`maximum_deduction_amount` decimal(12,2) NOT NULL,
	CONSTRAINT `hr_late_present_late_present_id` PRIMARY KEY(`late_present_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_application` (
	`id_leave_application` int AUTO_INCREMENT NOT NULL,
	`id_employee` int NOT NULL,
	`id_project` int NOT NULL,
	`id_department` int,
	`id_leave_policy` int,
	`id_leave_type` int NOT NULL,
	`date_from` date NOT NULL,
	`date_to` date NOT NULL,
	`no_of_leave_day` float NOT NULL,
	`weekend_holiday_inside` int,
	`address_during_leave` text,
	`phone_during_leave` varchar(20),
	`reason` varchar(25),
	`reason_details` text,
	`file` varchar(250),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int,
	`id_por_leave` int,
	`publication_status` enum('activated','deactivated','denied') NOT NULL DEFAULT 'activated',
	`delete_reason` varchar(256),
	`original_name` varchar(100),
	`id_fiscal_year` int,
	`replacement_person` int,
	CONSTRAINT `hr_leave_application_id_leave_application` PRIMARY KEY(`id_leave_application`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_application_file_import` (
	`id_hr_leave_application_file_import` int AUTO_INCREMENT NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`id_users` int NOT NULL,
	`id_projects` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` text,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	CONSTRAINT `hr_leave_application_file_import_id_hr_leave_application_file_import` PRIMARY KEY(`id_hr_leave_application_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_balance` (
	`id_hr_leave_balance` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_fiscal_year` int,
	`id_leave_policy` int NOT NULL,
	`initial_balance` int NOT NULL,
	`current_leave_balance` decimal(5,2) NOT NULL,
	`leave_per_month` decimal(5,2),
	`year` int NOT NULL,
	`month` int NOT NULL,
	`leave_enjoyed` int DEFAULT 0,
	`balance_added` decimal(5,2) DEFAULT '0.00',
	`remark` varchar(256),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`points_per_leave` decimal(5,2),
	`calculated_leave_balance` decimal(5,2),
	CONSTRAINT `hr_leave_balance_id_hr_leave_balance` PRIMARY KEY(`id_hr_leave_balance`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_balance_details` (
	`id_hr_leave_balance_details` int AUTO_INCREMENT NOT NULL,
	`id_hr_leave_balance` int NOT NULL,
	`id_leave_app_or_payslip_or_file_import` int NOT NULL,
	`status` enum('leave_enjoyed','payslip_approved','file_imported','leave_calculated','org_setup_input','org_setup_input_excel','org_setup_update','org_setup_update_excel') NOT NULL,
	`balance` decimal(5,2) NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int,
	CONSTRAINT `hr_leave_balance_details_id_hr_leave_balance_details` PRIMARY KEY(`id_hr_leave_balance_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_balance_file_import` (
	`id_leave_balance_file_import` int AUTO_INCREMENT NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`new_data` int NOT NULL,
	`skip_data` int NOT NULL,
	`not_found_data` int NOT NULL,
	`id_user` int NOT NULL,
	`not_found_ids` text,
	`import_date` date NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`original_name` varchar(100),
	`type` enum('Regular','Monthly') NOT NULL DEFAULT 'Regular',
	CONSTRAINT `hr_leave_balance_file_import_id_leave_balance_file_import` PRIMARY KEY(`id_leave_balance_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_balance_freeze` (
	`id_hr_leave_balance_freeze` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`month` int,
	`year` int,
	`id_fiscal_year` int,
	`id_leave_policy` int,
	`freeze_balance` int,
	`remarks` varchar(256),
	CONSTRAINT `hr_leave_balance_freeze_id_hr_leave_balance_freeze` PRIMARY KEY(`id_hr_leave_balance_freeze`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_calculation` (
	`id_leave_calculation` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`year` int,
	`id_fiscal_year` int,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`date_updated` timestamp,
	CONSTRAINT `hr_leave_calculation_id_leave_calculation` PRIMARY KEY(`id_leave_calculation`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_calculation_details` (
	`id_leave_calculation_details` int AUTO_INCREMENT NOT NULL,
	`id_leave_calculation` int NOT NULL,
	`employee_id` int NOT NULL,
	`id_leave_policy` int NOT NULL,
	`carry_forward_days` int NOT NULL,
	`leave_encashed_days` int NOT NULL DEFAULT 0,
	`eligible_leave_encashment_days` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_leave_calculation_details_id_leave_calculation_details` PRIMARY KEY(`id_leave_calculation_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_details` (
	`id_hr_leave_details` int AUTO_INCREMENT NOT NULL,
	`id_leave_application` int NOT NULL,
	`leave_category` enum('with_pay','without_pay') NOT NULL,
	`approved_days` float NOT NULL,
	`leave_date` date NOT NULL,
	`deduction_amount` double(12,2) NOT NULL DEFAULT 0,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_por_leave_details` int,
	CONSTRAINT `hr_leave_details_id_hr_leave_details` PRIMARY KEY(`id_hr_leave_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_details_history` (
	`id_leave_details_history` int AUTO_INCREMENT NOT NULL,
	`id_hr_leave_details` int NOT NULL,
	`id_leave_application` int NOT NULL,
	`leave_category` enum('with_pay','without_pay') NOT NULL,
	`approved_days` float NOT NULL,
	`leave_date` date NOT NULL,
	`deduction_amount` decimal(12,2),
	`create_date` timestamp,
	`update_date` timestamp,
	`id_por_leave_details` int,
	CONSTRAINT `hr_leave_details_history_id_leave_details_history` PRIMARY KEY(`id_leave_details_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_encashment` (
	`id_hr_leave_encashment` int AUTO_INCREMENT NOT NULL,
	`id_projects` int NOT NULL,
	`encashment_year` int NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_hr_leave_type` int NOT NULL,
	`remark` text,
	`id_voucher` int,
	CONSTRAINT `hr_leave_encashment_id_hr_leave_encashment` PRIMARY KEY(`id_hr_leave_encashment`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_encashment_details` (
	`id_hr_leave_encashment_details` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_hr_leave_encashment` int NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`total_leave_days` int NOT NULL,
	`total_leave_enjoyed` float NOT NULL,
	`total_leave_remaining` float NOT NULL,
	`amount_per_day` decimal(12,2) NOT NULL,
	`pay_structure_setup_records_id` int NOT NULL,
	`account_paid` decimal(12,2) NOT NULL DEFAULT '0.00',
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	CONSTRAINT `hr_leave_encashment_details_id_hr_leave_encashment_details` PRIMARY KEY(`id_hr_leave_encashment_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_encashment_history` (
	`id_leave_encashment_history` int AUTO_INCREMENT NOT NULL,
	`id_employee` int,
	`max_allowable_leave` int,
	`remaining_leave` int,
	`salary` double,
	`per_day_amount` double,
	`times` double,
	`need_to_pay` double,
	`date_from` varchar(20),
	`date_to` varchar(20),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_user` int,
	`id_leave_type` int,
	`id_project` int,
	`remark` varchar(100),
	`payment_mode` enum('With payslip','Without payslip'),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_leave_encashment_history_id_leave_encashment_history` PRIMARY KEY(`id_leave_encashment_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_encashment_setup` (
	`id_leave_encashment_setup` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_leave_type` int NOT NULL,
	`basic_gross` enum('Basic','Gross') NOT NULL,
	`times` double NOT NULL,
	`id_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`remark` text,
	`publication_status` enum('Active','Deactive') NOT NULL DEFAULT 'Active',
	`encashment_setup_year` int NOT NULL,
	CONSTRAINT `hr_leave_encashment_setup_id_leave_encashment_setup` PRIMARY KEY(`id_leave_encashment_setup`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_history` (
	`id_leave_history` int AUTO_INCREMENT NOT NULL,
	`id_leave_application` int NOT NULL,
	`old_data` varchar(256) NOT NULL,
	`new_data` varchar(256) NOT NULL,
	`action` enum('delete','edit') NOT NULL DEFAULT 'edit',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_leave_history_id_leave_history` PRIMARY KEY(`id_leave_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_policy` (
	`id_leave_policy` int AUTO_INCREMENT NOT NULL,
	`id_leave_policy_template` int NOT NULL,
	`id_leave_type` int NOT NULL,
	`max_allow_day` int NOT NULL,
	`max_allow_negative_day` int DEFAULT 0,
	`effective_date` date,
	`remark` text,
	`id_user` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`carry_forward_up_to` int DEFAULT 0,
	`leave_encashment_days` int DEFAULT 0,
	`additional_leave_type` int,
	`max_limit` int DEFAULT 0,
	`monthly_balance_calculation` varchar(10) NOT NULL,
	`carry_forward_limit` int NOT NULL,
	`is_bridge_exist` enum('yes','no') NOT NULL DEFAULT 'no',
	CONSTRAINT `hr_leave_policy_id_leave_policy` PRIMARY KEY(`id_leave_policy`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_policy_template` (
	`id_hr_leave_policy_template` int AUTO_INCREMENT NOT NULL,
	`template_name` varchar(100) NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`has_monthly_leave` enum('yes','no'),
	`file_name` text,
	`original_name` text,
	CONSTRAINT `hr_leave_policy_template_id_hr_leave_policy_template` PRIMARY KEY(`id_hr_leave_policy_template`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_policy_update_history` (
	`id_hr_leave_policy_update` int AUTO_INCREMENT NOT NULL,
	`id_leave_policy` int,
	`new_policy_data` text,
	`old_policy_data` text,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_leave_policy_update_history_id_hr_leave_policy_update` PRIMARY KEY(`id_hr_leave_policy_update`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_type` (
	`id_leave_type` int AUTO_INCREMENT NOT NULL,
	`leave_type_name` varchar(200) NOT NULL,
	`leave_type_category` enum('Regular','Special','Religious') NOT NULL,
	`remark` text NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`religion` varchar(50),
	`max_allowed_days` int,
	`id_users` int NOT NULL,
	`deleted_by` int,
	CONSTRAINT `hr_leave_type_id_leave_type` PRIMARY KEY(`id_leave_type`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_year` (
	`id_leave_year` int AUTO_INCREMENT NOT NULL,
	`start_month` int NOT NULL,
	`end_month` int NOT NULL,
	`leave_tenure` int NOT NULL DEFAULT 12,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_leave_year_id_leave_year` PRIMARY KEY(`id_leave_year`)
);
--> statement-breakpoint
CREATE TABLE `hr_leave_year_history` (
	`id_hr_leave_year_history` int AUTO_INCREMENT NOT NULL,
	`id_hr_leave_year` int NOT NULL DEFAULT 1,
	`previous_data` varchar(256) NOT NULL,
	`new_data` varchar(256) NOT NULL,
	`previous_user` int NOT NULL,
	`id_user` int NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_leave_year_history_id_hr_leave_year_history` PRIMARY KEY(`id_hr_leave_year_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_leaving_dates` (
	`id_leaving_days` int AUTO_INCREMENT NOT NULL,
	`id_leave_application` int,
	`id_employee` int,
	`id_leave_type` int,
	`leaving_date` date,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_leaving_dates_id_leaving_days` PRIMARY KEY(`id_leaving_days`)
);
--> statement-breakpoint
CREATE TABLE `hr_log` (
	`id_hr_log` int AUTO_INCREMENT NOT NULL,
	`url` varchar(200),
	`get_data` text,
	`post_data` text,
	`header_data` text,
	`id_users` int,
	`ip_address` varchar(45),
	`user_agent` varchar(200),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`performance_time` float,
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_log_id_hr_log` PRIMARY KEY(`id_hr_log`)
);
--> statement-breakpoint
CREATE TABLE `hr_man_power_budget` (
	`id_hr_man_power_budget` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`id_projects` int NOT NULL,
	`employee_id` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`month_year` varchar(50) NOT NULL,
	`year_month` date NOT NULL,
	`earning_heads_id` int NOT NULL,
	`proposed_amount` decimal(12,2) NOT NULL,
	`actual_amount` decimal(12,2) NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_hr_man_power_budget_file_import` int NOT NULL,
	CONSTRAINT `hr_man_power_budget_id_hr_man_power_budget` PRIMARY KEY(`id_hr_man_power_budget`)
);
--> statement-breakpoint
CREATE TABLE `hr_man_power_budget_file_import` (
	`id_hr_man_power_budget_file_import` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`id_projects` int NOT NULL,
	`file_name` varchar(150) NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`month_year` varchar(50) NOT NULL,
	`year_month` date NOT NULL,
	`earning_heads_id` int NOT NULL,
	`deleted_by` int,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`original_name` varchar(100),
	CONSTRAINT `hr_man_power_budget_file_import_id_hr_man_power_budget_file_import` PRIMARY KEY(`id_hr_man_power_budget_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_manual_overtime` (
	`overtime_entry_id` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`employee_id` int NOT NULL,
	`manual_ot_start` float,
	`manual_ot_end` float,
	`ot_amount` decimal(12,2) NOT NULL,
	`ot_date` date NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`ot_hour_worked` decimal(12,2) NOT NULL,
	`file` varchar(100),
	`id_users` int NOT NULL,
	`budget_connection` enum('yes','no') DEFAULT 'no',
	`id_hr_manual_overtime_entry` int NOT NULL,
	`ot_rate` decimal(12,2) NOT NULL,
	`employee_salary_info_id` int NOT NULL,
	`id_hr_overtime_file_import` int,
	`original_name` varchar(100),
	CONSTRAINT `hr_manual_overtime_overtime_entry_id` PRIMARY KEY(`overtime_entry_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_manual_overtime_entry` (
	`id_hr_manual_overtime_entry` int AUTO_INCREMENT NOT NULL,
	`payment_status` enum('Partial','Completed','Pending') NOT NULL DEFAULT 'Pending',
	`id_voucher` int,
	`account_paid` decimal(12,2) NOT NULL DEFAULT '0.00',
	`due` decimal(12,2) NOT NULL,
	`total_ot_amount` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`employee_id` int NOT NULL,
	`id_project` int NOT NULL,
	`entry_type` enum('daily','monthly') NOT NULL DEFAULT 'daily',
	`payment_type` varchar(30) NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_manual_overtime_entry_id_hr_manual_overtime_entry` PRIMARY KEY(`id_hr_manual_overtime_entry`)
);
--> statement-breakpoint
CREATE TABLE `hr_manual_overtime_history` (
	`id_manual_overtime_history` int AUTO_INCREMENT NOT NULL,
	`overtime_entry_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`changes_by` int NOT NULL,
	`previous_id_user` int NOT NULL,
	`history_reason` enum('edit','delete') NOT NULL,
	`employee_id` int NOT NULL,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_manual_overtime_history_id_manual_overtime_history` PRIMARY KEY(`id_manual_overtime_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_menu` (
	`id_hr_menu` int AUTO_INCREMENT NOT NULL,
	`menu` varchar(30),
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`id_user` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_menu_id_hr_menu` PRIMARY KEY(`id_hr_menu`)
);
--> statement-breakpoint
CREATE TABLE `hr_menu_submenu` (
	`id_menu_submenu` int AUTO_INCREMENT NOT NULL,
	`submenu` varchar(100),
	`submenu_url` varchar(50) NOT NULL,
	`id_hr_menu` int NOT NULL,
	`controller_method` varchar(300),
	`status` enum('active','deactive') DEFAULT 'active',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`serial_no` int,
	CONSTRAINT `hr_menu_submenu_id_menu_submenu` PRIMARY KEY(`id_menu_submenu`)
);
--> statement-breakpoint
CREATE TABLE `hr_mobile_banking_details` (
	`id_hr_mobile_banking_details` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`mobile_banking_type` varchar(50) NOT NULL,
	`mobile_banking_details` varchar(500),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_mobile_banking_details_id_hr_mobile_banking_details` PRIMARY KEY(`id_hr_mobile_banking_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_monthly_leave_balance` (
	`id_hr_monthly_leave_balance` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`id_fiscal_year` int,
	`carry_forward_balance` int NOT NULL DEFAULT 0,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`year_month` date NOT NULL,
	`remark` text,
	`id_leave_balance_file_import` int,
	`eligible_carry_forward_balance` int NOT NULL,
	CONSTRAINT `hr_monthly_leave_balance_id_hr_monthly_leave_balance` PRIMARY KEY(`id_hr_monthly_leave_balance`)
);
--> statement-breakpoint
CREATE TABLE `hr_monthly_leave_file_uploads` (
	`id_hr_monthly_leave_file_upload` int AUTO_INCREMENT NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100) NOT NULL,
	`id_business_unit` int NOT NULL,
	`total_data` int,
	`insert_data` int NOT NULL,
	`not_found_data` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`type` enum('Monthly','Compensatory') NOT NULL,
	CONSTRAINT `hr_monthly_leave_file_uploads_id_hr_monthly_leave_file_upload` PRIMARY KEY(`id_hr_monthly_leave_file_upload`)
);
--> statement-breakpoint
CREATE TABLE `hr_monthly_leave_settings` (
	`id_monthly_leave_setting` int AUTO_INCREMENT NOT NULL,
	`id_projects` int NOT NULL,
	`attendance_required` enum('yes','no') NOT NULL DEFAULT 'no',
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_monthly_leave_settings_id_monthly_leave_setting` PRIMARY KEY(`id_monthly_leave_setting`)
);
--> statement-breakpoint
CREATE TABLE `hr_organization_setup` (
	`organization_setup_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`reporting_supervisor_id` int,
	`dept_head_id` int,
	`company_setup_id` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`employee_desig_id` int NOT NULL,
	`id_department` int NOT NULL,
	`id_grade` int,
	`joining_date` date NOT NULL,
	`effective_date` date NOT NULL,
	`actual_joining_date` date,
	`work_station_id` int NOT NULL,
	`id_employee_nature_type` int NOT NULL,
	`shift_id` int,
	`line_supervisor_id` int,
	`line_supervisor_desig_id` int,
	`reporting_supervisor_desig_id` int,
	`off_number` varchar(50),
	`off_email` varchar(80),
	`bank_id` int,
	`branch_id` int,
	`bank_routing_number` varchar(30),
	`equivalent_designation_id` int,
	`off_acc_num` varchar(80) DEFAULT 'NULL',
	`working_status` enum('Working','Resigned','Retired','Terminated','Dismissal','JV','LWI','Discharged','Salary Hold','Long Leave') NOT NULL,
	`management_type` enum('Non Management','Management','MAX Worker') NOT NULL,
	`skill_status` varchar(100),
	`skill_confirmed_by` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`id_hr_employee_cost_center_setup` int,
	`portal_access` enum('Yes','No') NOT NULL DEFAULT 'No',
	`resign_date` date,
	`resign_submission_date` date,
	`mobile_banking_number` varchar(45),
	`time_period` int,
	`mobile_banking_type_id` int,
	`id_hr_organization_setup_file_import` int,
	`id_hr_organization_setup_file_import_update` int,
	`salary_hold_reason` text,
	`overhead_status` enum('Yes','No'),
	`separation_payable_days` double(12,2),
	`remark` text,
	`manual_attendance` enum('Yes','No') NOT NULL DEFAULT 'No',
	`id_hr_leave_policy_template` int NOT NULL,
	`id_sub_function` int,
	`id_hr_profession_type` int NOT NULL,
	`work_scope` text,
	`mobile_balance_limit` double(12,2) NOT NULL,
	`is_roaster_shifting` enum('Yes','No') NOT NULL DEFAULT 'No',
	`late_deduction_type` enum('General','Special','Eight Hours') NOT NULL DEFAULT 'General',
	`id_bonus_cost_center_setup` int,
	`is_continue_service` enum('Yes','No') DEFAULT 'No',
	`works_for_bu_id` int,
	`por_pay_strc_show` enum('Yes','No') NOT NULL DEFAULT 'No',
	`manual_tax_calculation` enum('Yes','No') NOT NULL DEFAULT 'No',
	`hr_absent_template_id` int NOT NULL,
	`tax_start_fiscal_year_id` int,
	`highest_education_level_id` int,
	`education_remark` text,
	CONSTRAINT `hr_organization_setup_organization_setup_id` PRIMARY KEY(`organization_setup_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_organization_setup_change_records` (
	`id_hr_organization_setup_change_records` int AUTO_INCREMENT NOT NULL,
	`organization_setup_id` int NOT NULL,
	`employee_id` int NOT NULL,
	`column_name` enum('working_status','is_continue_service') NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`previous_id_users` int NOT NULL,
	`id_users` int NOT NULL,
	`remark` text,
	CONSTRAINT `hr_organization_setup_change_records_id_hr_organization_setup_change_records` PRIMARY KEY(`id_hr_organization_setup_change_records`)
);
--> statement-breakpoint
CREATE TABLE `hr_organization_setup_file_import` (
	`id_hr_organization_setup_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`id_projects` int NOT NULL,
	`data_type` enum('Insert','Update','Cost Center Salary','Cost Center Bonus','Cost Center Salary & Bonus') NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`invalid_ids` text,
	`required_ids` text,
	`invalid_management_type_ids` text,
	`invalid_working_status_ids` text,
	`invalid_nature_ids` text,
	`invalid_joinning_ids` text,
	`invalid_effective_ids` text,
	`invalid_joinning_effective_ids` text,
	`invalid_mobile_no_ids` text,
	`invalid_branch_ids` text,
	`invalid_bank_ids` text,
	`invalid_mobile_banking_ids` text,
	`invalid_banking_ids` text,
	`already_setup_ids` text,
	`already_use_mobile_banking_ids` text,
	`already_use_email_ids` text,
	`already_use_bank_acc_number_ids` text,
	`deleted_by` int,
	`original_name` varchar(100),
	CONSTRAINT `hr_organization_setup_file_import_id_hr_organization_setup_file_import` PRIMARY KEY(`id_hr_organization_setup_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_organization_setup_history` (
	`organization_setup_history_id` int AUTO_INCREMENT NOT NULL,
	`organization_setup_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`employee_id` int NOT NULL,
	`employee_custom_id` int,
	`id_hr_organization_setup_file_import` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`remark` text,
	CONSTRAINT `hr_organization_setup_history_organization_setup_history_id` PRIMARY KEY(`organization_setup_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_outstation_file_import` (
	`id_hr_outstation_file_import` int AUTO_INCREMENT NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100) NOT NULL,
	`valid_entry` int NOT NULL,
	`invalid_entry` int DEFAULT 0,
	`invalid_entries` text,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_business_unit` int NOT NULL,
	`site_visits` int NOT NULL DEFAULT 0,
	`work_from_homes` int NOT NULL DEFAULT 0,
	`official_visits` int NOT NULL DEFAULT 0,
	CONSTRAINT `hr_outstation_file_import_id_hr_outstation_file_import` PRIMARY KEY(`id_hr_outstation_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_outstation_history` (
	`id_hr_outstation_history` int AUTO_INCREMENT NOT NULL,
	`id_attendance` int NOT NULL,
	`id_user` int NOT NULL,
	`old_data` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_outstation_history_id_hr_outstation_history` PRIMARY KEY(`id_hr_outstation_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_over_stay_setup_file_import` (
	`id_hr_over_stay_setup_file_import` int AUTO_INCREMENT NOT NULL,
	`id_projects` int NOT NULL,
	`id_users` int NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100),
	CONSTRAINT `hr_over_stay_setup_file_import_id_hr_over_stay_setup_file_import` PRIMARY KEY(`id_hr_over_stay_setup_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_overstay_entry_monthly` (
	`id_overstay_entry_monthly` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`overstay_days` int NOT NULL,
	`overstay_amount` decimal(12,2) NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`amount_per_day` decimal(12,2) NOT NULL,
	`employee_salary_info_id` int NOT NULL,
	`entry_type` enum('monthly_entry','excel_entry') NOT NULL DEFAULT 'monthly_entry',
	`id_voucher` int,
	`account_paid` decimal(12,2) NOT NULL DEFAULT '0.00',
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`id_hr_overstay_file_import` int,
	CONSTRAINT `hr_overstay_entry_monthly_id_overstay_entry_monthly` PRIMARY KEY(`id_overstay_entry_monthly`)
);
--> statement-breakpoint
CREATE TABLE `hr_overstay_entry_monthly_history` (
	`id_overstay_entry_monthly_history` int AUTO_INCREMENT NOT NULL,
	`id_overstay_entry_monthly` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`changes_by` int NOT NULL,
	`previous_id_user` int NOT NULL,
	`history_reason` enum('edit','delete') NOT NULL,
	`employee_id` int NOT NULL,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_overstay_entry_monthly_history_id_overstay_entry_monthly_history` PRIMARY KEY(`id_overstay_entry_monthly_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_overstay_file_import` (
	`id_hr_overstay_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`total_insert` int NOT NULL DEFAULT 0,
	`total_duplicate` int NOT NULL DEFAULT 0,
	`total_no_employee` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`total_no_setup` int NOT NULL DEFAULT 0,
	`duplicate_ids` text,
	`no_setup_ids` text,
	`no_employee_office_id` text,
	`deleted_by` int,
	`invalid_days_ids` text,
	`total_invalid_days_id` int NOT NULL DEFAULT 0,
	`original_name` varchar(100),
	CONSTRAINT `hr_overstay_file_import_id_hr_overstay_file_import` PRIMARY KEY(`id_hr_overstay_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_overstay_setup` (
	`overstay_setup_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_project` int NOT NULL,
	`overstay_amount` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`overstay_template_id` int NOT NULL,
	`id_hr_over_stay_setup_file_import` int,
	CONSTRAINT `hr_overstay_setup_overstay_setup_id` PRIMARY KEY(`overstay_setup_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_overstay_setup_history` (
	`id_overstay_setup_history` int AUTO_INCREMENT NOT NULL,
	`overstay_setup_id` int NOT NULL,
	`overstay_template_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`changes_by` int NOT NULL,
	`previous_id_user` int NOT NULL,
	`history_reason` enum('edit','delete') NOT NULL,
	`employee_id` int NOT NULL,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_overstay_setup_history_id_overstay_setup_history` PRIMARY KEY(`id_overstay_setup_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_overstay_template` (
	`overstay_template_id` int AUTO_INCREMENT NOT NULL,
	`overstay_template_name` varchar(200) NOT NULL,
	`multiply_variable` double,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int,
	`overstay_type` enum('Fixed','Variable') NOT NULL,
	`flat_amount` decimal(12,2),
	`overstay_category` enum('pay_structure','different') NOT NULL,
	`gross_percentage` decimal(5,2),
	`salary_variable` enum('gross','basic'),
	`monthly_day` int,
	CONSTRAINT `hr_overstay_template_overstay_template_id` PRIMARY KEY(`overstay_template_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_overtime` (
	`overtime_id` int AUTO_INCREMENT NOT NULL,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`employee_id` int NOT NULL,
	`overtime_template_id` int NOT NULL,
	`id_users` int NOT NULL,
	`id_project` int NOT NULL,
	`hourly_ot_rate` decimal(12,2) NOT NULL,
	`id_hr_overtime_setup_file_import` int,
	CONSTRAINT `hr_overtime_overtime_id` PRIMARY KEY(`overtime_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_overtime_file_import` (
	`id_hr_overtime_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`total_insert` int NOT NULL DEFAULT 0,
	`total_duplicate` int NOT NULL DEFAULT 0,
	`total_no_employee` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`total_no_setup` int NOT NULL DEFAULT 0,
	`duplicate_ids` text,
	`no_setup_ids` text,
	`no_employee_office_id` text,
	`deleted_by` int,
	`invalid_days_ids` text,
	`total_invalid_days_id` int NOT NULL DEFAULT 0,
	`original_name` varchar(100),
	CONSTRAINT `hr_overtime_file_import_id_hr_overtime_file_import` PRIMARY KEY(`id_hr_overtime_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_overtime_history` (
	`id_overtime_history` int AUTO_INCREMENT NOT NULL,
	`overtime_id` int NOT NULL,
	`overtime_template_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`changes_by` int NOT NULL,
	`previous_id_user` int NOT NULL,
	`history_reason` enum('edit','delete') NOT NULL,
	`employee_id` int NOT NULL,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_overtime_history_id_overtime_history` PRIMARY KEY(`id_overtime_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_overtime_setup_file_import` (
	`id_hr_overtime_setup_file_import` int AUTO_INCREMENT NOT NULL,
	`id_projects` int NOT NULL,
	`id_users` int NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100),
	CONSTRAINT `hr_overtime_setup_file_import_id_hr_overtime_setup_file_import` PRIMARY KEY(`id_hr_overtime_setup_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_overtime_template` (
	`overtime_template_id` int AUTO_INCREMENT NOT NULL,
	`overtime_template_name` varchar(200) NOT NULL,
	`working_hour_month` int,
	`multiply_variable` double,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int,
	`overtime_type` enum('Fixed','Variable') NOT NULL,
	`flat_amount` decimal(12,2),
	`overtime_category` enum('pay_structure','different') NOT NULL,
	`gross_percentage` decimal(12,2),
	`salary_variable` enum('gross','basic'),
	CONSTRAINT `hr_overtime_template_overtime_template_id` PRIMARY KEY(`overtime_template_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_page_permission` (
	`id_page_permission` int AUTO_INCREMENT NOT NULL,
	`id_menu_submenu` int NOT NULL,
	`id_user` int NOT NULL,
	`id_project` int,
	`id_user_permitted_by` int NOT NULL,
	`status` enum('active','deactive'),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_page_permission_id_page_permission` PRIMARY KEY(`id_page_permission`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_accounts_payment` (
	`id_hr_pay_slip_accounts_payment` int AUTO_INCREMENT NOT NULL,
	`id_pay_slip_generation` int NOT NULL,
	`id_voucher` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_update` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_slip_accounts_payment_id_hr_pay_slip_accounts_payment` PRIMARY KEY(`id_hr_pay_slip_accounts_payment`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_accounts_payment_details` (
	`id_hr_pay_slip_accounts_payment_details` int AUTO_INCREMENT NOT NULL,
	`id_hr_pay_slip_accounts_payment` int NOT NULL,
	`id_cc_business_unit` int NOT NULL,
	`id_voucher` int NOT NULL,
	`amount` decimal(8,2) NOT NULL,
	`payment_date` date NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_slip_accounts_payment_details_id_hr_pay_slip_accounts_payment_details` PRIMARY KEY(`id_hr_pay_slip_accounts_payment_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_details_individual_history` (
	`individual_pay_slip_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`employee_id` int NOT NULL,
	`previous_data` mediumtext NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_slip_details_individual_history_individual_pay_slip_history_id` PRIMARY KEY(`individual_pay_slip_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_employee_info` (
	`id_pay_slip_employee_info` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`employee_desig_id` int NOT NULL,
	`id_department` int,
	`id_grade` int,
	`effective_date` date NOT NULL,
	`work_station_id` int NOT NULL,
	`id_employee_nature_type` int NOT NULL,
	`bank_id` int,
	`branch_id` int,
	`equivalent_designation_id` int,
	`off_acc_num` varchar(80),
	`bank_routing_number` varchar(30),
	`working_status` enum('Working','Resigned','Retired','Terminated','Dismissal','JV','LWI','Discharged','Salary Hold','Long Leave') NOT NULL,
	`skill_status` varchar(100),
	`skill_confirmed_by` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`mobile_banking_number` varchar(45),
	`id_pay_slip_generation` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`company_setup_id` int,
	`mobile_banking_type_id` int,
	`overhead_status` enum('Yes','No'),
	`id_hr_employee_cost_center_setup` int,
	`joining_date` date NOT NULL,
	`management_type` enum('Non Management','Management','MAX Worker') NOT NULL,
	`manual_attendance` enum('Yes','No') NOT NULL,
	`off_number` varchar(50),
	`off_email` varchar(80),
	`id_hr_leave_policy_template` int NOT NULL,
	`id_sub_function` int,
	`id_hr_profession_type` int NOT NULL,
	`shift_id` int,
	`time_period` int,
	`reporting_supervisor_id` int,
	`line_supervisor_id` int,
	`dept_head_id` int,
	`work_scope` text,
	`mobile_balance_limit` double(12,2),
	`is_roaster_shifting` enum('Yes','No') NOT NULL,
	`late_deduction_type` enum('General','Special','Eight Hours') NOT NULL,
	`id_bonus_cost_center_setup` int,
	`is_continue_service` enum('Yes','No'),
	`works_for_bu_id` int,
	`actual_joining_date` date,
	`por_pay_strc_show` enum('Yes','No'),
	`manual_tax_calculation` enum('Yes','No') NOT NULL,
	`hr_absent_template_id` int,
	CONSTRAINT `hr_pay_slip_employee_info_id_pay_slip_employee_info` PRIMARY KEY(`id_pay_slip_employee_info`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_generation` (
	`pay_slip_generation_id` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`description` text NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`year_month` date NOT NULL,
	`budget_connection` enum('yes','no') NOT NULL DEFAULT 'no',
	`id_voucher` int,
	`approval_status` enum('Pending','Approved') NOT NULL DEFAULT 'Pending',
	`id_calendar_setup` int NOT NULL,
	`approver_id` int,
	`accountant_id` int,
	`total_days` int NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`disbursement_date` date,
	CONSTRAINT `hr_pay_slip_generation_pay_slip_generation_id` PRIMARY KEY(`pay_slip_generation_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_generation_details` (
	`generation_details_id` int AUTO_INCREMENT NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_heads` int,
	`employee_id` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`head_name` varchar(150) NOT NULL,
	`head_type` varchar(150) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`year_month` date NOT NULL,
	CONSTRAINT `hr_pay_slip_generation_details_generation_details_id` PRIMARY KEY(`generation_details_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_generation_details_history` (
	`generation_details_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_slip_generation_details_history_generation_details_history_id` PRIMARY KEY(`generation_details_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_generation_history` (
	`pay_slip_generation_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('approve','delete') NOT NULL DEFAULT 'delete',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updaet_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_pay_slip_generation_history_pay_slip_generation_history_id` PRIMARY KEY(`pay_slip_generation_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_generation_info` (
	`id_pay_slip_generation_info` int AUTO_INCREMENT NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`employee_id` int NOT NULL,
	`total_earning` decimal(12,2) NOT NULL,
	`total_deduction` decimal(12,2) NOT NULL,
	`net_payable` decimal(12,2) NOT NULL,
	`paid_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`total_basic` decimal(12,2) NOT NULL DEFAULT '0.00',
	`total_gross` decimal(12,2) NOT NULL DEFAULT '0.00',
	`total_ctc` decimal(12,2) NOT NULL DEFAULT '0.00',
	`tax_amount` decimal(12,2) DEFAULT '0.00',
	`others_deduction` decimal(12,2) DEFAULT '0.00',
	CONSTRAINT `hr_pay_slip_generation_info_id_pay_slip_generation_info` PRIMARY KEY(`id_pay_slip_generation_info`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_generation_split_cost_center` (
	`generation_split_cost_center_id` int AUTO_INCREMENT NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`cost_center_business_unit_id` int NOT NULL,
	`id_cost_center` int NOT NULL,
	`employee_id` int NOT NULL,
	`percentage` float NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`head_type` varchar(150) NOT NULL,
	`id_heads` int NOT NULL,
	CONSTRAINT `hr_pay_slip_generation_split_cost_center_generation_split_cost_center_id` PRIMARY KEY(`generation_split_cost_center_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_slip_generation_vouchers` (
	`id_pay_slip_generation_voucher` int AUTO_INCREMENT NOT NULL,
	`id_pay_slip_generation` int NOT NULL,
	`id_voucher` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`amount` decimal(12,2) NOT NULL,
	`id_cost_center_business_unit` int NOT NULL,
	CONSTRAINT `hr_pay_slip_generation_vouchers_id_pay_slip_generation_voucher` PRIMARY KEY(`id_pay_slip_generation_voucher`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_amount_update_history` (
	`id_hr_pay_structure_amount_update_history` int AUTO_INCREMENT NOT NULL,
	`pay_structure_setup_id` int NOT NULL,
	`previous_amount` double(12,2) NOT NULL,
	`updated_amount` double(12,2) NOT NULL,
	`changes_by` int NOT NULL,
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_structure_amount_update_history_id_hr_pay_structure_amount_update_history` PRIMARY KEY(`id_hr_pay_structure_amount_update_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_increment_records` (
	`id_hr_pay_structure_increment_record` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_projects` int NOT NULL,
	`updated_pay_structure_setup_records_id` int NOT NULL,
	`prev_pay_structure_setup_records_id` int NOT NULL,
	`updated_basic` decimal(10,2) NOT NULL,
	`updated_medical` decimal(10,2) NOT NULL,
	`updated_house` decimal(10,2) NOT NULL,
	`updated_conveyance` decimal(10,2) NOT NULL,
	`updated_gross_salary` decimal(10,2) NOT NULL,
	`prev_basic` decimal(10,2) NOT NULL,
	`prev_medical` decimal(10,2) NOT NULL,
	`prev_house` decimal(10,2) NOT NULL,
	`prev_conveyance` decimal(10,2) NOT NULL,
	`prev_gross_salary` decimal(10,2) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`remarks` varchar(256),
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hr_pay_structure_increment_records_id_hr_pay_structure_increment_record` PRIMARY KEY(`id_hr_pay_structure_increment_record`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_records_history` (
	`pay_structure_records_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_structure_setup_records_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_structure_records_history_pay_structure_records_history_id` PRIMARY KEY(`pay_structure_records_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_setup` (
	`pay_structure_setup_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`pay_structure_template_details_id` int NOT NULL,
	`heads_amount` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`pay_structure_setup_records_id` int NOT NULL,
	`year_month` date NOT NULL,
	`id_hr_pay_structure_setup_file_import` int,
	CONSTRAINT `hr_pay_structure_setup_pay_structure_setup_id` PRIMARY KEY(`pay_structure_setup_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_setup_file_import` (
	`id_hr_pay_structure_setup_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`id_projects` int NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100),
	`invalid_ids` text,
	`required_ids` text,
	`invalid_fiscal_year_ids` text,
	`invalid_effective_month_ids` text,
	`invalid_basic_salary_mismatch_ids` text,
	`invalid_template_ids` text,
	`invalid_pay_structure_type_setup_ids` text,
	`invalid_remarks_ids` text,
	`invalid_basic_salary_column_ids` text,
	`invalid_earning_column_ids` text,
	`invalid_deduction_column_ids` text,
	`final_error` text,
	CONSTRAINT `hr_pay_structure_setup_file_import_id_hr_pay_structure_setup_file_import` PRIMARY KEY(`id_hr_pay_structure_setup_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_setup_history` (
	`pay_structure_setup_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_structure_setup_records_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_structure_setup_history_pay_structure_setup_history_id` PRIMARY KEY(`pay_structure_setup_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_setup_records` (
	`pay_structure_setup_records_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`pay_structure_template_id` int NOT NULL,
	`basic_salary` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`year_month` date NOT NULL,
	`increment_file_import_id` int,
	`is_increment` enum('yes','no') NOT NULL DEFAULT 'no',
	`increment_type` enum('General','Special'),
	`pay_structure_change_type` enum('Regular Increment','Special Increment','TAX Changes','Other Allowances Changes','New Setup'),
	`remarks` text,
	`id_hr_pay_structure_setup_file_import` int,
	CONSTRAINT `hr_pay_structure_setup_records_pay_structure_setup_records_id` PRIMARY KEY(`pay_structure_setup_records_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_template` (
	`pay_structure_template_id` int AUTO_INCREMENT NOT NULL,
	`pay_structure_template_name` varchar(200) NOT NULL,
	`primary_earnings_head_id` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_pay_structure_template_pay_structure_template_id` PRIMARY KEY(`pay_structure_template_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_template_details` (
	`pay_structure_template_details_id` int AUTO_INCREMENT NOT NULL,
	`pay_structure_template_id` int NOT NULL,
	`head_type` varchar(150) NOT NULL,
	`earning_deduction_heads_id` int NOT NULL,
	`heads_ratio_type` varchar(150) NOT NULL,
	`heads_amount` decimal(12,2),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_pay_structure_template_details_pay_structure_template_details_id` PRIMARY KEY(`pay_structure_template_details_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_template_details_history` (
	`pay_structure_template_details_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_structure_template_id` int NOT NULL,
	`previous_data` mediumtext NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_structure_template_details_history_pay_structure_template_details_history_id` PRIMARY KEY(`pay_structure_template_details_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_template_history` (
	`pay_structure_template_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_structure_template_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_pay_structure_template_history_pay_structure_template_history_id` PRIMARY KEY(`pay_structure_template_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_pay_structure_variable_input` (
	`pay_structure_variable_input_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`month_year` varchar(50) NOT NULL,
	`head_type` varchar(150) NOT NULL,
	`earning_deduction_heads_id` int NOT NULL,
	`heads_amount` decimal(12,2) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`year_month` date NOT NULL,
	`id_business_unit` int NOT NULL,
	`remarks` varchar(150),
	`id_hr_variable_input_file_import` int,
	CONSTRAINT `hr_pay_structure_variable_input_pay_structure_variable_input_id` PRIMARY KEY(`pay_structure_variable_input_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_payment` (
	`id_hr_payment` int AUTO_INCREMENT NOT NULL,
	`reference_type` varchar(50) NOT NULL,
	`payment_type` enum('cash','bank','beftn','rtgs','pay_order') NOT NULL,
	`id_ledger` int NOT NULL,
	`id_voucher` int,
	`id_voucher_bank_book` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`payment_receipt_type` enum('payment','receipt') NOT NULL DEFAULT 'payment',
	`entry_type` enum('single_entry','bulk_entry') NOT NULL DEFAULT 'single_entry',
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` int,
	CONSTRAINT `hr_payment_id_hr_payment` PRIMARY KEY(`id_hr_payment`)
);
--> statement-breakpoint
CREATE TABLE `hr_payment_details` (
	`id_hr_payment_details` int AUTO_INCREMENT NOT NULL,
	`id_hr_payment` int NOT NULL,
	`id_employee` int NOT NULL,
	`payment_amount` decimal(12,2) NOT NULL,
	`id_reference` int NOT NULL,
	`id_reference_details` int,
	CONSTRAINT `hr_payment_details_id_hr_payment_details` PRIMARY KEY(`id_hr_payment_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_portal_access_records` (
	`id_portal_access_records` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`action` varchar(100) NOT NULL,
	CONSTRAINT `hr_portal_access_records_id_portal_access_records` PRIMARY KEY(`id_portal_access_records`)
);
--> statement-breakpoint
CREATE TABLE `hr_prefix` (
	`prefix_id` int AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`prefix_name` varchar(50) NOT NULL,
	`publication_status` enum('activated','deactivated'),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int,
	CONSTRAINT `hr_prefix_prefix_id` PRIMARY KEY(`prefix_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_present_company` (
	`id_present_company` int AUTO_INCREMENT NOT NULL,
	`id_employee` int NOT NULL,
	`id_employee_custom` varchar(50),
	`id_company` int NOT NULL,
	`id_department` int NOT NULL,
	`last_working_date` date,
	`id_reporting_person` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_grade` int NOT NULL,
	`id_designation` int NOT NULL,
	`id_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_present_company_id_present_company` PRIMARY KEY(`id_present_company`)
);
--> statement-breakpoint
CREATE TABLE `hr_present_offday_file_import` (
	`id_hr_present_offday_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`total_insert` int NOT NULL DEFAULT 0,
	`total_duplicate` int NOT NULL DEFAULT 0,
	`total_no_employee` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`total_no_setup` int NOT NULL DEFAULT 0,
	`duplicate_ids` text,
	`no_setup_ids` text,
	`no_employee_office_id` text,
	`deleted_by` int,
	`invalid_days_ids` text,
	`total_invalid_days_id` int NOT NULL DEFAULT 0,
	`original_name` varchar(100),
	CONSTRAINT `hr_present_offday_file_import_id_hr_present_offday_file_import` PRIMARY KEY(`id_hr_present_offday_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_present_offday_master` (
	`present_offday_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_project` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`present_offday_template_id` int NOT NULL,
	`present_off_day_amount` decimal(12,2) DEFAULT '0.00',
	`id_hr_present_offday_setup_file_import` int,
	CONSTRAINT `hr_present_offday_master_present_offday_id` PRIMARY KEY(`present_offday_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_present_offday_master_history` (
	`id_present_offday_master_history` int AUTO_INCREMENT NOT NULL,
	`present_offday_id` int NOT NULL,
	`present_offday_template_id` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`changes_by` int NOT NULL,
	`previous_id_user` int NOT NULL,
	`history_reason` enum('edit','delete') NOT NULL,
	`employee_id` int NOT NULL,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_present_offday_master_history_id_present_offday_master_history` PRIMARY KEY(`id_present_offday_master_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_present_offday_monthly` (
	`id_present_offday_monthly` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`po_days` int NOT NULL,
	`po_amount` decimal(12,2) NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_business_unit` int NOT NULL,
	`amount_per_day` decimal(12,2) NOT NULL,
	`po_date` date NOT NULL,
	`entry_type` enum('single_entry','monthly_entry','excel_entry') NOT NULL DEFAULT 'monthly_entry',
	`employee_salary_info_id` int NOT NULL,
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`id_voucher` int,
	`account_paid` decimal(12,2) NOT NULL DEFAULT '0.00',
	`id_hr_present_offday_file_import` int,
	`id_por_compensatory_leave` int,
	`remarks` text,
	CONSTRAINT `hr_present_offday_monthly_id_present_offday_monthly` PRIMARY KEY(`id_present_offday_monthly`)
);
--> statement-breakpoint
CREATE TABLE `hr_present_offday_monthly_history` (
	`id_present_offday_monthly_history` int AUTO_INCREMENT NOT NULL,
	`id_present_offday_monthly` int NOT NULL,
	`previous_data` longtext NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`changes_by` int NOT NULL,
	`previous_id_user` int NOT NULL,
	`history_reason` enum('edit','delete','entry') NOT NULL,
	`employee_id` int NOT NULL,
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_present_offday_monthly_history_id_present_offday_monthly_history` PRIMARY KEY(`id_present_offday_monthly_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_present_offday_setup_file_import` (
	`id_hr_present_offday_setup_file_import` int AUTO_INCREMENT NOT NULL,
	`id_projects` int NOT NULL,
	`id_users` int NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`deleted_by` int,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100),
	CONSTRAINT `hr_present_offday_setup_file_import_id_hr_present_offday_setup_file_import` PRIMARY KEY(`id_hr_present_offday_setup_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_present_offday_template` (
	`present_offday_template_id` int AUTO_INCREMENT NOT NULL,
	`present_offday_template_name` varchar(200) NOT NULL,
	`multiply_variable` double,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int,
	`present_offday_type` enum('Fixed','Variable') NOT NULL,
	`flat_amount` decimal(12,2),
	`present_offday_category` enum('pay_structure','different') NOT NULL,
	`gross_percentage` decimal(5,2),
	`salary_variable` enum('gross','basic'),
	`monthly_day` int,
	CONSTRAINT `hr_present_offday_template_present_offday_template_id` PRIMARY KEY(`present_offday_template_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_profession_type` (
	`id_hr_profession_type` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`profession_type` varchar(50) NOT NULL,
	`profession_type_details` varchar(500),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_profession_type_id_hr_profession_type` PRIMARY KEY(`id_hr_profession_type`)
);
--> statement-breakpoint
CREATE TABLE `hr_project_holidays` (
	`id_project_holidays` int AUTO_INCREMENT NOT NULL,
	`id_holiday` int NOT NULL,
	`id_project` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` int,
	CONSTRAINT `hr_project_holidays_id_project_holidays` PRIMARY KEY(`id_project_holidays`)
);
--> statement-breakpoint
CREATE TABLE `hr_project_permission` (
	`id_project_permission` int AUTO_INCREMENT NOT NULL,
	`id_project` int,
	`id_user` int,
	`id_user_permitted_by` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_project_permission_id_project_permission` PRIMARY KEY(`id_project_permission`)
);
--> statement-breakpoint
CREATE TABLE `hr_projectwise_role_assign` (
	`id_hr_projectwise_role_assign` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`type` enum('Leave','Certificate','Outstation','Attendance') NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hr_projectwise_role_assign_id_hr_projectwise_role_assign` PRIMARY KEY(`id_hr_projectwise_role_assign`)
);
--> statement-breakpoint
CREATE TABLE `hr_projectwise_template_assign` (
	`id_hr_projectwise_template_assign` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`template_type` enum('Overtime','Present Offday','Night Stay','Leave Policy','Provident Fund') NOT NULL DEFAULT 'Overtime',
	`template_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hr_projectwise_template_assign_id_hr_projectwise_template_assign` PRIMARY KEY(`id_hr_projectwise_template_assign`)
);
--> statement-breakpoint
CREATE TABLE `hr_promotion_info` (
	`id_hr_promotion_info` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_designation` int NOT NULL,
	`id_equivalent_designation` int,
	`approval_date` date NOT NULL,
	`id_prev_company` int,
	`id_prev_business_unit` int,
	`id_prev_department` int,
	`id_prev_designation` int,
	`id_prev_equivalent_designation` int,
	`id_users` int,
	`remark` text,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`file_name` text,
	`original_name` text,
	CONSTRAINT `hr_promotion_info_id_hr_promotion_info` PRIMARY KEY(`id_hr_promotion_info`)
);
--> statement-breakpoint
CREATE TABLE `hr_provident_fund_details` (
	`id_hr_provident_fund_details` int AUTO_INCREMENT NOT NULL,
	`id_hr_provident_fund_setup` int NOT NULL,
	`id_hr_provident_fund_template` int NOT NULL,
	`employee_id` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`generation_details_id` int NOT NULL,
	`id_pay_slip_generation_info` int NOT NULL,
	`current_amount` double(12,2),
	`pf_amount` double(12,2) NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_provident_fund_details_id_hr_provident_fund_details` PRIMARY KEY(`id_hr_provident_fund_details`)
);
--> statement-breakpoint
CREATE TABLE `hr_provident_fund_setup` (
	`id_hr_provident_fund_setup` int AUTO_INCREMENT NOT NULL,
	`id_hr_provident_fund_template` int NOT NULL,
	`employee_id` int NOT NULL,
	`id_projects` int NOT NULL,
	`setup_type` enum('New','Continuous') NOT NULL,
	`opening_balance` double(12,2) NOT NULL,
	`opening_month` int NOT NULL,
	`final_amount` double(12,2) NOT NULL,
	`total_month` int NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_hr_provident_fund_setup_file_import` int,
	CONSTRAINT `hr_provident_fund_setup_id_hr_provident_fund_setup` PRIMARY KEY(`id_hr_provident_fund_setup`)
);
--> statement-breakpoint
CREATE TABLE `hr_provident_fund_setup_file_import` (
	`id_hr_provident_fund_setup_file_import` int AUTO_INCREMENT NOT NULL,
	`id_projects` int NOT NULL,
	`total_data` int NOT NULL,
	`valid_entry` int NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`file_name` varchar(100) NOT NULL,
	`original_name` text NOT NULL,
	`deleted_by` int NOT NULL,
	CONSTRAINT `hr_provident_fund_setup_file_import_id_hr_provident_fund_setup_file_import` PRIMARY KEY(`id_hr_provident_fund_setup_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_provident_fund_template` (
	`id_hr_provident_fund_template` int AUTO_INCREMENT NOT NULL,
	`template_name` text NOT NULL,
	`id_projects` int NOT NULL,
	`salary_type` enum('Basic','Gross','CTC') NOT NULL,
	`salary_percentage` int NOT NULL,
	`deduction_percentage` int NOT NULL,
	`incentive_percentage` int NOT NULL,
	`minimum_eligible_year` double(12,2) NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_provident_fund_template_id_hr_provident_fund_template` PRIMARY KEY(`id_hr_provident_fund_template`)
);
--> statement-breakpoint
CREATE TABLE `hr_recruitments` (
	`id_hr_recruitment` int NOT NULL,
	`id_por_job_requisition_details` int NOT NULL,
	`employee_id` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_recruitments_id_hr_recruitment` PRIMARY KEY(`id_hr_recruitment`)
);
--> statement-breakpoint
CREATE TABLE `hr_reference` (
	`id_hr_reference` int AUTO_INCREMENT NOT NULL,
	`referrer_id` int,
	`referrer_name` varchar(50) NOT NULL,
	`employee_id` int NOT NULL,
	`referrer_designation` varchar(50) NOT NULL,
	`referrer_department` varchar(50) NOT NULL,
	`referrer_organization` varchar(50) NOT NULL,
	`referrer_contact` varchar(20),
	`is_internal` enum('yes','no') NOT NULL DEFAULT 'yes',
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`relation` varchar(150),
	`reference_number` varchar(50),
	`remarks` varchar(255),
	CONSTRAINT `hr_reference_id_hr_reference` PRIMARY KEY(`id_hr_reference`)
);
--> statement-breakpoint
CREATE TABLE `hr_roster_plan` (
	`id_roster_plan` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date` date NOT NULL,
	`shift_id` int NOT NULL,
	`id_roster_plan_file_upload` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` int,
	CONSTRAINT `hr_roster_plan_id_roster_plan` PRIMARY KEY(`id_roster_plan`)
);
--> statement-breakpoint
CREATE TABLE `hr_roster_plan_file_upload` (
	`id_roster_plan_file_upload` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`title` varchar(100) NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100) NOT NULL,
	`valid_data` int NOT NULL,
	`invalid_data` int DEFAULT 0,
	`total_data` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`invalid_entries` text,
	`skipped_data` int NOT NULL DEFAULT 0,
	`skipped_entries` text,
	CONSTRAINT `hr_roster_plan_file_upload_id_roster_plan_file_upload` PRIMARY KEY(`id_roster_plan_file_upload`)
);
--> statement-breakpoint
CREATE TABLE `hr_salary_business_unit` (
	`salary_business_unit_id` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`bank_id` int NOT NULL,
	`branch_id` int NOT NULL,
	`account_number` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_salary_business_unit_salary_business_unit_id` PRIMARY KEY(`salary_business_unit_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_shift_master` (
	`shift_id` int AUTO_INCREMENT NOT NULL,
	`shift_name` varchar(100) NOT NULL,
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	`allow_time` time NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`is_special` enum('y','n') NOT NULL DEFAULT 'n',
	CONSTRAINT `hr_shift_master_shift_id` PRIMARY KEY(`shift_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_area` (
	`id_hr_tax_area` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_template` int NOT NULL,
	`id_hr_tax_area_type` int NOT NULL,
	`min_tax_amount` decimal(12,2) NOT NULL,
	`comment` text,
	`id_users` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_tax_area_id_hr_tax_area` PRIMARY KEY(`id_hr_tax_area`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_area_type` (
	`id_hr_tax_area_type` int AUTO_INCREMENT NOT NULL,
	`area_type` enum('Dhaka & Chittagong City Corporation','Other City Corporations','Other Areas') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_tax_area_type_id_hr_tax_area_type` PRIMARY KEY(`id_hr_tax_area_type`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_bonus_setup` (
	`id_hr_tax_bonus_setup` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_template` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`eligible_date` date NOT NULL,
	`eligible_days` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_users` int NOT NULL,
	CONSTRAINT `hr_tax_bonus_setup_id_hr_tax_bonus_setup` PRIMARY KEY(`id_hr_tax_bonus_setup`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_calculation_range` (
	`id_hr_tax_calculation_range` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_template` int NOT NULL,
	`type` enum('Male','Female Or Others') NOT NULL,
	`start_range` double(12,2) NOT NULL,
	`end_range` double(12,2) NOT NULL,
	`difference` double(12,2) NOT NULL,
	`tax_percentage` double(12,2) NOT NULL,
	`comment` text,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_tax_calculation_range_id_hr_tax_calculation_range` PRIMARY KEY(`id_hr_tax_calculation_range`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_calculation_range_history` (
	`id_hr_tax_calculation_range_history` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_template` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_tax_calculation_range_history_id_hr_tax_calculation_range_history` PRIMARY KEY(`id_hr_tax_calculation_range_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_challan_employee` (
	`id_hr_tax_challan_employee` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_challan_entry` int NOT NULL,
	`employee_id` int NOT NULL,
	`tds_amount` double(12,2) NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int,
	CONSTRAINT `hr_tax_challan_employee_id_hr_tax_challan_employee` PRIMARY KEY(`id_hr_tax_challan_employee`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_challan_entry` (
	`id_hr_tax_challan_entry` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`challan_number` text NOT NULL,
	`challan_date` date NOT NULL,
	`challan_amount` double(12,2) NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`year_month` date NOT NULL,
	`branch_id` int,
	`id_banks` int,
	`payment_type` enum('Pay Order','Cheque','Cash') NOT NULL,
	`status` enum('Pending','Approved') NOT NULL DEFAULT 'Pending',
	`approver_id` int NOT NULL,
	`submitted_by_id` int NOT NULL,
	`pay_slip_generation_id` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_users` int NOT NULL,
	`id_hr_tax_challan_entry_file_import` int NOT NULL,
	`tax_challan_file_name` text,
	`tax_challan_orginal_name` text,
	CONSTRAINT `hr_tax_challan_entry_id_hr_tax_challan_entry` PRIMARY KEY(`id_hr_tax_challan_entry`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_challan_entry_file_import` (
	`id_hr_tax_challan_entry_file_import` int AUTO_INCREMENT NOT NULL,
	`total_data` int NOT NULL DEFAULT 0,
	`valid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_projects` int NOT NULL,
	`id_user` int NOT NULL,
	`deleted_by` int,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100),
	CONSTRAINT `hr_tax_challan_entry_file_import_id_hr_tax_challan_entry_file_import` PRIMARY KEY(`id_hr_tax_challan_entry_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_challan_entry_history` (
	`id_hr_tax_challan_entry_history` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_challan_entry` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('approve','delete','edit') NOT NULL DEFAULT 'delete',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updaet_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_tax_challan_entry_history_id_hr_tax_challan_entry_history` PRIMARY KEY(`id_hr_tax_challan_entry_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_policy_earning_head_wise` (
	`id_hr_earning_head_wise_tax_policy` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_template` int NOT NULL,
	`earning_heads_id` int NOT NULL,
	`tax_exempted_type` enum('Yes','No') NOT NULL,
	`earning_heads_id_exemption_from` int,
	`calculate_from` enum('Amount','Percentage','Both') NOT NULL,
	`exemption_amount` double(12,2),
	`periodic_type` enum('Monthly','Yearly'),
	`exemption_percentage` double(12,5),
	`is_bonus` enum('Yes','No') NOT NULL DEFAULT 'No',
	`salary_type` enum('Basic','Gross','Others Allowance','CTC'),
	`salary_percentage` decimal(10,2),
	`eligible_date` date,
	`eligible_days` int,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`remarks` text,
	CONSTRAINT `hr_tax_policy_earning_head_wise_id_hr_earning_head_wise_tax_policy` PRIMARY KEY(`id_hr_earning_head_wise_tax_policy`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_policy_earning_head_wise_history` (
	`id_hr_tax_policy_earning_head_wise_history` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_template` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_tax_policy_earning_head_wise_history_id_hr_tax_policy_earning_head_wise_history` PRIMARY KEY(`id_hr_tax_policy_earning_head_wise_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_recalculate` (
	`id_hr_tax_recalculate` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_template` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`id_projects` int NOT NULL,
	`year_month` date NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`type` enum('Recalculate Tax') NOT NULL,
	`template_error_ids` text,
	`tax_error_ids` text,
	`message` text,
	`remarks` text,
	`publication_status` enum('activated','deactivated') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int,
	CONSTRAINT `hr_tax_recalculate_id_hr_tax_recalculate` PRIMARY KEY(`id_hr_tax_recalculate`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_template` (
	`id_hr_tax_template` int AUTO_INCREMENT NOT NULL,
	`template_name` varchar(255) NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`max_investment_limit` double(12,2) NOT NULL,
	`allowable_investment_percentage` decimal(10,2) NOT NULL,
	`tax_rebate_investment_percentage` decimal(10,2) NOT NULL,
	`min_tax_free_salary_amount_male` decimal(10,2) NOT NULL,
	`min_tax_free_salary_amount_female` decimal(10,2) NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`original_name` varchar(100),
	`file_name` varchar(100),
	`tax_law` enum('1984','2023') NOT NULL,
	`maximum_exemption_amount` decimal(12,2),
	`exemption_gross_income_divided_by` tinyint(1),
	`first_time_tax_amount` decimal(12,2),
	CONSTRAINT `hr_tax_template_id_hr_tax_template` PRIMARY KEY(`id_hr_tax_template`)
);
--> statement-breakpoint
CREATE TABLE `hr_tax_template_history` (
	`id_hr_tax_template_history` int AUTO_INCREMENT NOT NULL,
	`id_hr_tax_template` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_tax_template_history_id_hr_tax_template_history` PRIMARY KEY(`id_hr_tax_template_history`)
);
--> statement-breakpoint
CREATE TABLE `hr_training_certification` (
	`id_hr_training_certification` int AUTO_INCREMENT NOT NULL,
	`id_hr_institutes` int NOT NULL,
	`id_country` int NOT NULL,
	`employee_id` int NOT NULL,
	`id_users` int NOT NULL,
	`title` text NOT NULL,
	`location` varchar(255) NOT NULL,
	`duration` varchar(255) NOT NULL,
	`remark` text,
	`data_type` enum('Training','Certifiation') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`file_name` varchar(200),
	`original_name` varchar(200),
	`id_hris_file_entry_details` int,
	CONSTRAINT `hr_training_certification_id_hr_training_certification` PRIMARY KEY(`id_hr_training_certification`)
);
--> statement-breakpoint
CREATE TABLE `hr_transferred_company` (
	`id_transferred_company` int AUTO_INCREMENT NOT NULL,
	`id_present_company` int NOT NULL,
	`id_employee` int NOT NULL,
	`id_employee_custom` varchar(50) NOT NULL,
	`id_company` int NOT NULL,
	`id_department` int NOT NULL,
	`effective_date` date NOT NULL,
	`id_reporting_person` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_grade` int NOT NULL,
	`id_designation` int NOT NULL,
	`id_user` int NOT NULL,
	`transfer_status` enum('Complete','Partial') NOT NULL DEFAULT 'Partial',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hr_transferred_company_id_transferred_company` PRIMARY KEY(`id_transferred_company`)
);
--> statement-breakpoint
CREATE TABLE `hr_transferred_employees_salary` (
	`transferred_employees_salary_id` int AUTO_INCREMENT NOT NULL,
	`total_days` int,
	`id_business_unit` int NOT NULL,
	`employee_id` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`year_month` date NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`head_name` varchar(150) NOT NULL,
	`head_type` varchar(150) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`pay_structure_template_id` int,
	`transfer_id` int NOT NULL,
	`id_heads` int NOT NULL,
	CONSTRAINT `hr_transferred_employees_salary_transferred_employees_salary_id` PRIMARY KEY(`transferred_employees_salary_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_travel_bill_expense_types` (
	`id_travel_bill_expense_type` int AUTO_INCREMENT NOT NULL,
	`expense_type` varchar(100) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_travel_bill_expense_types_id_travel_bill_expense_type` PRIMARY KEY(`id_travel_bill_expense_type`)
);
--> statement-breakpoint
CREATE TABLE `hr_variable_input_file_import` (
	`id_hr_variable_input_file_import` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`file_name` varchar(150) NOT NULL,
	`valid_entry` int NOT NULL DEFAULT 0,
	`invalid_entry` int NOT NULL DEFAULT 0,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`invalid_office_ids` text,
	`import_month` int NOT NULL,
	`import_year` int NOT NULL,
	`total_earning_deduction_amount` decimal(12,2) NOT NULL,
	`id_business_unit` int NOT NULL,
	`import_year_month` date NOT NULL,
	`earning_deduction_heads_id` int NOT NULL,
	`entry_type` enum('covid_deduction','variable_input') NOT NULL DEFAULT 'covid_deduction',
	`head_type` varchar(50) NOT NULL,
	`total_duplicate` int DEFAULT 0,
	`duplicate_ids` text,
	`total_invalid_amount_id` int DEFAULT 0,
	`invalid_amount_ids` text,
	`deleted_by` int,
	`original_name` varchar(100),
	`total_invalid_ps_setup` int DEFAULT 0,
	`invalid_ps_setup_ids` text,
	CONSTRAINT `hr_variable_input_file_import_id_hr_variable_input_file_import` PRIMARY KEY(`id_hr_variable_input_file_import`)
);
--> statement-breakpoint
CREATE TABLE `hr_variable_input_history` (
	`variable_input_history_id` int AUTO_INCREMENT NOT NULL,
	`pay_structure_variable_input_id` int NOT NULL,
	`previous_data` text NOT NULL,
	`changes_from` varchar(80) NOT NULL,
	`changes_to` varchar(80) NOT NULL,
	`previous_id_users` int NOT NULL,
	`changes_by` int NOT NULL,
	`history_date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`history_reason` enum('edit','delete') NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_variable_input_history_variable_input_history_id` PRIMARY KEY(`variable_input_history_id`)
);
--> statement-breakpoint
CREATE TABLE `hr_weekend` (
	`id_hr_weekend` int AUTO_INCREMENT NOT NULL,
	`days` char(50),
	`is_weekend` enum('weekend','not_weekend') DEFAULT 'not_weekend',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hr_weekend_id_hr_weekend` PRIMARY KEY(`id_hr_weekend`)
);
--> statement-breakpoint
CREATE TABLE `hr_work_station` (
	`work_station_id` int AUTO_INCREMENT NOT NULL,
	`work_station_name` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	CONSTRAINT `hr_work_station_work_station_id` PRIMARY KEY(`work_station_id`)
);
--> statement-breakpoint
CREATE TABLE `hris_candidate_user_addresses` (
	`id_candidate_user_address` int AUTO_INCREMENT NOT NULL,
	`id_district` int,
	`id_thana` int,
	`id_post_office` int,
	`address_line` varchar(100),
	`id_candidate_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_country` int,
	CONSTRAINT `hris_candidate_user_addresses_id_candidate_user_address` PRIMARY KEY(`id_candidate_user_address`)
);
--> statement-breakpoint
CREATE TABLE `hris_candidate_user_educations` (
	`id_candidate_user_education` int AUTO_INCREMENT NOT NULL,
	`id_degree` int NOT NULL,
	`result` varchar(20) NOT NULL,
	`marks` decimal(12,2),
	`cgpa` decimal(12,2),
	`major` int,
	`enroll_from` varchar(20),
	`passing_year` int,
	`board` varchar(20),
	`duration` decimal(12,2),
	`institute` varchar(100) NOT NULL,
	`id_candidate_user` int NOT NULL,
	`cgpa_scale` decimal(12,2),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`is_foreign_institute` tinyint(1) NOT NULL DEFAULT 0,
	`is_student` tinyint(1) NOT NULL DEFAULT 0,
	`enroll_to` date,
	CONSTRAINT `hris_candidate_user_educations_id_candidate_user_education` PRIMARY KEY(`id_candidate_user_education`)
);
--> statement-breakpoint
CREATE TABLE `hris_candidate_user_experiences` (
	`id_candidate_user_experience` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(100) NOT NULL,
	`designation` varchar(50) NOT NULL,
	`department` varchar(50) NOT NULL,
	`company_business` varchar(100) NOT NULL,
	`location` varchar(100),
	`joining_date` date NOT NULL,
	`resign_date` date,
	`responsibilities` text,
	`id_candidate_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`time_experienced_in_year` float NOT NULL,
	CONSTRAINT `hris_candidate_user_experiences_id_candidate_user_experience` PRIMARY KEY(`id_candidate_user_experience`)
);
--> statement-breakpoint
CREATE TABLE `hris_candidate_user_references` (
	`id_candidate_user_reference` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`phone` varchar(20),
	`email` varchar(35) NOT NULL,
	`department` varchar(100),
	`designation` varchar(100) NOT NULL,
	`organization` varchar(100) NOT NULL,
	`id_candidate_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_candidate_user_references_id_candidate_user_reference` PRIMARY KEY(`id_candidate_user_reference`)
);
--> statement-breakpoint
CREATE TABLE `hris_candidate_user_trainings` (
	`id_candidate_user_training` int AUTO_INCREMENT NOT NULL,
	`training_title` varchar(100) NOT NULL,
	`country` varchar(50) NOT NULL,
	`topic_covered` varchar(256) NOT NULL,
	`training_year` int NOT NULL,
	`institute` varchar(100) NOT NULL,
	`duration` varchar(100) NOT NULL,
	`location` varchar(150),
	`id_candidate_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_candidate_user_trainings_id_candidate_user_training` PRIMARY KEY(`id_candidate_user_training`)
);
--> statement-breakpoint
CREATE TABLE `hris_candidate_users` (
	`id_candidate_user` int AUTO_INCREMENT NOT NULL,
	`email` varchar(30) NOT NULL,
	`password` varchar(256) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`first_name` varchar(20),
	`last_name` varchar(20),
	`father_name` varchar(30),
	`mother_name` varchar(30),
	`birth_date` date,
	`gender` enum('male','female','other') DEFAULT 'male',
	`religion` enum('muslim','hindu','buddha','christan') DEFAULT 'muslim',
	`nationality` varchar(20),
	`national_id` varchar(20),
	`birth_certificate` varchar(20),
	`passport` varchar(20),
	`mobile` varchar(20),
	`marital_status` enum('married','unmarried','single') DEFAULT 'married',
	`id_present_address` int,
	`id_permanent_address` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`tin_number` varchar(100),
	`blood_group` varchar(10),
	`driving_licence` varchar(100),
	`full_name` varchar(100),
	`locality` enum('Local','Expatriate') DEFAULT 'Local',
	`is_occupied` tinyint(1) NOT NULL DEFAULT 0,
	CONSTRAINT `hris_candidate_users_id_candidate_user` PRIMARY KEY(`id_candidate_user`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `hris_citeria_master` (
	`id_hris_citeria_master` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`citeria_category_type` enum('Efficiency','Profitability','Reputation') NOT NULL DEFAULT 'Efficiency',
	`citeria_name` varchar(50) NOT NULL,
	`citeria_description` varchar(1000),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_citeria_master_id_hris_citeria_master` PRIMARY KEY(`id_hris_citeria_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_countries` (
	`id_country` int AUTO_INCREMENT NOT NULL,
	`country_name` varchar(50) NOT NULL,
	CONSTRAINT `hris_countries_id_country` PRIMARY KEY(`id_country`)
);
--> statement-breakpoint
CREATE TABLE `hris_degree_majors` (
	`id_major` int AUTO_INCREMENT NOT NULL,
	`major_name` varchar(100) NOT NULL,
	`id_degree` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_degree_majors_id_major` PRIMARY KEY(`id_major`)
);
--> statement-breakpoint
CREATE TABLE `hris_degrees` (
	`id_degree` int AUTO_INCREMENT NOT NULL,
	`degree_name` varchar(50) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_create` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`id_user` int NOT NULL,
	`date_update` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_degrees_id_degree` PRIMARY KEY(`id_degree`),
	CONSTRAINT `degree_name` UNIQUE(`degree_name`)
);
--> statement-breakpoint
CREATE TABLE `hris_departmental_budget` (
	`id_hris_departmental_budget` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_department` int NOT NULL,
	`id_designation` int NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_departmental_budget_id_hris_departmental_budget` PRIMARY KEY(`id_hris_departmental_budget`)
);
--> statement-breakpoint
CREATE TABLE `hris_departmental_budget_details` (
	`id_hris_departmental_budget_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_departmental_budget` int NOT NULL,
	`id_hris_job_create_details` int NOT NULL,
	`gross_salary` decimal(12,2) NOT NULL,
	`other_cost` decimal(12,2) NOT NULL,
	`ctc` decimal(12,2) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_departmental_budget_details_id_hris_departmental_budget_details` PRIMARY KEY(`id_hris_departmental_budget_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_districts` (
	`id_district` int AUTO_INCREMENT NOT NULL,
	`district_name` varchar(20),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_districts_id_district` PRIMARY KEY(`id_district`)
);
--> statement-breakpoint
CREATE TABLE `hris_document_master` (
	`id_hris_document_master` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`document_type` enum('Receive','Handover') NOT NULL DEFAULT 'Receive',
	`document_name` varchar(50) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_document_master_id_hris_document_master` PRIMARY KEY(`id_hris_document_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_employee_sitting_arragement_details` (
	`id_hris_employee_sitting_arragement_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`employee_id` int NOT NULL,
	`designation_id` int NOT NULL,
	`id_department` int NOT NULL,
	`id_hris_work_station_flat_room_details` int NOT NULL,
	`id_hris_work_station_flat_details` int NOT NULL,
	`sitting_capacity_ocupied` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_employee_sitting_arragement_details_id_hris_employee_sitting_arragement_details` PRIMARY KEY(`id_hris_employee_sitting_arragement_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_employee_stationary_requisition_details` (
	`id_hris_employee_stationary_requisition_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`employee_id` int NOT NULL,
	`designation_id` int NOT NULL,
	`id_department` int NOT NULL,
	`stationary_product_concern_employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_employee_stationary_requisition_details_id_hris_employee_stationary_requisition_details` PRIMARY KEY(`id_hris_employee_stationary_requisition_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_employee_stationary_requisition_items_details` (
	`id_hris_employee_stationary_requisition_items_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`id_hris_employee_stationary_requisition_details` int NOT NULL,
	`id_inv_items` int NOT NULL,
	`item_quantity` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`item_status` enum('Requested','Approved','Denied','Delivered','Delivery Denied','Not Delivered') NOT NULL DEFAULT 'Requested',
	`item_request_type` enum('hr','individual') NOT NULL DEFAULT 'hr',
	CONSTRAINT `hris_employee_stationary_requisition_items_details_id_hris_employee_stationary_requisition_items_details` PRIMARY KEY(`id_hris_employee_stationary_requisition_items_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_erp_plan` (
	`id_hris_erp_plan` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_department` int NOT NULL,
	`id_designation` int NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`no_of_recruit` int NOT NULL,
	`id_erp_plan_file_upload` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_erp_plan_id_hris_erp_plan` PRIMARY KEY(`id_hris_erp_plan`)
);
--> statement-breakpoint
CREATE TABLE `hris_erp_plan_file_upload` (
	`id_erp_plan_file_upload` int AUTO_INCREMENT NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`total_entry` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_erp_plan_file_upload_id_erp_plan_file_upload` PRIMARY KEY(`id_erp_plan_file_upload`)
);
--> statement-breakpoint
CREATE TABLE `hris_evaluation_score_master` (
	`id_hris_evaluation_score_master` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`evaluation_name` varchar(100) NOT NULL,
	`evaluation_score` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_evaluation_score_master_id_hris_evaluation_score_master` PRIMARY KEY(`id_hris_evaluation_score_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_file_archive_document_for` (
	`id_hris_file_archive_document_for` int AUTO_INCREMENT NOT NULL,
	`id_hris_file_archive_document_type` int NOT NULL,
	`document_for` enum('Expat','Management','Non Management','MAX Worker') NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_file_archive_document_for_id_hris_file_archive_document_for` PRIMARY KEY(`id_hris_file_archive_document_for`)
);
--> statement-breakpoint
CREATE TABLE `hris_file_archive_document_type` (
	`id_hris_file_archive_document_type` int AUTO_INCREMENT NOT NULL,
	`document_name` varchar(150) NOT NULL,
	`required_type` enum('Mandatory','Optional') NOT NULL,
	`document_issue_times` enum('Single','Multiple') NOT NULL DEFAULT 'Single',
	`receive_or_handover` enum('Receive','Handover','Not Applicable') NOT NULL,
	`document_remarks` varchar(150) NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_system_generated` enum('Yes','No'),
	CONSTRAINT `hris_file_archive_document_type_id_hris_file_archive_document_type` PRIMARY KEY(`id_hris_file_archive_document_type`)
);
--> statement-breakpoint
CREATE TABLE `hris_file_archive_entry` (
	`id_hris_file_archive_entry` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`personal_folder_ref_number` varchar(255),
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_file_archive_entry_id_hris_file_archive_entry` PRIMARY KEY(`id_hris_file_archive_entry`)
);
--> statement-breakpoint
CREATE TABLE `hris_file_archive_entry_details` (
	`id_hris_file_entry_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_file_archive_entry` int NOT NULL,
	`id_hris_file_archive_document_type` int NOT NULL,
	`file_letter_no` varchar(150),
	`file_issue_date` date,
	`file_page_no` varchar(150),
	`file_remarks` varchar(255),
	`attachment` varchar(100),
	`extension` varchar(30),
	`file_size` double(12,8),
	`thumb_name` varchar(100),
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`original_file_name` varchar(100),
	`deleted_by` int,
	CONSTRAINT `hris_file_archive_entry_details_id_hris_file_entry_details` PRIMARY KEY(`id_hris_file_entry_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_guest_inter_viewer_details` (
	`id_hris_guest_inter_viewer_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_hris_inter_view_board` int NOT NULL,
	`guest_inter_viewer_name` varchar(50) NOT NULL,
	`guest_inter_viewer_organization` varchar(50) NOT NULL,
	`guest_inter_viewer_designation` varchar(50) NOT NULL,
	`guest_inter_viewer_department` varchar(50) NOT NULL,
	`guest_inter_viewer_phone` varchar(50) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`status` enum('Invited','Present','Absent') NOT NULL DEFAULT 'Invited',
	CONSTRAINT `hris_guest_inter_viewer_details_id_hris_guest_inter_viewer_details` PRIMARY KEY(`id_hris_guest_inter_viewer_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_inter_view_board` (
	`id_hris_inter_view_board` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`hris_job_requisition_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_inter_view_board_id_hris_inter_view_board` PRIMARY KEY(`id_hris_inter_view_board`)
);
--> statement-breakpoint
CREATE TABLE `hris_inter_view_setup_details` (
	`id_hris_inter_view_setup_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_job_requisition` int NOT NULL,
	`id_hris_inter_view_time_schedule_details` int NOT NULL,
	`id_candidate_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`status` enum('Invited','Present','Absent') NOT NULL DEFAULT 'Invited',
	`compensation_status` enum('Pending','Complete') NOT NULL DEFAULT 'Pending',
	`appraise_status` enum('Pending','Complete') NOT NULL DEFAULT 'Pending',
	`required_appraise` int NOT NULL DEFAULT 0,
	CONSTRAINT `hris_inter_view_setup_details_id_hris_inter_view_setup_details` PRIMARY KEY(`id_hris_inter_view_setup_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_inter_view_time_schedule_details` (
	`id_hris_inter_view_time_schedule_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_hris_inter_view_board` int NOT NULL,
	`inter_view_date` date NOT NULL,
	`inter_view_time_from` time NOT NULL,
	`inter_view_time_to` time NOT NULL,
	`inter_view_reporting_time` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_inter_view_time_schedule_details_id_hris_inter_view_time_schedule_details` PRIMARY KEY(`id_hris_inter_view_time_schedule_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_inter_viewer_details` (
	`id_hris_inter_viewer_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_hris_inter_view_board` int NOT NULL,
	`inter_viewer_employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`status` enum('Invited','Present','Absent') NOT NULL DEFAULT 'Invited',
	CONSTRAINT `hris_inter_viewer_details_id_hris_inter_viewer_details` PRIMARY KEY(`id_hris_inter_viewer_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_interview_appraise` (
	`id_interview_appraise` int AUTO_INCREMENT NOT NULL,
	`id_inter_view_setup_details` int NOT NULL,
	`id_interview_appraised_rating` int,
	`id_interview_appraised_characteristic` int,
	`good_points` varchar(256),
	`weak_points` varchar(256),
	`remarks` varchar(256),
	`appraised_by` int NOT NULL,
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_interview_appraise_id_interview_appraise` PRIMARY KEY(`id_interview_appraise`)
);
--> statement-breakpoint
CREATE TABLE `hris_interview_appraised_candidates` (
	`id_interview_appraised_candidate` int AUTO_INCREMENT NOT NULL,
	`id_inter_view_setup_details` int NOT NULL,
	`total_ratings` decimal(11,2) NOT NULL,
	`total_characteristics` decimal(11,2) NOT NULL,
	`selection_status` enum('Selected For Written Test','Selected For Practical Test','Selected For Final List','Selection Pending','Pending For CEO/Director''s Approval','Offer Letter Taken','Offer Letter Denied','Appointment Letter Denied','Appointment Letter Taken','Approved For Offer Letter') DEFAULT 'Selection Pending',
	`previous_job_history_check` tinyint(1) DEFAULT 0,
	`reference_check` tinyint(1) DEFAULT 0,
	`academic_check` tinyint(1) DEFAULT 0,
	`qualification_check` tinyint(1) DEFAULT 0,
	`medical_check` tinyint,
	`deny_reason` varchar(256) DEFAULT '0',
	`job_id` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_interview_appraised_candidates_id_interview_appraised_candidate` PRIMARY KEY(`id_interview_appraised_candidate`)
);
--> statement-breakpoint
CREATE TABLE `hris_interview_appraised_candidates_selection_history` (
	`id_interview_appraised_candidate_selection_history` int AUTO_INCREMENT NOT NULL,
	`id_inter_view_setup_details` int NOT NULL,
	`selection_status` varchar(100) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_interview_appraised_candidates_selection_history_id_interview_appraised_candidate_selection_history` PRIMARY KEY(`id_interview_appraised_candidate_selection_history`)
);
--> statement-breakpoint
CREATE TABLE `hris_interview_appraised_characteristics` (
	`id_interview_appraised_characteristic` int AUTO_INCREMENT NOT NULL,
	`assertive` int,
	`cooperative` int,
	`outgoing` int,
	`realistic_career_goal` int,
	`ability_to_learn` int,
	`achievement_oriented` int,
	`verbal` int,
	`openness` int,
	`creativity` int,
	`professional` int,
	`total_score` int NOT NULL DEFAULT 0,
	CONSTRAINT `hris_interview_appraised_characteristics_id_interview_appraised_characteristic` PRIMARY KEY(`id_interview_appraised_characteristic`)
);
--> statement-breakpoint
CREATE TABLE `hris_interview_appraised_ratings` (
	`id_interview_appraised_rating` int AUTO_INCREMENT NOT NULL,
	`appearance` int,
	`eye_contact` int,
	`job_knowledge` int,
	`it_literacy` int,
	`oral_communication` int,
	`total_score` int NOT NULL DEFAULT 0,
	CONSTRAINT `hris_interview_appraised_ratings_id_interview_appraised_rating` PRIMARY KEY(`id_interview_appraised_rating`)
);
--> statement-breakpoint
CREATE TABLE `hris_interview_appraised_references` (
	`id_interview_appraised_reference` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`identity` varchar(100) NOT NULL,
	`phone` varchar(100),
	`comment` varchar(100),
	`id_interview_appraise` int NOT NULL,
	CONSTRAINT `hris_interview_appraised_references_id_interview_appraised_reference` PRIMARY KEY(`id_interview_appraised_reference`)
);
--> statement-breakpoint
CREATE TABLE `hris_interview_board_master` (
	`id_hris_interview_board_master` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_department` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_interview_board_master_id_hris_interview_board_master` PRIMARY KEY(`id_hris_interview_board_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_interview_board_master_interviewer_details` (
	`id_hris_interview_board_master_interviewer_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_hris_interview_board_master` int NOT NULL,
	`inter_viewer_employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_interview_board_master_interviewer_details_id_hris_interview_board_master_interviewer_details` PRIMARY KEY(`id_hris_interview_board_master_interviewer_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_it_goods_details` (
	`id_hris_it_goods_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`employee_id` int NOT NULL,
	`designation_id` int NOT NULL,
	`id_department` int NOT NULL,
	`concern_supervisor_id` int NOT NULL,
	`concern_it_person_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_it_goods_details_id_hris_it_goods_details` PRIMARY KEY(`id_hris_it_goods_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_it_goods_items_details` (
	`id_hris_it_goods_items_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`id_hris_it_goods_details` int NOT NULL,
	`id_inv_items` int NOT NULL,
	`item_quantity` int NOT NULL,
	`item_status` enum('Requested','Approved','Denied','Delivered','Delivery Denied','Not Delivered') NOT NULL DEFAULT 'Requested',
	`item_request_type` enum('hr','individual') NOT NULL DEFAULT 'hr',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_it_goods_items_details_id_hris_it_goods_items_details` PRIMARY KEY(`id_hris_it_goods_items_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_advertisement_bill_entry` (
	`id_job_advertisement_bill_entry` int AUTO_INCREMENT NOT NULL,
	`id_job_advertisements` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`invoice_number` varchar(50) NOT NULL,
	`invoice_date` date NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`agency_name` varchar(50),
	`agency_contact` varchar(50),
	`last_payment_date` date NOT NULL,
	`beneficiary_name` varchar(50),
	`routing_number` int,
	`id_branch` int,
	`approver_1` int,
	`approver_2` int,
	`account_payable` int NOT NULL,
	`bill_attachment` varchar(50) NOT NULL,
	`status` enum('Pending','Approved') NOT NULL DEFAULT 'Pending',
	`id_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_vendors` int NOT NULL,
	`id_voucher` int,
	CONSTRAINT `hris_job_advertisement_bill_entry_id_job_advertisement_bill_entry` PRIMARY KEY(`id_job_advertisement_bill_entry`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_advertisement_media_masters` (
	`id_advertisement_media_masters` int AUTO_INCREMENT NOT NULL,
	`id_job_advertisement` int NOT NULL,
	`id_vendors` int NOT NULL,
	`publication_date` date NOT NULL,
	`file_name` varchar(256),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`email` varchar(50),
	`phone` varchar(50),
	CONSTRAINT `hris_job_advertisement_media_masters_id_advertisement_media_masters` PRIMARY KEY(`id_advertisement_media_masters`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_advertisements` (
	`id_job_advertisements` int AUTO_INCREMENT NOT NULL,
	`id_job_requisition` int NOT NULL,
	`last_application_date` date NOT NULL,
	`media_type` varchar(10) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_advertisements_id_job_advertisements` PRIMARY KEY(`id_job_advertisements`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_application_history` (
	`id_job_application_history` int AUTO_INCREMENT NOT NULL,
	`id_job_application` int NOT NULL,
	`previous_job_requisition_id` int NOT NULL,
	`current_job_requisition_id` int NOT NULL,
	`previous_status` varchar(30) NOT NULL,
	`current_status` varchar(30) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `hris_job_application_history_id_job_application_history` PRIMARY KEY(`id_job_application_history`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_applications` (
	`id_job_application` int AUTO_INCREMENT NOT NULL,
	`id_job_requisition` int NOT NULL,
	`id_candidate_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`apply_date` date NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`status` enum('pending','denied','shortlisted','interview','final_list','final_approval','offer_letter','appointment_letter') NOT NULL DEFAULT 'pending',
	`called_for_interview` tinyint(1) NOT NULL DEFAULT 0,
	CONSTRAINT `hris_job_applications_id_job_application` PRIMARY KEY(`id_job_application`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_create` (
	`id_hris_job_create` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_department` int NOT NULL,
	`id_designation` int NOT NULL,
	`number_of_employee` int NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_job_create_id_hris_job_create` PRIMARY KEY(`id_hris_job_create`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_create_details` (
	`id_hris_job_create_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_create` int NOT NULL,
	`job_id` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`status` enum('New','Empty','Processing','Occupied') NOT NULL DEFAULT 'New',
	CONSTRAINT `hris_job_create_details_id_hris_job_create_details` PRIMARY KEY(`id_hris_job_create_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description` (
	`id_hris_job_description` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`reporting_to` int NOT NULL,
	`job_no` varchar(50),
	`job_purpose` text NOT NULL,
	`date_created` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_business_unit` int NOT NULL,
	`grade_id` int NOT NULL,
	`department_id` int NOT NULL,
	`designation_id` int NOT NULL,
	`work_station_id` int NOT NULL,
	CONSTRAINT `hris_job_description_id_hris_job_description` PRIMARY KEY(`id_hris_job_description`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_dimension` (
	`id_hris_jd_dimension` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`dimension` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_dimension_id_hris_jd_dimension` PRIMARY KEY(`id_hris_jd_dimension`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_experience` (
	`id_hris_jd_experience` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`experience_details` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_experience_id_hris_jd_experience` PRIMARY KEY(`id_hris_jd_experience`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_external_customer` (
	`id_hris_jd_external_customer` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`external_customer` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_external_customer_id_hris_jd_external_customer` PRIMARY KEY(`id_hris_jd_external_customer`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_internal_customer` (
	`id_hris_jd_internal_customer` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`internal_customer` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_internal_customer_id_hris_jd_internal_customer` PRIMARY KEY(`id_hris_jd_internal_customer`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_non_performing_areas` (
	`id_job_description_non_performing_area` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_job_description_performing_area` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_non_performing_areas_id_job_description_non_performing_area` PRIMARY KEY(`id_job_description_non_performing_area`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_performing_area` (
	`id_hris_jd_performing_area` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`key_result_area` text NOT NULL,
	`measure_of_success` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_performing_area_id_hris_jd_performing_area` PRIMARY KEY(`id_hris_jd_performing_area`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_qualification` (
	`id_hris_jd_qualification` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`qualification_details` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_qualification_id_hris_jd_qualification` PRIMARY KEY(`id_hris_jd_qualification`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_quality_parameter` (
	`id_hris_jd_quality_parameter` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`quality_parameter` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_quality_parameter_id_hris_jd_quality_parameter` PRIMARY KEY(`id_hris_jd_quality_parameter`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_soft_skill` (
	`id_hris_jd_soft_skill` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`soft_skill` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `hris_job_description_soft_skill_id_hris_jd_soft_skill` PRIMARY KEY(`id_hris_jd_soft_skill`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_special_requirement` (
	`id_hris_jd_special_requirement` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`special_requirement` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_special_requirement_id_hris_jd_special_requirement` PRIMARY KEY(`id_hris_jd_special_requirement`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_description_technical_skill` (
	`id_hris_jd_technical_skill` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_description` int NOT NULL,
	`technical_skill` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_description_technical_skill_id_hris_jd_technical_skill` PRIMARY KEY(`id_hris_jd_technical_skill`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_requisition_approval_activities` (
	`id_job_requisition_approval_activity` int AUTO_INCREMENT NOT NULL,
	`id_job_requisition` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`status` varchar(100) NOT NULL,
	CONSTRAINT `hris_job_requisition_approval_activities_id_job_requisition_approval_activity` PRIMARY KEY(`id_job_requisition_approval_activity`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_requisition_summery` (
	`id_hris_job_requisition_summery` int AUTO_INCREMENT NOT NULL,
	`id_projects` int NOT NULL,
	`designation_id` int NOT NULL,
	`id_department` int NOT NULL,
	`total_posts` int NOT NULL,
	`id_employee_nature_type` int NOT NULL,
	`position_sought` enum('New','Replacement') NOT NULL,
	`former_incumbent` int,
	`tentative_joining_date` date,
	`requisition_requested_by` int,
	`requisition_date` date,
	`requisition_approved_by` int,
	`approval_date` date,
	`remarks` text,
	`id_users` int NOT NULL,
	`date_created` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`management_type` enum('Management','Non Management','MAX Worker') NOT NULL,
	`requisition_status` enum('Pending','Done','Partial') NOT NULL DEFAULT 'Pending',
	`deleted_by` int,
	`file_name` varchar(100),
	`original_name` varchar(100),
	CONSTRAINT `hris_job_requisition_summery_id_hris_job_requisition_summery` PRIMARY KEY(`id_hris_job_requisition_summery`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_requisition_summery_former_incumbent_employees` (
	`id_hris_job_requisition_summery_former_incumbent_employees` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_requisition_summery` int NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_job_requisition_summery_former_incumbent_employees_id_hris_job_requisition_summery_former_incumbent_employees` PRIMARY KEY(`id_hris_job_requisition_summery_former_incumbent_employees`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_requisition_summery_potential_candidate_cv` (
	`id_hris_job_requisition_summery_potential_candidate_cv` int AUTO_INCREMENT NOT NULL,
	`id_hris_job_requisition_summery` int NOT NULL,
	`candidate_name` text,
	`candidate_phone_number` varchar(25) NOT NULL,
	`comments` text,
	`id_users` int NOT NULL,
	`file_name` varchar(255),
	`original_name` varchar(255),
	`date_created` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`deleted_by` int,
	CONSTRAINT `hris_job_requisition_summery_potential_candidate_cv_id_hris_job_requisition_summery_potential_candidate_cv` PRIMARY KEY(`id_hris_job_requisition_summery_potential_candidate_cv`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_requisitions` (
	`id_job_requisition` int AUTO_INCREMENT NOT NULL,
	`id_department` int NOT NULL,
	`id_designation` int NOT NULL,
	`start_date` date NOT NULL,
	`position_sought` enum('New','Replacement') NOT NULL DEFAULT 'New',
	`id_grade` int,
	`id_employee_status` int NOT NULL,
	`employee_type` enum('management','non-management') NOT NULL DEFAULT 'non-management',
	`position_justification` text NOT NULL,
	`id_degree` int NOT NULL,
	`id_major` int,
	`result` varchar(30),
	`gender` enum('Male','Female','Others') NOT NULL DEFAULT 'Male',
	`id_work_station` int NOT NULL,
	`budget` enum('yes','no') NOT NULL DEFAULT 'yes',
	`min_experience` int DEFAULT 0,
	`max_experience` int,
	`min_age` int,
	`max_age` int,
	`id_recommender` int NOT NULL,
	`id_project_hr` int NOT NULL,
	`jd_attachment` varchar(256),
	`communication_skills` varchar(256),
	`status` enum('Pending For Recommender Approval','Pending For COO/CHRO Approval','Pending For Director/CEO Approval','Approved by Director/CEO','Denied by Project HR','Denied by COO/CHRO','Denied by Director/CEO','Denied by Recommender','Pending For Project HR Approval','Pending For Divisional HR Approval','Denied by Divisional HR','Approved') NOT NULL DEFAULT 'Pending For Recommender Approval',
	`deny_reason` text,
	`id_coo_chro` int,
	`id_ceo` int,
	`id_recruitment_officer` int,
	`id_hr_recommendation` int,
	`id_coo_recommendation` int,
	`hr_recommendation_message` text,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_requester` int NOT NULL,
	`total_posts` int NOT NULL,
	`coo_recommendation_message` text,
	`id_divisional_hr` int,
	`selection_status` enum('pending','complete') NOT NULL DEFAULT 'pending',
	CONSTRAINT `hris_job_requisitions_id_job_requisition` PRIMARY KEY(`id_job_requisition`)
);
--> statement-breakpoint
CREATE TABLE `hris_job_responsibilities` (
	`id_job_responsibility` int AUTO_INCREMENT NOT NULL,
	`responsibility` text NOT NULL,
	`id_job_requisition` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_update` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_job_responsibilities_id_job_responsibility` PRIMARY KEY(`id_job_responsibility`)
);
--> statement-breakpoint
CREATE TABLE `hris_log` (
	`id_hris_log` int AUTO_INCREMENT NOT NULL,
	`url` varchar(200),
	`get_data` text,
	`post_data` text,
	`header_data` text,
	`id_employee` int,
	`ip_address` varchar(45),
	`user_agent` varchar(200),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`performance_time` float,
	CONSTRAINT `hris_log_id_hris_log` PRIMARY KEY(`id_hris_log`)
);
--> statement-breakpoint
CREATE TABLE `hris_man_power_planning` (
	`id_hris_man_power_planning` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`id_department` int NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`scan_copy` text,
	CONSTRAINT `hris_man_power_planning_id_hris_man_power_planning` PRIMARY KEY(`id_hris_man_power_planning`)
);
--> statement-breakpoint
CREATE TABLE `hris_man_power_planning_details` (
	`id_hris_man_power_planning_details` int AUTO_INCREMENT NOT NULL,
	`id_designation` int NOT NULL,
	`number_of_position` int NOT NULL,
	`id_hris_man_power_planning` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_man_power_planning_details_id_hris_man_power_planning_details` PRIMARY KEY(`id_hris_man_power_planning_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_marking_system_master` (
	`id_hris_marking_system_master` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`marking_point_name` varchar(50) NOT NULL,
	`marking_point` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_marking_system_master_id_hris_marking_system_master` PRIMARY KEY(`id_hris_marking_system_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_media_master` (
	`id_media_master` int AUTO_INCREMENT NOT NULL,
	`media_master_name` varchar(50) NOT NULL,
	`id_media_type` int NOT NULL,
	`email` varchar(20),
	`phone` varchar(20),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_media_master_id_media_master` PRIMARY KEY(`id_media_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_media_type` (
	`id_media_type` int AUTO_INCREMENT NOT NULL,
	`type_name` varchar(50) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_media_type_id_media_type` PRIMARY KEY(`id_media_type`)
);
--> statement-breakpoint
CREATE TABLE `hris_menu` (
	`id_menu` int AUTO_INCREMENT NOT NULL,
	`menu` varchar(100) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_menu_id_menu` PRIMARY KEY(`id_menu`)
);
--> statement-breakpoint
CREATE TABLE `hris_menu_submenu` (
	`id_menu_submenu` int AUTO_INCREMENT NOT NULL,
	`id_menu` int NOT NULL,
	`submenu` varchar(100) NOT NULL,
	`submenu_url` varchar(100) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_menu_submenu_id_menu_submenu` PRIMARY KEY(`id_menu_submenu`)
);
--> statement-breakpoint
CREATE TABLE `hris_page_permission` (
	`id_page_permission` int AUTO_INCREMENT NOT NULL,
	`id_menu_submenu` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_user` int NOT NULL,
	`permitted_by` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`has_permission` tinyint(1) NOT NULL DEFAULT 1,
	`id_project` int NOT NULL,
	CONSTRAINT `hris_page_permission_id_page_permission` PRIMARY KEY(`id_page_permission`)
);
--> statement-breakpoint
CREATE TABLE `hris_performance_appraisal_date_ranges` (
	`id_performance_appraisal_date_range` int AUTO_INCREMENT NOT NULL,
	`id_performance_appraisal_setup` int NOT NULL,
	`date_from` date NOT NULL,
	`date_to` date NOT NULL,
	`appraisal_no` int NOT NULL,
	CONSTRAINT `hris_performance_appraisal_date_ranges_id_performance_appraisal_date_range` PRIMARY KEY(`id_performance_appraisal_date_range`)
);
--> statement-breakpoint
CREATE TABLE `hris_performance_appraisal_setup` (
	`id_performance_appraisal_setup` int AUTO_INCREMENT NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`target_work_from` date NOT NULL,
	`target_work_to` date NOT NULL,
	`number_of_appraise` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`flexible_days` int NOT NULL,
	CONSTRAINT `hris_performance_appraisal_setup_id_performance_appraisal_setup` PRIMARY KEY(`id_performance_appraisal_setup`)
);
--> statement-breakpoint
CREATE TABLE `hris_pms_appraisal_approvals` (
	`id_hris_pms_appraisal_approvals` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_performance_appraisal_setup` int NOT NULL,
	`recommended_by` int,
	`recommended_increment` decimal(10,2),
	`recommended_increase` decimal(10,2),
	`recommended_designation` int,
	`approved_increment` decimal(10,2),
	`approved_increase` decimal(10,2),
	`approved_designation` int,
	`status` enum('Pending','Approved') DEFAULT 'Pending',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_supervisor` int,
	`supervisor_recommended_increment` decimal(10,2),
	`supervisor_recommended_increase` decimal(10,2),
	`supervisor_recommended_designation` int,
	CONSTRAINT `hris_pms_appraisal_approvals_id_hris_pms_appraisal_approvals` PRIMARY KEY(`id_hris_pms_appraisal_approvals`)
);
--> statement-breakpoint
CREATE TABLE `hris_pms_recommendation_details` (
	`id_pms_recommendation_details` int AUTO_INCREMENT NOT NULL,
	`id_pms_recommendation_master` int NOT NULL,
	`recommendation_as_performance` varchar(100) NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_pms_recommendation_details_id_pms_recommendation_details` PRIMARY KEY(`id_pms_recommendation_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_pms_recommendation_master` (
	`id_pms_recommendation_master` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`recommendation_type` varchar(50) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_pms_recommendation_master_id_pms_recommendation_master` PRIMARY KEY(`id_pms_recommendation_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_pms_score_master` (
	`id_hris_pms_score_master` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`pms_rank` varchar(50) NOT NULL,
	`pms_performance` varchar(50) NOT NULL,
	`pms_max_score` int NOT NULL,
	`pms_min_score` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_pms_recommendation_master` int NOT NULL,
	CONSTRAINT `hris_pms_score_master_id_hris_pms_score_master` PRIMARY KEY(`id_hris_pms_score_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_policies` (
	`id_hris_policies` int AUTO_INCREMENT NOT NULL,
	`policy_name` varchar(255) NOT NULL,
	`policy_date` date NOT NULL,
	`policy_remarks` text NOT NULL,
	`business_unit_type` varchar(50) NOT NULL,
	`business_unit_id` int,
	`policy_attachment` varchar(100) NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`original_name` varchar(100),
	CONSTRAINT `hris_policies_id_hris_policies` PRIMARY KEY(`id_hris_policies`)
);
--> statement-breakpoint
CREATE TABLE `hris_post_offices` (
	`id_post_office` int AUTO_INCREMENT NOT NULL,
	`post_office_name` varchar(20),
	`id_thana` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_post_offices_id_post_office` PRIMARY KEY(`id_post_office`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_agreement_benificiary_details` (
	`id_hris_rent_agreement_benificiary_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_rent_agreement_details` int NOT NULL,
	`business_unit_id_benificiary` int NOT NULL,
	`cost_center_id_benificiary` int NOT NULL,
	`benificiary_percentage` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_rent_agreement_benificiary_details_id_hris_rent_agreement_benificiary_details` PRIMARY KEY(`id_hris_rent_agreement_benificiary_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_agreement_details` (
	`id_hris_rent_agreement_details` int AUTO_INCREMENT NOT NULL,
	`work_resident_type` enum('Resident','Workstation') NOT NULL DEFAULT 'Workstation',
	`work_or_resident_id` int NOT NULL,
	`agreement_name` varchar(255),
	`agreement_number` varchar(255) NOT NULL,
	`agreement_date` date NOT NULL,
	`agreement_note` text,
	`business_unit_id_lesses` int NOT NULL,
	`representor_name` varchar(255) NOT NULL,
	`representor_employee_id` int NOT NULL,
	`representor_employee_designaion_id` int NOT NULL,
	`representor_employee_father_name` varchar(255),
	`representor_employee_address` varchar(255) NOT NULL,
	`total_rent` decimal(12,2) NOT NULL,
	`rent_effective_date` date NOT NULL,
	`rent_expire_date` date NOT NULL,
	`leese_period_month` int NOT NULL,
	`termination_notice_period` int NOT NULL,
	`representor_vendor_id` int NOT NULL,
	`bank_id` int,
	`branch_id` int,
	`account_number` varchar(45),
	`routing_number` varchar(45),
	`payment_frequency` enum('Monthly','Quarterly','HalfYearly','Yearly') NOT NULL DEFAULT 'Monthly',
	`comply_type` enum('Fully Comply','Partially Comply') NOT NULL,
	`comply_note` text,
	`advance_type` enum('Month','Amount','NoAdvance') NOT NULL DEFAULT 'Month',
	`advance_month` int,
	`advance_rent` decimal(12,2),
	`advance_paid` decimal(12,2) NOT NULL,
	`advance_due` decimal(12,2) NOT NULL,
	`advance_cash_amount` decimal(12,2),
	`advance_bank_amount` decimal(12,2),
	`ap_employee_id` int,
	`accountant_employee_id` int,
	`advance_deduction_type` enum('Monthly','Refund','ExpireAdjustment'),
	`advance_deduction_monthly_amount` decimal(12,2),
	`advance_deduction_start_month` date,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`leese_period` varchar(45) NOT NULL,
	`id_voucher` int,
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`agreement_note_attachment` varchar(100),
	`agreement_note_attachment_original_name` varchar(100),
	`comply_note_attachment` varchar(100),
	`comply_note_attachment_original_name` varchar(100),
	CONSTRAINT `hris_rent_agreement_details_id_hris_rent_agreement_details` PRIMARY KEY(`id_hris_rent_agreement_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_agreement_flat_details` (
	`id_hris_rent_agreement_flat_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_rent_agreement_details` int NOT NULL,
	`work_or_resident_flat_id` int NOT NULL,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_rent_agreement_flat_details_id_hris_rent_agreement_flat_details` PRIMARY KEY(`id_hris_rent_agreement_flat_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_agreement_lessors_details` (
	`id_hris_rent_agreement_lessors_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_rent_agreement_details` int NOT NULL,
	`lessor_name` varchar(255) NOT NULL,
	`lessor_father_name` varchar(255) NOT NULL,
	`lessor_address` varchar(255) NOT NULL,
	`lessor_phone` varchar(45) NOT NULL,
	`lessor_email` varchar(45) NOT NULL,
	`ownership_percentage` int NOT NULL,
	`photo_id_type` enum('Nid','BirthCertificate','Passport') NOT NULL DEFAULT 'Nid',
	`photo_id` varchar(100),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`original_photo_id` varchar(100),
	CONSTRAINT `hris_rent_agreement_lessors_details_id_hris_rent_agreement_lessors_details` PRIMARY KEY(`id_hris_rent_agreement_lessors_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_agreement_payment_details` (
	`id_hris_rent_agreement_payment_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_rent_agreement_details` int NOT NULL,
	`id_users` int NOT NULL,
	`id_ledgers` int NOT NULL,
	`payment_type` enum('cash','bank') NOT NULL DEFAULT 'cash',
	`voucher_date` date NOT NULL,
	`payment_amount` decimal(12,2) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_voucher` int,
	CONSTRAINT `hris_rent_agreement_payment_details_id_hris_rent_agreement_payment_details` PRIMARY KEY(`id_hris_rent_agreement_payment_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_agreement_rent_details` (
	`id_hris_rent_agreement_rent_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_rent_agreement_details` int NOT NULL,
	`comply_type` enum('Fully Comply','Partially Comply') NOT NULL,
	`rent_bank_amount` decimal(12,2),
	`rent_cash_amount` decimal(12,2),
	`vat_deduction_percentage` decimal(12,2),
	`income_tax_deduction_percentage` decimal(12,2),
	`vat_deduction_amount` decimal(12,2),
	`income_tax_deduction_amount` decimal(12,2),
	`status` enum('Running','Expired','Changed') NOT NULL DEFAULT 'Running',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_rent_agreement_rent_details_id_hris_rent_agreement_rent_details` PRIMARY KEY(`id_hris_rent_agreement_rent_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_generation_attachments_details` (
	`id_hris_rent_generation_attachments_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_rent_generation_details` int NOT NULL,
	`attachment_name` varchar(45) NOT NULL,
	`attachment_image` varchar(45),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`original_file` varchar(100),
	CONSTRAINT `hris_rent_generation_attachments_details_id_hris_rent_generation_attachments_details` PRIMARY KEY(`id_hris_rent_generation_attachments_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_generation_details` (
	`id_hris_rent_generation_details` int AUTO_INCREMENT NOT NULL,
	`work_resident_type` enum('Resident','Workstation') NOT NULL DEFAULT 'Workstation',
	`work_or_resident_id` int NOT NULL,
	`id_hris_rent_agreement_details` int NOT NULL,
	`rent_from_year` int NOT NULL,
	`rent_from_month` int NOT NULL,
	`rent_to_year` int NOT NULL,
	`rent_to_month` int NOT NULL,
	`total_rent_month` varchar(45) NOT NULL,
	`total_rent_amount` decimal(12,2) NOT NULL,
	`advance_adjust_status` enum('true','false') NOT NULL DEFAULT 'false',
	`advance_adjust_amount` decimal(12,2) NOT NULL,
	`advance_adjust_reason` varchar(200),
	`net_rent_amount` decimal(12,2) NOT NULL,
	`rebate_amt` decimal(12,2) NOT NULL,
	`vat_deduction_amount` decimal(12,2) NOT NULL,
	`tax_deduction_amount` decimal(12,2) NOT NULL,
	`net_rent_payable` decimal(12,2) NOT NULL,
	`net_payable_cash_amount` decimal(12,2) NOT NULL,
	`net_payable_bank_amount` decimal(12,2) NOT NULL,
	`last_payment_date` date NOT NULL,
	`status` enum('Pending','Submitted','Checked','Certified','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`submitted_by` int NOT NULL,
	`checked_by` int NOT NULL,
	`certified_by` int NOT NULL,
	`approved_by` int NOT NULL,
	`ap_employee_id` int,
	`accountant_employee_id` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`id_voucher` int,
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`denied_by` int,
	`denied_reason` text,
	CONSTRAINT `hris_rent_generation_details_id_hris_rent_generation_details` PRIMARY KEY(`id_hris_rent_generation_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_rent_generation_payment_details` (
	`id_hris_rent_generation_payment_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_rent_generation_details` int NOT NULL,
	`id_users` int NOT NULL,
	`id_ledgers` int NOT NULL,
	`payment_type` enum('cash','bank') NOT NULL DEFAULT 'cash',
	`voucher_date` date NOT NULL,
	`payment_amount` decimal(12,2) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_rent_generation_payment_details_id_hris_rent_generation_payment_details` PRIMARY KEY(`id_hris_rent_generation_payment_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_resident_details` (
	`id_hris_resident_details` int AUTO_INCREMENT NOT NULL,
	`resident_type` enum('Own','Rent') NOT NULL DEFAULT 'Own',
	`building_name` varchar(45) NOT NULL,
	`house_number` varchar(45) NOT NULL,
	`road_number` varchar(45) NOT NULL,
	`location` varchar(45) NOT NULL,
	`total_area_square_feet` decimal(12,2) NOT NULL,
	`total_room` int NOT NULL,
	`total_wash_room` int NOT NULL,
	`total_kitchen` int NOT NULL,
	`total_store_room` int NOT NULL,
	`total_corridor` int NOT NULL,
	`total_car_parking` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`building_image` varchar(100),
	`original_name` varchar(100),
	CONSTRAINT `hris_resident_details_id_hris_resident_details` PRIMARY KEY(`id_hris_resident_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_resident_flat_details` (
	`id_hris_resident_flat_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_resident_floor_details` int NOT NULL,
	`flat_no` varchar(45) NOT NULL,
	`floor` int NOT NULL,
	`square_feet` decimal(12,2) NOT NULL,
	`room` int NOT NULL,
	`wash_room` int NOT NULL,
	`kitchen` int NOT NULL,
	`store_room` int NOT NULL,
	`corridor` int NOT NULL,
	`car_parking` enum('Yes','No') NOT NULL DEFAULT 'No',
	`floor_details_data` enum('NotUpdated','Updated') NOT NULL DEFAULT 'NotUpdated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_resident_flat_details_id_hris_resident_flat_details` PRIMARY KEY(`id_hris_resident_flat_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_resident_flat_room_details` (
	`id_hris_resident_flat_room_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_resident_flat_details` int NOT NULL,
	`room_no` varchar(45),
	`room_type` enum('Single','Multiple','Hall Room','Prayer Room','Meeting Room','Dining Space') NOT NULL DEFAULT 'Multiple',
	`no_of_person` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_resident_flat_room_details_id_hris_resident_flat_room_details` PRIMARY KEY(`id_hris_resident_flat_room_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_resident_floor_details` (
	`id_hris_resident_floor_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_resident_details` int NOT NULL,
	`floor` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_resident_floor_details_id_hris_resident_floor_details` PRIMARY KEY(`id_hris_resident_floor_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_responsibility_matrix_function` (
	`id_hris_responsibility_matrix_function` int AUTO_INCREMENT NOT NULL,
	`function_name` varchar(200) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`remarks` text,
	CONSTRAINT `hris_responsibility_matrix_function_id_hris_responsibility_matrix_function` PRIMARY KEY(`id_hris_responsibility_matrix_function`)
);
--> statement-breakpoint
CREATE TABLE `hris_responsibility_matrix_incharge` (
	`id_hris_responsibility_matrix_incharge` int AUTO_INCREMENT NOT NULL,
	`sub_function_incharge` int NOT NULL,
	`id_hris_responsibility_matrix_sub_function` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`id_users` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_responsibility_matrix_incharge_id_hris_responsibility_matrix_incharge` PRIMARY KEY(`id_hris_responsibility_matrix_incharge`)
);
--> statement-breakpoint
CREATE TABLE `hris_responsibility_matrix_sub_function` (
	`id_hris_responsibility_matrix_sub_function` int AUTO_INCREMENT NOT NULL,
	`sub_function_name` varchar(250) NOT NULL,
	`id_hris_responsibility_matrix_function` int NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_responsibility_matrix_sub_function_id_hris_responsibility_matrix_sub_function` PRIMARY KEY(`id_hris_responsibility_matrix_sub_function`)
);
--> statement-breakpoint
CREATE TABLE `hris_responsibility_sub_function_details` (
	`id_hris_responsibility_sub_function_details` int AUTO_INCREMENT NOT NULL,
	`sub_function_details` text NOT NULL,
	`id_hris_responsibility_sub_function` int NOT NULL,
	`id_users` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_responsibility_sub_function_details_id_hris_responsibility_sub_function_details` PRIMARY KEY(`id_hris_responsibility_sub_function_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_special_notes` (
	`id_special_note` int AUTO_INCREMENT NOT NULL,
	`special_note` text,
	`id_job_requisition` int NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_special_notes_id_special_note` PRIMARY KEY(`id_special_note`)
);
--> statement-breakpoint
CREATE TABLE `hris_talent_acquisition_joining_details` (
	`id_hris_talent_acquisition_joining_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`id_appointment_letter` int NOT NULL,
	`candidate_id` int NOT NULL,
	`candidate_name` varchar(50) NOT NULL,
	`candidate_details` varchar(250) NOT NULL,
	`joining_date` date NOT NULL,
	`provation_period` varchar(50) NOT NULL,
	`joining_letter_scan_copy` varchar(50),
	`employee_file_reference_number` varchar(50),
	`corporate_email` varchar(50) NOT NULL,
	`corporate_sim` varchar(50) NOT NULL,
	`corporate_office_id` varchar(50) NOT NULL,
	`concern_super_visor_id` int NOT NULL,
	`concern_hr_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_talent_acquisition_joining_details_id_hris_talent_acquisition_joining_details` PRIMARY KEY(`id_hris_talent_acquisition_joining_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_talent_acquisition_joining_handover_documents_details` (
	`id_hris_talent_acquisition_joining_handover_documents_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`id_hris_talent_acquisition_joining_details` int NOT NULL,
	`id_hris_document_master` int NOT NULL,
	`handover_document_status` enum('Yes','No') NOT NULL DEFAULT 'No',
	`handover_document_image` varchar(50),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_talent_acquisition_joining_handover_documents_details_id_hris_talent_acquisition_joining_handover_documents_details` PRIMARY KEY(`id_hris_talent_acquisition_joining_handover_documents_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_talent_acquisition_joining_receive_documents_details` (
	`id_hris_talent_acquisition_joining_receive_documents_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`id_hris_talent_acquisition_joining_details` int NOT NULL,
	`id_hris_document_master` int NOT NULL,
	`receive_document_status` enum('Yes','No') NOT NULL DEFAULT 'No',
	`receive_document_image` varchar(50),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_talent_acquisition_joining_receive_documents_details_id_hris_talent_acquisition_joining_receive_documents_details` PRIMARY KEY(`id_hris_talent_acquisition_joining_receive_documents_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_thanas` (
	`id_thana` int AUTO_INCREMENT NOT NULL,
	`thana_name` varchar(20),
	`id_district` int NOT NULL DEFAULT 14,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_thanas_id_thana` PRIMARY KEY(`id_thana`)
);
--> statement-breakpoint
CREATE TABLE `hris_traits_master` (
	`id_hris_traits_master` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`traits_name` varchar(50) NOT NULL,
	`traits_description` varchar(1000) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_traits_master_id_hris_traits_master` PRIMARY KEY(`id_hris_traits_master`)
);
--> statement-breakpoint
CREATE TABLE `hris_traits_setup_details` (
	`id_hris_traits_setup_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int,
	`id_users` int NOT NULL,
	`id_designation` int NOT NULL,
	`id_hris_traits_master` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`evaluation_score_calculation_percentage` int NOT NULL,
	CONSTRAINT `hris_traits_setup_details_id_hris_traits_setup_details` PRIMARY KEY(`id_hris_traits_setup_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_universities` (
	`id_university` int AUTO_INCREMENT NOT NULL,
	`university_name` varchar(100) NOT NULL,
	CONSTRAINT `hris_universities_id_university` PRIMARY KEY(`id_university`)
);
--> statement-breakpoint
CREATE TABLE `hris_user_roles` (
	`id_user_role` int AUTO_INCREMENT NOT NULL,
	`id_user` int NOT NULL,
	`role_status` varchar(20),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`submitted_by` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hris_user_roles_id_user_role` PRIMARY KEY(`id_user_role`)
);
--> statement-breakpoint
CREATE TABLE `hris_utility_generation_attachments_details` (
	`id_hris_utility_generation_attachments_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_utility_generation_details` int NOT NULL,
	`attachment_name` varchar(45) NOT NULL,
	`attachment_image` varchar(45),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`original_file` varchar(100),
	CONSTRAINT `hris_utility_generation_attachments_details_id_hris_utility_generation_attachments_details` PRIMARY KEY(`id_hris_utility_generation_attachments_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_utility_generation_charge_details` (
	`id_hris_utility_generation_charge_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_utility_generation_details` int NOT NULL,
	`id_hris_utility_service` int NOT NULL,
	`utility_charge_amount` int NOT NULL,
	`utility_charge_year` int NOT NULL,
	`utility_charge_month` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_utility_generation_charge_details_id_hris_utility_generation_charge_details` PRIMARY KEY(`id_hris_utility_generation_charge_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_utility_generation_details` (
	`id_hris_utility_generation_details` int AUTO_INCREMENT NOT NULL,
	`work_resident_type` enum('Resident','Workstation') NOT NULL DEFAULT 'Workstation',
	`work_or_resident_id` int NOT NULL,
	`id_hris_rent_agreement_details` int NOT NULL,
	`utility_from_year` int NOT NULL,
	`utility_from_month` int NOT NULL,
	`utility_to_year` int NOT NULL,
	`utility_to_month` int NOT NULL,
	`total_utility_month` varchar(45) NOT NULL,
	`total_utility_amount` decimal(12,2) NOT NULL,
	`utility_cash_amount` decimal(12,2) NOT NULL,
	`utility_bank_amount` decimal(12,2) NOT NULL,
	`last_payment_date` date NOT NULL,
	`status` enum('Pending','Submitted','Checked','Certified','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`submitted_by` int NOT NULL,
	`checked_by` int NOT NULL,
	`certified_by` int NOT NULL,
	`approved_by` int NOT NULL,
	`ap_employee_id` int,
	`accountant_employee_id` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`id_voucher` int,
	`payment_status` enum('Pending','Partial','Completed') NOT NULL DEFAULT 'Pending',
	`denied_by` int,
	`denied_reason` text,
	CONSTRAINT `hris_utility_generation_details_id_hris_utility_generation_details` PRIMARY KEY(`id_hris_utility_generation_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_utility_generation_payment_details` (
	`id_hris_utility_generation_payment_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_utility_generation_details` int NOT NULL,
	`id_users` int NOT NULL,
	`id_ledgers` int NOT NULL,
	`payment_type` enum('cash','bank') NOT NULL DEFAULT 'cash',
	`voucher_date` date NOT NULL,
	`payment_amount` decimal(12,2) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_utility_generation_payment_details_id_hris_utility_generation_payment_details` PRIMARY KEY(`id_hris_utility_generation_payment_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_utility_service` (
	`id_hris_utility_service` int AUTO_INCREMENT NOT NULL,
	`utility_name` varchar(150) NOT NULL,
	`utility_details` text,
	`id_users` int NOT NULL,
	`date_creted` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `hris_utility_service_id_hris_utility_service` PRIMARY KEY(`id_hris_utility_service`)
);
--> statement-breakpoint
CREATE TABLE `hris_work_station_details` (
	`id_hris_work_station_details` int AUTO_INCREMENT NOT NULL,
	`work_station_id` int NOT NULL,
	`work_station_type` enum('Own','Rent') NOT NULL DEFAULT 'Own',
	`building_name` varchar(45) NOT NULL,
	`house_number` varchar(45) NOT NULL,
	`road_number` varchar(45) NOT NULL,
	`location` varchar(45) NOT NULL,
	`total_area_square_feet` decimal(12,2) NOT NULL,
	`total_room` int NOT NULL,
	`total_wash_room` int NOT NULL,
	`total_kitchen` int NOT NULL,
	`total_store_room` int NOT NULL,
	`total_corridor` int NOT NULL,
	`total_car_parking` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	`building_image` varchar(100),
	`original_name` varchar(100),
	CONSTRAINT `hris_work_station_details_id_hris_work_station_details` PRIMARY KEY(`id_hris_work_station_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_work_station_flat_details` (
	`id_hris_work_station_flat_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_work_station_floor_details` int NOT NULL,
	`flat_no` varchar(45) NOT NULL,
	`floor` int NOT NULL,
	`square_feet` decimal(12,2) NOT NULL,
	`room` int NOT NULL,
	`wash_room` int NOT NULL,
	`kitchen` int NOT NULL,
	`store_room` int NOT NULL,
	`corridor` int NOT NULL,
	`car_parking` enum('Yes','No') NOT NULL DEFAULT 'No',
	`floor_details_data` enum('NotUpdated','Updated') NOT NULL DEFAULT 'NotUpdated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_work_station_flat_details_id_hris_work_station_flat_details` PRIMARY KEY(`id_hris_work_station_flat_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_work_station_flat_room_details` (
	`id_hris_work_station_flat_room_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_work_station_flat_details` int NOT NULL,
	`room_no` varchar(45) NOT NULL,
	`room_type` enum('Single','Multiple','Hall Room','Prayer Room','Meeting Room','Dining Space') NOT NULL DEFAULT 'Multiple',
	`no_of_person` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_work_station_flat_room_details_id_hris_work_station_flat_room_details` PRIMARY KEY(`id_hris_work_station_flat_room_details`)
);
--> statement-breakpoint
CREATE TABLE `hris_work_station_floor_details` (
	`id_hris_work_station_floor_details` int AUTO_INCREMENT NOT NULL,
	`id_hris_work_station_details` int NOT NULL,
	`floor` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_users` int NOT NULL,
	CONSTRAINT `hris_work_station_floor_details_id_hris_work_station_floor_details` PRIMARY KEY(`id_hris_work_station_floor_details`)
);
--> statement-breakpoint
CREATE TABLE `inv_items` (
	`id_inv_items` int AUTO_INCREMENT NOT NULL,
	`item_code` varchar(80) NOT NULL,
	`item_code_type` enum('auto','manual') DEFAULT 'auto',
	`item_name` varchar(300),
	`item_description` text,
	`id_products` int,
	`id_categories` int NOT NULL,
	`id_size` int,
	`id_color` int,
	`id_specifications` int,
	`id_unit` int,
	`id_models` int,
	`origin` varchar(100),
	`weight` double,
	`part_number` varchar(100),
	`others` text,
	`remarks` text,
	`is_sales` tinyint NOT NULL DEFAULT 0,
	`is_purchase` enum('yes','no') NOT NULL DEFAULT 'no',
	`is_scrap` enum('yes','no') NOT NULL DEFAULT 'no',
	`is_fixed_asset` enum('yes','no') NOT NULL DEFAULT 'no',
	`is_non_stock` enum('yes','no') NOT NULL DEFAULT 'no',
	`is_manufactured` enum('yes','no') NOT NULL DEFAULT 'no',
	`is_raw_material` enum('yes','no') NOT NULL DEFAULT 'no',
	`is_shutter_material` enum('yes','no') NOT NULL DEFAULT 'no',
	`asset_class_id` int,
	`asset_type` enum('land','land_development'),
	`shutter_type` varchar(100),
	`id_secondary_unit` int,
	`active_status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`product_serial_no` varchar(100),
	`imei` varchar(100),
	`engin_capacity_cc` varchar(100),
	`chesiss_no` varchar(150),
	`reg_no` varchar(100),
	`capacity` varchar(100),
	`title_deed_no` varchar(100),
	`title_deed_name` varchar(150),
	`title_deed_date` date,
	`mouza_name` varchar(100),
	`address` text,
	`id_district` int,
	`area_in_decimal` double,
	`title_deed_value` decimal(17,2),
	`schedule_of_land` varchar(200),
	`reg_cost` decimal(17,2),
	`depreciation_cal_status` enum('yes','no'),
	`depreciation_method` varchar(100),
	`depreciation_rate` double,
	`id_default_image` int,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inv_items_id_inv_items` PRIMARY KEY(`id_inv_items`)
);
--> statement-breakpoint
CREATE TABLE `por_advance` (
	`id_por_advance` int AUTO_INCREMENT NOT NULL,
	`id_advance_template` int NOT NULL,
	`id_employee` int NOT NULL,
	`id_cur_sal_bus_unit` int,
	`amount` decimal(13,2) NOT NULL,
	`no_of_installment` int NOT NULL,
	`monthly_deduction_amnt` decimal(13,2) NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`reason_for_advance` text,
	`remark` text,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`voucher_no` int,
	`paid` decimal(13,2) DEFAULT '0.00',
	`due` decimal(13,2) DEFAULT '0.00',
	`id_cur_business_unit` int,
	`budget_connection` enum('yes','no') NOT NULL DEFAULT 'no',
	`approved_supervisor_id` int,
	`approved_hr_id` int,
	`status` enum('deleted_by_employee','pending_for_supervisor_approval','approved_by_supervisor','approved_by_hr','denied_by_supervisor','denied_by_hr') NOT NULL DEFAULT 'pending_for_supervisor_approval',
	`approved_amount` decimal(13,2),
	CONSTRAINT `por_advance_id_por_advance` PRIMARY KEY(`id_por_advance`)
);
--> statement-breakpoint
CREATE TABLE `por_app_fcm_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`fcm_token` varchar(255) NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_app_fcm_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `por_attendance` (
	`id_por_attendance` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date` date NOT NULL,
	`in_time` time NOT NULL,
	`out_time` time NOT NULL,
	`type` enum('Partial Info','Early Out','Late Present - Early Out','Late Present','Present') NOT NULL DEFAULT 'Partial Info',
	`status` enum('pending','deleted','acknowledged','approved','denied') NOT NULL DEFAULT 'pending',
	`reason` text NOT NULL,
	`date_created` timestamp(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`date_updated` timestamp(6) DEFAULT (CURRENT_TIMESTAMP(6)) ON UPDATE CURRENT_TIMESTAMP,
	`expended_time` bigint NOT NULL,
	`id_attendance` int NOT NULL,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	`line_supervisor_remark` text,
	`reporting_supervisor_remark` text,
	`hr_remark` text,
	`line_supervisor_id` int,
	`reporting_supervisor_id` int,
	`hr_id` int,
	CONSTRAINT `por_attendance_id_por_attendance` PRIMARY KEY(`id_por_attendance`)
);
--> statement-breakpoint
CREATE TABLE `por_attendance_history` (
	`id_por_attendance_history` int AUTO_INCREMENT NOT NULL,
	`id_por_attendance` int NOT NULL,
	`status` varchar(15) NOT NULL,
	`action_taken_by` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `por_attendance_history_id_por_attendance_history` PRIMARY KEY(`id_por_attendance_history`)
);
--> statement-breakpoint
CREATE TABLE `por_bulletin_board` (
	`id_por_bulletin` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`body` longtext NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` varchar(100) NOT NULL,
	`publish_from` date NOT NULL,
	`bulletin_tag` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_bulletin_board_id_por_bulletin` PRIMARY KEY(`id_por_bulletin`)
);
--> statement-breakpoint
CREATE TABLE `por_certificate_master` (
	`id_por_certificate_master` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`supervisor_approval` enum('Yes','No') NOT NULL DEFAULT 'Yes',
	`certificate_name` varchar(50) NOT NULL,
	`certificate_description` varchar(1000),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `por_certificate_master_id_por_certificate_master` PRIMARY KEY(`id_por_certificate_master`)
);
--> statement-breakpoint
CREATE TABLE `por_certificate_request` (
	`id_certificate_request` int AUTO_INCREMENT NOT NULL,
	`certificate_type` varchar(100) NOT NULL,
	`delivery_date` date NOT NULL,
	`reason` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`requested_by` int NOT NULL,
	`request_status` enum('Pending','Approved','Deleted','Denied','Done','Acknowledged','Pending For Report Supervisor') NOT NULL DEFAULT 'Pending',
	`date_from` date,
	`date_to` date,
	`noc_country` varchar(100),
	`action_taken_by` int,
	`id_por_certificate_master` int NOT NULL,
	`resignation_date` date,
	`original_file` varchar(250),
	`file` varchar(250),
	`is_attached` enum('yes','no') NOT NULL DEFAULT 'no',
	`denied_by` int,
	`denied_reason` text,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	CONSTRAINT `por_certificate_request_id_certificate_request` PRIMARY KEY(`id_certificate_request`)
);
--> statement-breakpoint
CREATE TABLE `por_compensation_benefit_details` (
	`id_por_compensation_benefit_details` int AUTO_INCREMENT NOT NULL,
	`id_users` int NOT NULL,
	`id_inter_view_setup_details` int NOT NULL,
	`existing_salary` int NOT NULL,
	`expected_salary` int NOT NULL,
	`negotiated_salary` int NOT NULL,
	`existing_mobile_bill` int,
	`expected_mobile_bill` int,
	`negotiated_mobile_bill` int,
	`existing_transport` varchar(500),
	`expected_transport` varchar(500),
	`negotiated_transport` varchar(500),
	`notice_period` varchar(500),
	`exiting_others` varchar(500),
	`expected_others` varchar(500),
	`negotiated_others` varchar(500),
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `por_compensation_benefit_details_id_por_compensation_benefit_details` PRIMARY KEY(`id_por_compensation_benefit_details`)
);
--> statement-breakpoint
CREATE TABLE `por_compensatory_leaves` (
	`id_por_compensatory_leave` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_business_unit` int NOT NULL,
	`date_of_duty` date,
	`cpl_date` date,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`type` enum('allowance','cpl','monthly') NOT NULL DEFAULT 'cpl',
	`status` enum('approved','pending','acknowledged','deleted','denied','done','pending for report supervisor') NOT NULL DEFAULT 'pending',
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`remark` varchar(255),
	`date_from` date,
	`date_to` date,
	`no_of_days` int,
	`replacement_person` int,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	`line_supervisor_id` int,
	`reporting_supervisor_id` int,
	`leave_hr_id` int,
	`bu_hr_id` int,
	`line_supervisor_remark` text,
	`reporting_supervisor_remark` text,
	`leave_hr_remark` text,
	`bu_hr_remark` text,
	CONSTRAINT `por_compensatory_leaves_id_por_compensatory_leave` PRIMARY KEY(`id_por_compensatory_leave`)
);
--> statement-breakpoint
CREATE TABLE `por_employee` (
	`por_employee_id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`phone_number` varchar(45) NOT NULL,
	`gender` varchar(45),
	`marital_status` varchar(45),
	`father_name` varchar(45) NOT NULL,
	`mother_name` varchar(45) NOT NULL,
	`present_address` text NOT NULL,
	`permanant_address` text NOT NULL,
	`email` varchar(100) NOT NULL,
	`nid` varchar(100) NOT NULL,
	`blood_group` varchar(45),
	`religion` varchar(45),
	`avatar` varchar(45),
	`dob` date,
	`publication_status` enum('activated','deactivated') DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`telephone_number` varchar(100) NOT NULL,
	`driving_liscence` varchar(200) NOT NULL,
	`spouse_name` varchar(100) NOT NULL,
	`passport` varchar(100) NOT NULL,
	`birth_certificate_number` varchar(100) NOT NULL,
	`emergency_phone_number` varchar(100) NOT NULL,
	`home_district` varchar(100),
	`status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Approved',
	`employee_custom_id` varchar(100) NOT NULL,
	`spouse_profession` varchar(100),
	`spouse_dob` varchar(100),
	`spouse_blood_group` varchar(100),
	`marraigeDate` varchar(100),
	`emergency_contact_name` varchar(100),
	`emergency_contact_relation` varchar(100),
	`tin_number` varchar(100),
	`tin_certificate` varchar(100),
	`first_name` varchar(100),
	`middle_name` varchar(100),
	`last_name` varchar(100),
	`full_name` varchar(100) NOT NULL,
	`tax_circle` varchar(100),
	`tax_zone` varchar(100),
	`tin_original_name` varchar(100),
	`id_hr_tax_area_type` int,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	CONSTRAINT `por_employee_por_employee_id` PRIMARY KEY(`por_employee_id`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_appraisal_details` (
	`id_por_employee_appraisal_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`employee_id` int NOT NULL,
	`appraisal_head_pm_pd_ceo_id` int NOT NULL,
	`id_performance_appraisal_setup` int,
	`appraisal_status` enum('Employee Submitted','Head/PM/PD/CEO Approved','Head/PM/PD/CEO Denied','Supervisor 1st Reviewed','Supervisor 2nd Reviewed','Supervisor 3rd Reviewed') NOT NULL DEFAULT 'Employee Submitted',
	`additional_appraisor_type` enum('Yes','No') NOT NULL,
	`additional_appraisor_id` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `por_employee_appraisal_details_id_por_employee_appraisal_details` PRIMARY KEY(`id_por_employee_appraisal_details`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_appraisal_target_details` (
	`id_por_employee_appraisal_target_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`id_por_employee_appraisal_details` int NOT NULL,
	`kras` varchar(2000) NOT NULL,
	`kpis` varchar(2000) NOT NULL,
	`present_state` varchar(1000) NOT NULL,
	`desired_state` varchar(1000) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `por_employee_appraisal_target_details_id_por_employee_appraisal_target_details` PRIMARY KEY(`id_por_employee_appraisal_target_details`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_car_ait` (
	`id_por_employee_car_ait` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`approver_id` int NOT NULL,
	`id_fiscal_year` int NOT NULL,
	`car_ait_amount` double(12,2) NOT NULL,
	`status` enum('pending','approved','deleted','denied','expired') NOT NULL DEFAULT 'pending',
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`car_ait_attachment` text,
	`car_ait_original_name` text,
	`reason` text,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	`ait_submission_date` date NOT NULL,
	CONSTRAINT `por_employee_car_ait_id_por_employee_car_ait` PRIMARY KEY(`id_por_employee_car_ait`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_hr` (
	`id_employee_hr` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_employee_hr_id_employee_hr` PRIMARY KEY(`id_employee_hr`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_hr_details` (
	`id_employee_hr_details` int AUTO_INCREMENT NOT NULL,
	`hr_id` int NOT NULL,
	`type` varchar(50) NOT NULL,
	`id_employee_hr` int NOT NULL,
	`status` enum('Pending','Deleted','Denied','Approved','Removed') NOT NULL DEFAULT 'Pending',
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` int,
	`id_users` int,
	CONSTRAINT `por_employee_hr_details_id_employee_hr_details` PRIMARY KEY(`id_employee_hr_details`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_review` (
	`id_por_employee_review` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`review_submitted_by` int NOT NULL,
	`review` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	`reminder_date` date NOT NULL,
	`reviewer_role` enum('Line Supervisor','Report Supervisor','Audit Team','Reviewer'),
	CONSTRAINT `por_employee_review_id_por_employee_review` PRIMARY KEY(`id_por_employee_review`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_review_reminder` (
	`id_employee_review_reminder` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`reviewer_id` int NOT NULL,
	`date` date NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'App',
	CONSTRAINT `por_employee_review_reminder_id_employee_review_reminder` PRIMARY KEY(`id_employee_review_reminder`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_supervisor` (
	`id_employee_supervisor` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`supervisor_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`status` varchar(100) NOT NULL,
	`requested_for` enum('Dept. Head','Reporting Supervisor') NOT NULL,
	CONSTRAINT `por_employee_supervisor_id_employee_supervisor` PRIMARY KEY(`id_employee_supervisor`)
);
--> statement-breakpoint
CREATE TABLE `por_employee_tin_info` (
	`id_por_employee_tin_info` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`tin_number` varchar(100) NOT NULL,
	`tax_circle` varchar(100) NOT NULL,
	`tax_zone` varchar(100) NOT NULL,
	`id_hr_tax_area_type` int NOT NULL,
	`tin_certificate` varchar(100) NOT NULL,
	`tin_original_name` text NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	CONSTRAINT `por_employee_tin_info_id_por_employee_tin_info` PRIMARY KEY(`id_por_employee_tin_info`)
);
--> statement-breakpoint
CREATE TABLE `por_it_goods_details` (
	`id_por_it_goods_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`employee_id` int NOT NULL,
	`designation_id` int NOT NULL,
	`id_department` int NOT NULL,
	`concern_it_person_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `por_it_goods_details_id_por_it_goods_details` PRIMARY KEY(`id_por_it_goods_details`)
);
--> statement-breakpoint
CREATE TABLE `por_it_goods_items_details` (
	`id_por_it_goods_items_details` int AUTO_INCREMENT NOT NULL,
	`id_project` int NOT NULL,
	`id_users` int NOT NULL,
	`id_por_it_goods_details` int NOT NULL,
	`id_inv_items` int NOT NULL,
	`item_quantity` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `por_it_goods_items_details_id_por_it_goods_items_details` PRIMARY KEY(`id_por_it_goods_items_details`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_dimensions` (
	`id_job_description_additional_dimension` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`dimension` text NOT NULL,
	`approval_status` enum('Approved','Pending','Denied') NOT NULL DEFAULT 'Pending',
	`old_dimension` text,
	CONSTRAINT `por_job_description_additional_dimensions_id_job_description_additional_dimension` PRIMARY KEY(`id_job_description_additional_dimension`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_dimensions_history` (
	`id_job_description_additional_dimension_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_dimension` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_dimensions_history_id_job_description_additional_dimension_history` PRIMARY KEY(`id_job_description_additional_dimension_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_experiences` (
	`id_job_description_additional_experience` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`experience_details` text NOT NULL,
	`approval_status` enum('Approved','Pending','Denied') NOT NULL DEFAULT 'Pending',
	`old_experience_details` text,
	CONSTRAINT `por_job_description_additional_experiences_id_job_description_additional_experience` PRIMARY KEY(`id_job_description_additional_experience`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_experiences_history` (
	`id_job_description_additional_experience_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_experience` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_experiences_history_id_job_description_additional_experience_history` PRIMARY KEY(`id_job_description_additional_experience_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_external_customers` (
	`id_job_description_additional_external_customer` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`external_customer` text NOT NULL,
	`approval_status` enum('Approved','Pending','Denied') NOT NULL DEFAULT 'Pending',
	`old_external_customer` text,
	CONSTRAINT `por_job_description_additional_external_customers_id_job_description_additional_external_customer` PRIMARY KEY(`id_job_description_additional_external_customer`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_external_customers_history` (
	`id_job_description_additional_external_customer_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_external_customer` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_external_customers_history_id_job_description_additional_external_customer_history` PRIMARY KEY(`id_job_description_additional_external_customer_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_internal_customers` (
	`id_job_description_additional_internal_customer` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`internal_customer` text NOT NULL,
	`approval_status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`old_internal_customer` text,
	CONSTRAINT `por_job_description_additional_internal_customers_id_job_description_additional_internal_customer` PRIMARY KEY(`id_job_description_additional_internal_customer`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_internal_customers_history` (
	`id_job_description_additional_internal_customer_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_internal_customer` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_internal_customers_history_id_job_description_additional_internal_customer_history` PRIMARY KEY(`id_job_description_additional_internal_customer_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_performing_areas` (
	`id_job_description_additional_performing_area` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`key_result_area` text NOT NULL,
	`measure_of_success` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`approval_status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`old_key_result_area` text,
	`old_measure_of_success` text,
	CONSTRAINT `por_job_description_additional_performing_areas_id_job_description_additional_performing_area` PRIMARY KEY(`id_job_description_additional_performing_area`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_performing_areas_history` (
	`id_job_description_additional_performing_area_history` int AUTO_INCREMENT NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`id_user` int NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_job_description_additional_performing_area` int NOT NULL,
	CONSTRAINT `por_job_description_additional_performing_areas_history_id_job_description_additional_performing_area_history` PRIMARY KEY(`id_job_description_additional_performing_area_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_qualifications` (
	`id_job_description_additional_qualification` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`qualification_details` text NOT NULL,
	`approval_status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`old_qualification_details` text,
	CONSTRAINT `por_job_description_additional_qualifications_id_job_description_additional_qualification` PRIMARY KEY(`id_job_description_additional_qualification`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_qualifications_history` (
	`id_job_description_additional_qualification_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_qualification` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_qualifications_history_id_job_description_additional_qualification_history` PRIMARY KEY(`id_job_description_additional_qualification_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_quality_parameters` (
	`id_job_description_additional_quality_parameter` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`quality_parameter` text NOT NULL,
	`approval_status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`old_quality_parameter` text,
	CONSTRAINT `por_job_description_additional_quality_parameters_id_job_description_additional_quality_parameter` PRIMARY KEY(`id_job_description_additional_quality_parameter`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_quality_parameters_history` (
	`id_job_description_additional_quality_parameter_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_quality_parameter` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_quality_parameters_history_id_job_description_additional_quality_parameter_history` PRIMARY KEY(`id_job_description_additional_quality_parameter_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_soft_skills` (
	`id_job_description_additional_soft_skill` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`soft_skill` text NOT NULL,
	`approval_status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`old_soft_skill` text,
	CONSTRAINT `por_job_description_additional_soft_skills_id_job_description_additional_soft_skill` PRIMARY KEY(`id_job_description_additional_soft_skill`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_soft_skills_history` (
	`id_job_description_additional_soft_skill_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_soft_skill` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_soft_skills_history_id_job_description_additional_soft_skill_history` PRIMARY KEY(`id_job_description_additional_soft_skill_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_special_requirements` (
	`id_job_description_additional_special_requirement` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`special_requirement` text NOT NULL,
	`approval_status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`old_special_requirement` text,
	CONSTRAINT `por_job_description_additional_special_requirements_id_job_description_additional_special_requirement` PRIMARY KEY(`id_job_description_additional_special_requirement`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_special_requirements_history` (
	`id_job_description_additional_special_requirement_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_special_requirement` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_special_requirements_history_id_job_description_additional_special_requirement_history` PRIMARY KEY(`id_job_description_additional_special_requirement_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_tech_skills` (
	`id_job_description_additional_tech_skill` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`technical_skill` text NOT NULL,
	`approval_status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Pending',
	`old_technical_skill` text,
	CONSTRAINT `por_job_description_additional_tech_skills_id_job_description_additional_tech_skill` PRIMARY KEY(`id_job_description_additional_tech_skill`)
);
--> statement-breakpoint
CREATE TABLE `por_job_description_additional_tech_skills_history` (
	`id_job_description_additional_tech_skill_history` int AUTO_INCREMENT NOT NULL,
	`id_job_description_additional_tech_skill` int NOT NULL,
	`previous_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action` enum('edit','delete') NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_job_description_additional_tech_skills_history_id_job_description_additional_tech_skill_history` PRIMARY KEY(`id_job_description_additional_tech_skill_history`)
);
--> statement-breakpoint
CREATE TABLE `por_job_requisition_candidate_appraisals` (
	`id_por_job_requisition_candidate_appraisal` int AUTO_INCREMENT NOT NULL,
	`id_por_job_requisition_candidate` int NOT NULL,
	`id_appraiser` int NOT NULL,
	`rating` enum('Excellent','Good','Average','Below Average','Poor') NOT NULL,
	`comment` text,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`interview_date` date NOT NULL,
	CONSTRAINT `por_job_requisition_candidate_appraisals_id_por_job_requisition_candidate_appraisal` PRIMARY KEY(`id_por_job_requisition_candidate_appraisal`)
);
--> statement-breakpoint
CREATE TABLE `por_job_requisition_candidates` (
	`id_por_job_requisition_candidates` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(100),
	`phone_number` varchar(20) NOT NULL,
	`id_por_job_requisition_details` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`total_experience` int,
	`attachment` varchar(100) NOT NULL,
	`highest_education` int,
	`education_institute` int,
	`original_name` varchar(100) NOT NULL,
	`appraisal_status` enum('Incomplete','Done') NOT NULL DEFAULT 'Incomplete',
	`joining_status` enum('Accept Offer Letter','Reject Offer Letter','Pending','Joined','Not Joined','Potential Candidate','Rejected','Missing In Interview') NOT NULL DEFAULT 'Pending',
	CONSTRAINT `por_job_requisition_candidates_id_por_job_requisition_candidates` PRIMARY KEY(`id_por_job_requisition_candidates`)
);
--> statement-breakpoint
CREATE TABLE `por_job_requisition_details` (
	`id_por_job_requisition_details` int AUTO_INCREMENT NOT NULL,
	`id_por_job_requisitions` int NOT NULL,
	`id_designation` int NOT NULL,
	`start_date` date NOT NULL,
	`no_of_recruit` int NOT NULL,
	`id_department` int NOT NULL,
	`id_employee_status` int NOT NULL,
	`position_justification` text,
	`job_responsibilities` text,
	`approval_status` enum('Pending For Re-Approval','Re-Approval Denied','Pending For Project Head Approval','Denied by Project Head','Pending For Project Control Recommendation','Denied by Project Control','Pending For Divisional Hr Acknowledgement','Pending For Recruitment Hr Approval','Approved by Recruitment Hr','Deleted by Requester'),
	`recruitment_status` enum('Pending','Partial','Completed','Closed','Action Required') NOT NULL DEFAULT 'Pending',
	`year` int NOT NULL,
	`month` int NOT NULL,
	`send_to` enum('Project Control','Requester','Divisional Hr','Recruitment Hr','Project Head','Business Unit Hr'),
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deny_reason` text,
	`attachment` varchar(255),
	`original_name` varchar(255),
	`closing_remark` varchar(255),
	`management_type` enum('Management','Non Management','Max Worker') NOT NULL,
	`experience` varchar(20),
	`education` int,
	`min_salary` int NOT NULL,
	`max_salary` int NOT NULL,
	`id_divisional_hr` int,
	`id_project_control` int,
	`id_recruitment_hr` int,
	`duration` varchar(5),
	`no_of_recruit_recommended` int NOT NULL,
	`requisition_type` enum('new','replace') NOT NULL DEFAULT 'new',
	`id_project_head` int,
	`remarks_by_project_head` varchar(255),
	`remarks_by_recruitment_hr` varchar(255),
	`remarks_by_divisional_hr` varchar(255),
	`remarks_by_project_control` varchar(255),
	`replace_employees` varchar(255),
	`recruitment_type` enum('internal','external') NOT NULL DEFAULT 'external',
	CONSTRAINT `por_job_requisition_details_id_por_job_requisition_details` PRIMARY KEY(`id_por_job_requisition_details`)
);
--> statement-breakpoint
CREATE TABLE `por_job_requisition_internal_employees` (
	`id_job_requisition_internal_employees` int AUTO_INCREMENT NOT NULL,
	`id_job_requisition_details` int NOT NULL,
	`employee_id` int NOT NULL,
	`created_by` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `por_job_requisition_internal_employees_id_job_requisition_internal_employees` PRIMARY KEY(`id_job_requisition_internal_employees`)
);
--> statement-breakpoint
CREATE TABLE `por_job_requisition_mail_notifiers` (
	`id_por_job_requisition_mail_notifiers` int AUTO_INCREMENT NOT NULL,
	`id_por_job_requisitions` int NOT NULL,
	`employee_id` int NOT NULL,
	CONSTRAINT `por_job_requisition_mail_notifiers_id_por_job_requisition_mail_notifiers` PRIMARY KEY(`id_por_job_requisition_mail_notifiers`)
);
--> statement-breakpoint
CREATE TABLE `por_job_requisition_replace_employees` (
	`id_job_requisition_replace_employees` int AUTO_INCREMENT NOT NULL,
	`id_job_requisition_details` int NOT NULL,
	`employee_id` int NOT NULL,
	CONSTRAINT `por_job_requisition_replace_employees_id_job_requisition_replace_employees` PRIMARY KEY(`id_job_requisition_replace_employees`)
);
--> statement-breakpoint
CREATE TABLE `por_job_requisitions` (
	`id_por_job_requisition` int AUTO_INCREMENT NOT NULL,
	`id_business_unit` int NOT NULL,
	`status` enum('Pending','Partial','Completed','Closed') NOT NULL DEFAULT 'Pending',
	`submitted_by` int NOT NULL,
	`updated_by` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	CONSTRAINT `por_job_requisitions_id_por_job_requisition` PRIMARY KEY(`id_por_job_requisition`)
);
--> statement-breakpoint
CREATE TABLE `por_job_requisitions_history` (
	`id_por_job_requisitions_history` int AUTO_INCREMENT NOT NULL,
	`id_por_job_requisition_details` int NOT NULL,
	`old_data` text NOT NULL,
	`new_data` text NOT NULL,
	`action_taken_by` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`remarks` text,
	CONSTRAINT `por_job_requisitions_history_id_por_job_requisitions_history` PRIMARY KEY(`id_por_job_requisitions_history`)
);
--> statement-breakpoint
CREATE TABLE `por_leave` (
	`id_por_leave` int AUTO_INCREMENT NOT NULL,
	`id_employee` int NOT NULL,
	`id_project` int NOT NULL,
	`id_department` int,
	`id_leave_type` int NOT NULL,
	`id_leave_policy` int,
	`date_from` date NOT NULL,
	`date_to` date NOT NULL,
	`no_of_leave_day` int,
	`weekend_holiday_inside` int,
	`address_during_leave` text,
	`phone_during_leave` varchar(20),
	`file` varchar(250),
	`original_file` varchar(250),
	`reason` text,
	`reason_details` varchar(256),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int,
	`remaining_leave` int,
	`reporting_supervisor_id` int,
	`line_supervisor_id` int,
	`hr_id` int,
	`status` enum('pending','approved','done','deleted','recommended','acknowledged','denied','pending for report supervisor') DEFAULT 'pending',
	`remarks` varchar(255),
	`denied_by` int,
	`denied_reason` text,
	`replacement_person` int,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	`line_supervisor_remark` text,
	`reporting_supervisor_remark` text,
	`leave_hr_remark` text,
	`bu_hr_remark` text,
	`leave_hr_id` int,
	CONSTRAINT `por_leave_id_por_leave` PRIMARY KEY(`id_por_leave`)
);
--> statement-breakpoint
CREATE TABLE `por_leave_details` (
	`id_por_leave_details` int AUTO_INCREMENT NOT NULL,
	`id_por_leave` int NOT NULL,
	`leave_category` enum('with_pay','without_pay') NOT NULL,
	`approved_days` int,
	`deduction_amount` double(12,2) NOT NULL DEFAULT 0,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`leave_date` date NOT NULL,
	CONSTRAINT `por_leave_details_id_por_leave_details` PRIMARY KEY(`id_por_leave_details`)
);
--> statement-breakpoint
CREATE TABLE `por_leave_notification_receiver` (
	`id_por_leave_notification_receiver` int AUTO_INCREMENT NOT NULL,
	`receiver_id` int,
	`id_por_leave` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `por_leave_notification_receiver_id_por_leave_notification_receiver` PRIMARY KEY(`id_por_leave_notification_receiver`)
);
--> statement-breakpoint
CREATE TABLE `por_log` (
	`id_por_log` int AUTO_INCREMENT NOT NULL,
	`url` varchar(200),
	`get_data` text,
	`post_data` text,
	`header_data` text,
	`id_employee` int,
	`ip_address` varchar(45),
	`user_agent` varchar(200),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`performance_time` float,
	`update_date` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_log_id_por_log` PRIMARY KEY(`id_por_log`)
);
--> statement-breakpoint
CREATE TABLE `por_outstations` (
	`id_por_outstation` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`type` enum('Site Visit','Official Visit','Work From Home','Replaced Offday') NOT NULL,
	`location` varchar(255) NOT NULL,
	`date_from` date NOT NULL,
	`date_to` date NOT NULL,
	`no_of_days` int NOT NULL,
	`reason` text NOT NULL,
	`status` enum('pending','acknowledged','approved','deleted','denied','pending for report supervisor') NOT NULL DEFAULT 'pending',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`is_edited` enum('yes','no') NOT NULL DEFAULT 'no',
	`remarks` text,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	`line_supervisor_id` int,
	`reporting_supervisor_id` int,
	`hr_id` int,
	`line_supervisor_remark` text,
	`reporting_supervisor_remark` text,
	`hr_remark` text,
	CONSTRAINT `por_outstations_id_por_outstation` PRIMARY KEY(`id_por_outstation`)
);
--> statement-breakpoint
CREATE TABLE `por_performance_appraise` (
	`id_performance_appraise` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`id_performance_appraisal_setup` int NOT NULL,
	`id_hris_pms_score_master` int NOT NULL,
	`overall_score` decimal(5,2) DEFAULT '0.00',
	`completed_appraise` int,
	`required_appraise` int,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`recommendation_status` enum('Pending','Submitted','Approved') NOT NULL DEFAULT 'Pending',
	`number_of_appraise` int NOT NULL,
	`approval_status` enum('Pending','Approved') NOT NULL DEFAULT 'Pending',
	CONSTRAINT `por_performance_appraise_id_performance_appraise` PRIMARY KEY(`id_performance_appraise`)
);
--> statement-breakpoint
CREATE TABLE `por_performance_appraise_achievements` (
	`id_performance_appraise_achievement` int AUTO_INCREMENT NOT NULL,
	`id_performance_appraise` int NOT NULL,
	`kpi` varchar(256) NOT NULL,
	`achived_score` decimal(12,2),
	`comments` varchar(1000),
	`achievement_percentage` varchar(256),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `por_performance_appraise_achievements_id_performance_appraise_achievement` PRIMARY KEY(`id_performance_appraise_achievement`)
);
--> statement-breakpoint
CREATE TABLE `por_performance_appraise_details` (
	`id_performance_appraise_details` int AUTO_INCREMENT NOT NULL,
	`total_quantify_achievement` int NOT NULL,
	`total_quantify_trait` int NOT NULL,
	`total_achievement_scores` int NOT NULL,
	`total_trait_points` int NOT NULL,
	`calculated_trait_points` float NOT NULL,
	`calculated_achievement_scores` float NOT NULL,
	`id_performance_appraisal_date_range` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`id_appraiser` int NOT NULL,
	`overall_score_per_appraise` float,
	`id_performance_appraise` int,
	`calculation_percentage` int NOT NULL,
	`appraisal_no` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_performance_appraise_details_id_performance_appraise_details` PRIMARY KEY(`id_performance_appraise_details`)
);
--> statement-breakpoint
CREATE TABLE `por_performance_appraise_traits` (
	`id_performance_appraise_trait` int AUTO_INCREMENT NOT NULL,
	`id_performance_appraise` int NOT NULL,
	`id_hris_traits_master` int NOT NULL,
	`traits_point` int,
	`comments` text,
	CONSTRAINT `por_performance_appraise_traits_id_performance_appraise_trait` PRIMARY KEY(`id_performance_appraise_trait`)
);
--> statement-breakpoint
CREATE TABLE `por_pms_employee_recommendation_details` (
	`id_pms_employee_recommendation_details` int AUTO_INCREMENT NOT NULL,
	`id_pms_employee_recommendations` int NOT NULL,
	`id_pms_recommendation_details` int NOT NULL,
	`specification` varchar(150) NOT NULL,
	`remarks` varchar(150),
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_user` int NOT NULL,
	CONSTRAINT `por_pms_employee_recommendation_details_id_pms_employee_recommendation_details` PRIMARY KEY(`id_pms_employee_recommendation_details`)
);
--> statement-breakpoint
CREATE TABLE `por_pms_employee_recommendations` (
	`id_pms_employee_recommendations` int AUTO_INCREMENT NOT NULL,
	`id_pms_recommendation_master` int NOT NULL,
	`id_performance_appraise` int NOT NULL,
	`id_user` int NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_pms_employee_recommendations_id_pms_employee_recommendations` PRIMARY KEY(`id_pms_employee_recommendations`)
);
--> statement-breakpoint
CREATE TABLE `por_present_offdays` (
	`id_por_present_offday` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`date` date NOT NULL,
	`status` enum('Pending','Approved','Acknowledged') NOT NULL DEFAULT 'Pending',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_present_offdays_id_por_present_offday` PRIMARY KEY(`id_por_present_offday`)
);
--> statement-breakpoint
CREATE TABLE `por_requests_update_history` (
	`id_por_requests_update_history` int AUTO_INCREMENT NOT NULL,
	`id_request` int NOT NULL,
	`request_table` varchar(50) NOT NULL,
	`request_type` enum('regular-leave','certificate','outstation','compensatory-leave','monthly-leave','vehicle','late-attendance','rent-generation','utility-generation','car-ait','travel-advance') NOT NULL,
	`updated_status` varchar(30) NOT NULL,
	`updated_by` int NOT NULL,
	`old_status` varchar(30) NOT NULL,
	`old_data` text NOT NULL,
	`new_data` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`remarks` text,
	`employee_id` int NOT NULL,
	CONSTRAINT `por_requests_update_history_id_por_requests_update_history` PRIMARY KEY(`id_por_requests_update_history`)
);
--> statement-breakpoint
CREATE TABLE `por_roles` (
	`id_por_roles` int AUTO_INCREMENT NOT NULL,
	`role` enum('Recruitment HR','Divisional HR','Business Unit HR','Leave HR','Certificate HR','Project Control','Director/CEO','COO/CHRO','Income Tax','Audit Team','VMS Approver','Reviewer','Project Head') NOT NULL,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_roles_id_por_roles` PRIMARY KEY(`id_por_roles`)
);
--> statement-breakpoint
CREATE TABLE `por_roles_assign` (
	`id_por_role_assign` int AUTO_INCREMENT NOT NULL,
	`id_por_roles` int NOT NULL,
	`employee_id` int NOT NULL,
	`id_projects` int,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `por_roles_assign_id_por_role_assign` PRIMARY KEY(`id_por_role_assign`)
);
--> statement-breakpoint
CREATE TABLE `por_travel_advance_request` (
	`id_por_travel_advance_request` int AUTO_INCREMENT NOT NULL,
	`visiting_place` varchar(255) NOT NULL,
	`purpose_of_visit` text NOT NULL,
	`date_from` date NOT NULL,
	`date_to` date NOT NULL,
	`advance_amount` decimal(12,2) NOT NULL,
	`central_accountant` int NOT NULL,
	`cashier` int NOT NULL,
	`travel_type` enum('Single','Group') NOT NULL,
	`transport_mode` varchar(20) NOT NULL,
	`night_accomodation` varchar(50) NOT NULL,
	`remarks` text,
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`status` enum('Approved','Deleted','Denied','Pending') NOT NULL DEFAULT 'Pending',
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	CONSTRAINT `por_travel_advance_request_id_por_travel_advance_request` PRIMARY KEY(`id_por_travel_advance_request`)
);
--> statement-breakpoint
CREATE TABLE `por_travel_bill_request` (
	`id_por_travel_bill_request` int AUTO_INCREMENT NOT NULL,
	`remarks` text,
	`status` enum('Pending','Denied','Deleted','Drafted','Approved','Acknowledged') NOT NULL DEFAULT 'Drafted',
	`employee_id` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deny_reason` text,
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	CONSTRAINT `por_travel_bill_request_id_por_travel_bill_request` PRIMARY KEY(`id_por_travel_bill_request`)
);
--> statement-breakpoint
CREATE TABLE `por_travel_bill_request_details` (
	`id_por_travel_bill_request_details` int AUTO_INCREMENT NOT NULL,
	`id_por_travel_bill_request` int NOT NULL,
	`date` date NOT NULL,
	`id_expense_type` int NOT NULL,
	`description` text,
	`amount` int NOT NULL,
	`file_name` varchar(100) NOT NULL,
	`original_name` varchar(100) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`publication_status` enum('activated','deactivated') NOT NULL DEFAULT 'activated',
	CONSTRAINT `por_travel_bill_request_details_id_por_travel_bill_request_details` PRIMARY KEY(`id_por_travel_bill_request_details`)
);
--> statement-breakpoint
CREATE TABLE `por_travel_bill_request_history` (
	`id_por_travel_bill_request_history` int AUTO_INCREMENT NOT NULL,
	`id_por_travel_bill_request_details` int NOT NULL,
	`old_data` text NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `por_travel_bill_request_history_id_por_travel_bill_request_history` PRIMARY KEY(`id_por_travel_bill_request_history`)
);
--> statement-breakpoint
CREATE TABLE `por_travel_group_members` (
	`id_por_travel_group_member` int AUTO_INCREMENT NOT NULL,
	`id_por_travel_advance_request` int NOT NULL,
	`member_id` int NOT NULL,
	CONSTRAINT `por_travel_group_members_id_por_travel_group_member` PRIMARY KEY(`id_por_travel_group_member`)
);
--> statement-breakpoint
CREATE TABLE `por_vehicle_request` (
	`id_por_vehicle_request` int AUTO_INCREMENT NOT NULL,
	`date_from` date NOT NULL,
	`date_to` date NOT NULL,
	`destination_from` varchar(255) NOT NULL,
	`destination_to` varchar(255) NOT NULL,
	`departure_time` time NOT NULL,
	`id_vehicle_type` int NOT NULL,
	`reason` text NOT NULL,
	`special_note` text,
	`status` enum('pending','approved','deleted','acknowledged','denied') NOT NULL DEFAULT 'pending',
	`id_user` int NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`assigned_vehicle` int,
	`deny_reason` varchar(255),
	`request_through` enum('Web','App') NOT NULL DEFAULT 'Web',
	`id_vms_driver` int,
	`driver_phone_number` varchar(15),
	`approved_by` int,
	CONSTRAINT `por_vehicle_request_id_por_vehicle_request` PRIMARY KEY(`id_por_vehicle_request`)
);
--> statement-breakpoint
CREATE TABLE `por_vehicle_request_email_notifiers` (
	`id_por_vehicle_request_email_notifiers` int AUTO_INCREMENT NOT NULL,
	`id_por_vehicle_request` int NOT NULL,
	`employee_id` int NOT NULL,
	CONSTRAINT `por_vehicle_request_email_notifiers_id_por_vehicle_request_email_notifiers` PRIMARY KEY(`id_por_vehicle_request_email_notifiers`)
);
--> statement-breakpoint
CREATE TABLE `por_vehicle_request_passengers` (
	`id_por_vehicle_request_passengers` int AUTO_INCREMENT NOT NULL,
	`id_por_vehicle_request` int NOT NULL,
	`employee_id` int NOT NULL,
	CONSTRAINT `por_vehicle_request_passengers_id_por_vehicle_request_passengers` PRIMARY KEY(`id_por_vehicle_request_passengers`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id_projects` int AUTO_INCREMENT NOT NULL,
	`project_id` varchar(30),
	`payroll_companies_id` int,
	`tax_companies_id` int,
	`project_type` varchar(45),
	`project_name` varchar(100) NOT NULL,
	`abbreviation_name` varchar(100),
	`project_location` varchar(200),
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`remarks` text,
	`details` text,
	`status` enum('tender_submitted','tender_approved','running','completed','closed','hidden'),
	`id_companies` int NOT NULL,
	`contact_person_name` varchar(100),
	`contact_person_no` varchar(45),
	`budget_type` enum('recurring','fixed') DEFAULT 'fixed',
	`is_project` enum('yes','no'),
	`is_offline_project` enum('yes','no') DEFAULT 'no',
	`leave_calculation_calendar_type` enum('fiscal-year','calendar-year') NOT NULL DEFAULT 'fiscal-year',
	`block_access` tinyint(1) NOT NULL DEFAULT 0,
	`parent_id` int,
	CONSTRAINT `projects_id_projects` PRIMARY KEY(`id_projects`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id_users` int AUTO_INCREMENT NOT NULL,
	`employee_id` int,
	`dob` date NOT NULL,
	`username` varchar(45) NOT NULL,
	`password` varchar(45) NOT NULL,
	`email` varchar(100) NOT NULL,
	`id_status` tinyint NOT NULL DEFAULT 0,
	`create_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`user_role` enum('creator','approver'),
	CONSTRAINT `users_id_users` PRIMARY KEY(`id_users`),
	CONSTRAINT `email` UNIQUE(`email`,`username`),
	CONSTRAINT `employee_id` UNIQUE(`employee_id`)
);
--> statement-breakpoint
ALTER TABLE `acc_voucher` ADD CONSTRAINT `acc_voucher_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `companies`(`id_companies`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `acc_voucher` ADD CONSTRAINT `acc_voucher_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `acc_voucher` ADD CONSTRAINT `acc_voucher_ibfk_3` FOREIGN KEY (`id_task`) REFERENCES `acc_auto_voucher_setup`(`id_auto_voucher_setup`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cost_center` ADD CONSTRAINT `fk_cost_center_projects1` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_absent_entry` ADD CONSTRAINT `hr_absent_entry_ibfk_1` FOREIGN KEY (`id_hr_absent_entry_file_upload`) REFERENCES `hr_absent_entry_file_upload`(`id_hr_absent_entry_file_upload`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_absent_entry` ADD CONSTRAINT `hr_absent_entry_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_absent_setup` ADD CONSTRAINT `hr_absent_setup_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_absent_setup` ADD CONSTRAINT `hr_absent_setup_ibfk_2` FOREIGN KEY (`hr_absent_template_id`) REFERENCES `hr_absent_template`(`hr_absent_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_absent_setup` ADD CONSTRAINT `hr_absent_setup_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_absent_setup` ADD CONSTRAINT `hr_absent_setup_ibfk_4` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_absent_template` ADD CONSTRAINT `hr_absent_template_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_accounting_setup` ADD CONSTRAINT `hr_accounting_setup_ibfk_1` FOREIGN KEY (`id_ledger`) REFERENCES `acc_ledgers`(`id_ledgers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_accounting_setup` ADD CONSTRAINT `hr_accounting_setup_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance` ADD CONSTRAINT `hr_advance_ibfk_1` FOREIGN KEY (`id_advance_template`) REFERENCES `hr_advance_payment_template`(`id_advance_payment_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance` ADD CONSTRAINT `hr_advance_ibfk_2` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance` ADD CONSTRAINT `hr_advance_ibfk_3` FOREIGN KEY (`id_cur_sal_bus_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance` ADD CONSTRAINT `hr_advance_ibfk_4` FOREIGN KEY (`id_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance` ADD CONSTRAINT `hr_advance_ibfk_5` FOREIGN KEY (`id_por_advance`) REFERENCES `por_advance`(`id_por_advance`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance` ADD CONSTRAINT `hr_advance_ibfk_6` FOREIGN KEY (`id_cur_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance_payment_history` ADD CONSTRAINT `hr_advance_payment_history_ibfk_1` FOREIGN KEY (`id_advance`) REFERENCES `hr_advance`(`id_advance`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance_payment_history` ADD CONSTRAINT `hr_advance_payment_history_ibfk_2` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance_payment_history` ADD CONSTRAINT `hr_advance_payment_history_ibfk_3` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance_payment_history` ADD CONSTRAINT `hr_advance_payment_history_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_advance_payment_template` ADD CONSTRAINT `hr_advance_payment_template_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance` ADD CONSTRAINT `hr_attendance_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance` ADD CONSTRAINT `hr_attendance_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance` ADD CONSTRAINT `hr_attendance_ibfk_4` FOREIGN KEY (`id_user_operator`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_calculation_info` ADD CONSTRAINT `hr_attendance_calculation_info_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_calculation_info` ADD CONSTRAINT `hr_attendance_calculation_info_ibfk_2` FOREIGN KEY (`id_calendar_setup`) REFERENCES `hr_calendar_setup`(`id_calendar_setup`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_calculation_info` ADD CONSTRAINT `hr_attendance_calculation_info_ibfk_3` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_calendar_file_import` ADD CONSTRAINT `hr_attendance_calendar_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_calendar_file_import` ADD CONSTRAINT `hr_attendance_calendar_file_import_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_entry` ADD CONSTRAINT `hr_attendance_entry_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_entry` ADD CONSTRAINT `hr_attendance_entry_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_entry_error` ADD CONSTRAINT `hr_attendance_entry_error_ibfk_1` FOREIGN KEY (`id_hr_attendance_file_import`) REFERENCES `hr_attendance_file_import`(`id_hr_attendance_file_import`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_entry_error` ADD CONSTRAINT `hr_attendance_entry_error_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_file_import` ADD CONSTRAINT `hr_attendance_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_file_import_errors` ADD CONSTRAINT `hr_attendance_file_import_errors_ibfk_1` FOREIGN KEY (`hr_attendance_file_import_id`) REFERENCES `hr_attendance_file_import`(`id_hr_attendance_file_import`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_file_import_errors` ADD CONSTRAINT `hr_attendance_file_import_errors_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_monthly` ADD CONSTRAINT `hr_attendance_monthly_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_monthly` ADD CONSTRAINT `hr_attendance_monthly_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_monthly` ADD CONSTRAINT `hr_attendance_monthly_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_attendance_update_history` ADD CONSTRAINT `hr_attendance_update_history_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bank_branch_master` ADD CONSTRAINT `hr_bank_branch_master_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bank_master` ADD CONSTRAINT `hr_bank_master_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bonus_setup` ADD CONSTRAINT `hr_bonus_setup_ibfk_1` FOREIGN KEY (`bonus_type_id`) REFERENCES `hr_earning_heads`(`earning_heads_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bonus_setup` ADD CONSTRAINT `hr_bonus_setup_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bonus_setup` ADD CONSTRAINT `hr_bonus_setup_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bonus_setup` ADD CONSTRAINT `hr_bonus_setup_ibfk_4` FOREIGN KEY (`id_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bonus_setup` ADD CONSTRAINT `hr_bonus_setup_ibfk_5` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bonus_setup_history` ADD CONSTRAINT `hr_bonus_setup_history_ibfk_1` FOREIGN KEY (`bonus_setup_id`) REFERENCES `hr_bonus_setup`(`bonus_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_bonus_setup_history` ADD CONSTRAINT `hr_bonus_setup_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_business_unit` ADD CONSTRAINT `hr_business_unit_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `hr_company_setup`(`company_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_business_unit` ADD CONSTRAINT `hr_business_unit_ibfk_2` FOREIGN KEY (`id_city`) REFERENCES `hr_city`(`id_city`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_business_unit` ADD CONSTRAINT `hr_business_unit_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_calendar_setup` ADD CONSTRAINT `hr_calendar_setup_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_city` ADD CONSTRAINT `hr_city_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_company_setup` ADD CONSTRAINT `hr_company_setup_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_company_setup` ADD CONSTRAINT `hr_company_setup_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `hr_group_setup`(`group_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_compensatory_leave` ADD CONSTRAINT `hr_compensatory_leave_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_compensatory_leave` ADD CONSTRAINT `hr_compensatory_leave_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_compensatory_leave` ADD CONSTRAINT `hr_compensatory_leave_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_contact_employee_details` ADD CONSTRAINT `hr_contact_employee_details_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_contact_employee_details` ADD CONSTRAINT `hr_contact_employee_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_contact_employee_details` ADD CONSTRAINT `hr_contact_employee_details_ibfk_3` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_deduction_heads` ADD CONSTRAINT `hr_deduction_heads_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_deduction_heads_history` ADD CONSTRAINT `hr_deduction_heads_history_ibfk_1` FOREIGN KEY (`deduction_heads_id`) REFERENCES `hr_deduction_heads`(`deduction_heads_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_deduction_heads_history` ADD CONSTRAINT `hr_deduction_heads_history_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_denomination` ADD CONSTRAINT `hr_denomination_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_departments` ADD CONSTRAINT `hr_departments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_designation_master` ADD CONSTRAINT `hr_designation_master_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_earning_heads_history` ADD CONSTRAINT `hr_earning_heads_history_ibfk_1` FOREIGN KEY (`earning_heads_id`) REFERENCES `hr_earning_heads`(`earning_heads_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_earning_heads_history` ADD CONSTRAINT `hr_earning_heads_history_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_education` ADD CONSTRAINT `hr_education_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_education` ADD CONSTRAINT `hr_education_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_education_concentrations` ADD CONSTRAINT `hr_education_concentrations_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_education_levels` ADD CONSTRAINT `hr_education_levels_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_bonus_info` ADD CONSTRAINT `hr_employee_bonus_info_ibfk_1` FOREIGN KEY (`bonus_setup_id`) REFERENCES `hr_bonus_setup`(`bonus_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_bonus_info` ADD CONSTRAINT `hr_employee_bonus_info_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_bonus_info` ADD CONSTRAINT `hr_employee_bonus_info_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_bonus_info_history` ADD CONSTRAINT `hr_employee_bonus_info_history_ibfk_1` FOREIGN KEY (`bonus_setup_id`) REFERENCES `hr_bonus_setup`(`bonus_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_bonus_info_individual_history` ADD CONSTRAINT `hr_employee_bonus_info_individual_history_ibfk_1` FOREIGN KEY (`employee_bonus_info_id`) REFERENCES `hr_employee_bonus_info`(`employee_bonus_info_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_bonus_info_individual_history` ADD CONSTRAINT `hr_employee_bonus_info_individual_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_cost_center_setup` ADD CONSTRAINT `hr_employee_cost_center_setup_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_cost_center_setup` ADD CONSTRAINT `hr_employee_cost_center_setup_ibfk_3` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_cost_center_setup` ADD CONSTRAINT `hr_employee_cost_center_setup_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_cost_center_setup_details` ADD CONSTRAINT `hr_employee_cost_center_setup_details_ibfk_2` FOREIGN KEY (`id_cost_center`) REFERENCES `cost_center`(`id_cost_center`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_cost_center_setup_details` ADD CONSTRAINT `hr_employee_cost_center_setup_details_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_cost_center_setup_details` ADD CONSTRAINT `hr_employee_cost_center_setup_details_ibfk_4` FOREIGN KEY (`id_hr_employee_cost_center_setup`) REFERENCES `hr_employee_cost_center_setup`(`id_hr_employee_cost_center_setup`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_description` ADD CONSTRAINT `hr_employee_description_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_education_file_import` ADD CONSTRAINT `hr_employee_education_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_education_file_import` ADD CONSTRAINT `hr_employee_education_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_experience_file_import` ADD CONSTRAINT `hr_employee_experience_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_experience_file_import` ADD CONSTRAINT `hr_employee_experience_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_history` ADD CONSTRAINT `hr_employee_history_ibfk_1` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_history` ADD CONSTRAINT `hr_employee_history_ibfk_2` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_history` ADD CONSTRAINT `hr_employee_history_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_insert_file_import` ADD CONSTRAINT `hr_employee_insert_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_insert_file_import` ADD CONSTRAINT `hr_employee_insert_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_nature_type` ADD CONSTRAINT `hr_employee_nature_type_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_business_unit` ADD CONSTRAINT `hr_employee_salary_business_unit_ibfk_1` FOREIGN KEY (`organization_setup_id`) REFERENCES `hr_organization_setup`(`organization_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_business_unit` ADD CONSTRAINT `hr_employee_salary_business_unit_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_business_unit` ADD CONSTRAINT `hr_employee_salary_business_unit_ibfk_3` FOREIGN KEY (`salary_business_unit_id`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_business_unit` ADD CONSTRAINT `hr_employee_salary_business_unit_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_business_unit_history` ADD CONSTRAINT `hr_employee_salary_business_unit_history_ibfk_1` FOREIGN KEY (`organization_setup_id`) REFERENCES `hr_organization_setup`(`organization_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_business_unit_history` ADD CONSTRAINT `hr_employee_salary_business_unit_history_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_business_unit_history` ADD CONSTRAINT `hr_employee_salary_business_unit_history_ibfk_3` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_info` ADD CONSTRAINT `hr_employee_salary_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_info` ADD CONSTRAINT `hr_employee_salary_info_ibfk_2` FOREIGN KEY (`pay_structure_template_id`) REFERENCES `hr_pay_structure_template`(`pay_structure_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_info` ADD CONSTRAINT `hr_employee_salary_info_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_info` ADD CONSTRAINT `hr_employee_salary_info_ibfk_4` FOREIGN KEY (`pay_structure_setup_records_id`) REFERENCES `hr_pay_structure_setup_records`(`pay_structure_setup_records_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_info_history` ADD CONSTRAINT `hr_employee_salary_info_history_ibfk_1` FOREIGN KEY (`pay_structure_setup_records_id`) REFERENCES `hr_pay_structure_setup_records`(`pay_structure_setup_records_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_salary_info_history` ADD CONSTRAINT `hr_employee_salary_info_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_changes_history` ADD CONSTRAINT `hr_employee_tax_changes_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_changes_history` ADD CONSTRAINT `hr_employee_tax_changes_history_ibfk_2` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_changes_history` ADD CONSTRAINT `hr_employee_tax_changes_history_ibfk_3` FOREIGN KEY (`id_hr_tax_recalculate`) REFERENCES `hr_tax_recalculate`(`id_hr_tax_recalculate`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_changes_history` ADD CONSTRAINT `hr_employee_tax_changes_history_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_changes_history` ADD CONSTRAINT `hr_employee_tax_changes_history_ibfk_5` FOREIGN KEY (`pay_structure_setup_records_id`) REFERENCES `hr_pay_structure_setup_records`(`pay_structure_setup_records_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_info` ADD CONSTRAINT `hr_employee_tax_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_info` ADD CONSTRAINT `hr_employee_tax_info_ibfk_2` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_info` ADD CONSTRAINT `hr_employee_tax_info_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_info_details` ADD CONSTRAINT `hr_employee_tax_info_details_ibfk_1` FOREIGN KEY (`id_hr_employee_tax_info`) REFERENCES `hr_employee_tax_info`(`id_hr_employee_tax_info`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_info_details` ADD CONSTRAINT `hr_employee_tax_info_details_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_tax_info_details` ADD CONSTRAINT `hr_employee_tax_info_details_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_transfer` ADD CONSTRAINT `hr_employee_transfer_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_transfer` ADD CONSTRAINT `hr_employee_transfer_ibfk_2` FOREIGN KEY (`previous_business_unit_id`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_transfer` ADD CONSTRAINT `hr_employee_transfer_ibfk_3` FOREIGN KEY (`current_business_unit_id`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_transfer` ADD CONSTRAINT `hr_employee_transfer_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_update_file_import` ADD CONSTRAINT `hr_employee_update_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_update_file_import` ADD CONSTRAINT `hr_employee_update_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_weekends` ADD CONSTRAINT `hr_employee_weekends_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_weekends` ADD CONSTRAINT `hr_employee_weekends_ibfk_2` FOREIGN KEY (`id_hr_weekend`) REFERENCES `hr_weekend`(`id_hr_weekend`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_employee_weekends` ADD CONSTRAINT `hr_employee_weekends_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_equivalent_designation` ADD CONSTRAINT `hr_equivalent_designation_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_exam_titles` ADD CONSTRAINT `hr_exam_titles_ibfk_1` FOREIGN KEY (`id_hr_education_levels`) REFERENCES `hr_education_levels`(`id_hr_education_levels`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_exam_titles` ADD CONSTRAINT `hr_exam_titles_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_experience` ADD CONSTRAINT `hr_experience_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_experience` ADD CONSTRAINT `hr_experience_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_farewell` ADD CONSTRAINT `hr_farewell_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_farewell` ADD CONSTRAINT `hr_farewell_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement` ADD CONSTRAINT `hr_final_settlement_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement` ADD CONSTRAINT `hr_final_settlement_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement` ADD CONSTRAINT `hr_final_settlement_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement` ADD CONSTRAINT `hr_final_settlement_ibfk_4` FOREIGN KEY (`id_earning_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement` ADD CONSTRAINT `hr_final_settlement_ibfk_5` FOREIGN KEY (`id_deduction_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement_details` ADD CONSTRAINT `hr_final_settlement_details_ibfk_1` FOREIGN KEY (`final_settlement_id`) REFERENCES `hr_final_settlement`(`final_settlement_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement_details` ADD CONSTRAINT `hr_final_settlement_details_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement_details` ADD CONSTRAINT `hr_final_settlement_details_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement_history` ADD CONSTRAINT `hr_final_settlement_history_ibfk_1` FOREIGN KEY (`final_settlement_id`) REFERENCES `hr_final_settlement`(`final_settlement_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement_history` ADD CONSTRAINT `hr_final_settlement_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement_performance_status_providers` ADD CONSTRAINT `hr_final_settlement_performance_status_providers_ibfk_1` FOREIGN KEY (`id_hr_final_settlement`) REFERENCES `hr_final_settlement`(`final_settlement_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_final_settlement_performance_status_providers` ADD CONSTRAINT `hr_final_settlement_performance_status_providers_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_finger_print_marge_file_import` ADD CONSTRAINT `hr_finger_print_marge_file_import_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_finger_print_marge_record` ADD CONSTRAINT `hr_finger_print_marge_record_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_finger_print_marge_record` ADD CONSTRAINT `hr_finger_print_marge_record_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_finger_print_marge_record` ADD CONSTRAINT `hr_finger_print_marge_record_ibfk_4` FOREIGN KEY (`id_finger_print_marge_file_import`) REFERENCES `hr_finger_print_marge_file_import`(`id_finger_print_marge_file_import`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_fp_machine_sync_log` ADD CONSTRAINT `fk_machine` FOREIGN KEY (`id_hr_fp_machines`) REFERENCES `hr_fp_machines`(`id_hr_fp_machines`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_fp_machine_user_templates` ADD CONSTRAINT `machine_user` FOREIGN KEY (`id_hr_fp_machine_users`) REFERENCES `hr_fp_machine_users`(`id_hr_fp_machine_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_fp_machine_users` ADD CONSTRAINT `hr_fp_machine` FOREIGN KEY (`id_hr_fp_machines`) REFERENCES `hr_fp_machines`(`id_hr_fp_machines`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_fp_machines` ADD CONSTRAINT `machine_work_station` FOREIGN KEY (`work_station_id`) REFERENCES `hr_work_station`(`work_station_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_fp_user_permission` ADD CONSTRAINT `hr_fp_user_permission_ibfk_1` FOREIGN KEY (`id_hr_fp_pages`) REFERENCES `hr_fp_pages`(`id_hr_fp_pages`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_fp_user_permission` ADD CONSTRAINT `hr_fp_user_permission_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_grades` ADD CONSTRAINT `hr_grades_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_group_setup` ADD CONSTRAINT `hr_group_setup_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_holding_heads` ADD CONSTRAINT `hr_holding_heads_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_holding_heads` ADD CONSTRAINT `hr_holding_heads_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_holiday_type` ADD CONSTRAINT `hr_holiday_type_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_holidays` ADD CONSTRAINT `hr_holidays_ibfk_1` FOREIGN KEY (`id_holiday_type`) REFERENCES `hr_holiday_type`(`holiday_type_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_holidays` ADD CONSTRAINT `hr_holidays_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_increment_file_import` ADD CONSTRAINT `hr_increment_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_increment_file_import` ADD CONSTRAINT `hr_increment_file_import_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_increment_file_import` ADD CONSTRAINT `hr_increment_file_import_ibfk_3` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_increment_records` ADD CONSTRAINT `hr_increment_records_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_increment_records` ADD CONSTRAINT `hr_increment_records_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_increment_records` ADD CONSTRAINT `hr_increment_records_ibfk_3` FOREIGN KEY (`id_increment_file_import`) REFERENCES `hr_increment_file_import`(`id_increment_file_import`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_job_description` ADD CONSTRAINT `hr_job_description_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_job_performance_area` ADD CONSTRAINT `hr_job_performance_area_ibfk_1` FOREIGN KEY (`id_job_description`) REFERENCES `hr_job_description`(`id_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_job_performance_area` ADD CONSTRAINT `hr_job_performance_area_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_late_present` ADD CONSTRAINT `hr_late_present_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_application` ADD CONSTRAINT `hr_leave_application_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_application` ADD CONSTRAINT `hr_leave_application_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_application` ADD CONSTRAINT `hr_leave_application_ibfk_4` FOREIGN KEY (`id_leave_policy`) REFERENCES `hr_leave_policy`(`id_leave_policy`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_application` ADD CONSTRAINT `hr_leave_application_ibfk_5` FOREIGN KEY (`id_leave_type`) REFERENCES `hr_leave_type`(`id_leave_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_application` ADD CONSTRAINT `hr_leave_application_ibfk_7` FOREIGN KEY (`id_por_leave`) REFERENCES `por_leave`(`id_por_leave`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_application_file_import` ADD CONSTRAINT `hr_leave_application_file_import_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_application_file_import` ADD CONSTRAINT `hr_leave_application_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_balance` ADD CONSTRAINT `hr_leave_balance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_balance` ADD CONSTRAINT `hr_leave_balance_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_balance` ADD CONSTRAINT `hr_leave_balance_ibfk_3` FOREIGN KEY (`id_leave_policy`) REFERENCES `hr_leave_policy`(`id_leave_policy`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_balance_details` ADD CONSTRAINT `hr_leave_balance_details_ibfk_1` FOREIGN KEY (`id_hr_leave_balance`) REFERENCES `hr_leave_balance`(`id_hr_leave_balance`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_balance_file_import` ADD CONSTRAINT `hr_leave_balance_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_calculation_details` ADD CONSTRAINT `hr_leave_calculation_details_ibfk_1` FOREIGN KEY (`id_leave_calculation`) REFERENCES `hr_leave_calculation`(`id_leave_calculation`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment` ADD CONSTRAINT `hr_leave_encashment_ibfk_1` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment` ADD CONSTRAINT `hr_leave_encashment_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment` ADD CONSTRAINT `hr_leave_encashment_ibfk_3` FOREIGN KEY (`id_hr_leave_type`) REFERENCES `hr_leave_type`(`id_leave_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment` ADD CONSTRAINT `hr_leave_encashment_ibfk_4` FOREIGN KEY (`id_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_details` ADD CONSTRAINT `hr_leave_encashment_details_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_details` ADD CONSTRAINT `hr_leave_encashment_details_ibfk_2` FOREIGN KEY (`id_hr_leave_encashment`) REFERENCES `hr_leave_encashment`(`id_hr_leave_encashment`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_details` ADD CONSTRAINT `hr_leave_encashment_details_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_details` ADD CONSTRAINT `hr_leave_encashment_details_ibfk_4` FOREIGN KEY (`pay_structure_setup_records_id`) REFERENCES `hr_pay_structure_setup_records`(`pay_structure_setup_records_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_history` ADD CONSTRAINT `hr_leave_encashment_history_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_history` ADD CONSTRAINT `hr_leave_encashment_history_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_history` ADD CONSTRAINT `hr_leave_encashment_history_ibfk_3` FOREIGN KEY (`id_leave_type`) REFERENCES `hr_leave_type`(`id_leave_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_history` ADD CONSTRAINT `hr_leave_encashment_history_ibfk_4` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_setup` ADD CONSTRAINT `hr_leave_encashment_setup_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_setup` ADD CONSTRAINT `hr_leave_encashment_setup_ibfk_2` FOREIGN KEY (`id_leave_type`) REFERENCES `hr_leave_type`(`id_leave_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_encashment_setup` ADD CONSTRAINT `hr_leave_encashment_setup_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_policy` ADD CONSTRAINT `hr_leave_policy_ibfk_1` FOREIGN KEY (`id_leave_type`) REFERENCES `hr_leave_type`(`id_leave_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_policy` ADD CONSTRAINT `hr_leave_policy_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_policy` ADD CONSTRAINT `hr_leave_policy_ibfk_4` FOREIGN KEY (`id_leave_policy_template`) REFERENCES `hr_leave_policy_template`(`id_hr_leave_policy_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_policy_update_history` ADD CONSTRAINT `hr_leave_policy_update_history_ibfk_1` FOREIGN KEY (`id_leave_policy`) REFERENCES `hr_leave_policy`(`id_leave_policy`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_type` ADD CONSTRAINT `hr_leave_type_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_year` ADD CONSTRAINT `hr_leave_year_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_year_history` ADD CONSTRAINT `hr_leave_year_history_ibfk_1` FOREIGN KEY (`id_hr_leave_year`) REFERENCES `hr_leave_year`(`id_leave_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leave_year_history` ADD CONSTRAINT `hr_leave_year_history_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leaving_dates` ADD CONSTRAINT `hr_leaving_dates_ibfk_1` FOREIGN KEY (`id_leave_application`) REFERENCES `hr_leave_application`(`id_leave_application`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leaving_dates` ADD CONSTRAINT `hr_leaving_dates_ibfk_2` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_leaving_dates` ADD CONSTRAINT `hr_leaving_dates_ibfk_3` FOREIGN KEY (`id_leave_type`) REFERENCES `hr_leave_type`(`id_leave_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_man_power_budget` ADD CONSTRAINT `hr_man_power_budget_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_man_power_budget` ADD CONSTRAINT `hr_man_power_budget_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_man_power_budget` ADD CONSTRAINT `hr_man_power_budget_ibfk_3` FOREIGN KEY (`id_hr_man_power_budget_file_import`) REFERENCES `hr_man_power_budget_file_import`(`id_hr_man_power_budget_file_import`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_man_power_budget` ADD CONSTRAINT `hr_man_power_budget_ibfk_4` FOREIGN KEY (`earning_heads_id`) REFERENCES `hr_earning_heads`(`earning_heads_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_man_power_budget_file_import` ADD CONSTRAINT `hr_man_power_budget_file_import_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_man_power_budget_file_import` ADD CONSTRAINT `hr_man_power_budget_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime` ADD CONSTRAINT `hr_manual_overtime_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime` ADD CONSTRAINT `hr_manual_overtime_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime` ADD CONSTRAINT `hr_manual_overtime_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime` ADD CONSTRAINT `hr_manual_overtime_ibfk_4` FOREIGN KEY (`id_hr_manual_overtime_entry`) REFERENCES `hr_manual_overtime_entry`(`id_hr_manual_overtime_entry`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime` ADD CONSTRAINT `hr_manual_overtime_ibfk_5` FOREIGN KEY (`employee_salary_info_id`) REFERENCES `hr_employee_salary_info`(`employee_salary_info_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime` ADD CONSTRAINT `hr_manual_overtime_ibfk_6` FOREIGN KEY (`id_hr_overtime_file_import`) REFERENCES `hr_overtime_file_import`(`id_hr_overtime_file_import`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime_entry` ADD CONSTRAINT `hr_manual_overtime_entry_ibfk_1` FOREIGN KEY (`id_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime_entry` ADD CONSTRAINT `hr_manual_overtime_entry_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime_entry` ADD CONSTRAINT `hr_manual_overtime_entry_ibfk_3` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime_history` ADD CONSTRAINT `hr_manual_overtime_history_ibfk_1` FOREIGN KEY (`overtime_entry_id`) REFERENCES `hr_manual_overtime`(`overtime_entry_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime_history` ADD CONSTRAINT `hr_manual_overtime_history_ibfk_2` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime_history` ADD CONSTRAINT `hr_manual_overtime_history_ibfk_3` FOREIGN KEY (`previous_id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_manual_overtime_history` ADD CONSTRAINT `hr_manual_overtime_history_ibfk_4` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_menu` ADD CONSTRAINT `hr_menu_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_menu_submenu` ADD CONSTRAINT `hr_menu_submenu_ibfk_1` FOREIGN KEY (`id_hr_menu`) REFERENCES `hr_menu`(`id_hr_menu`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_mobile_banking_details` ADD CONSTRAINT `hr_mobile_banking_details_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_10` FOREIGN KEY (`reporting_supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_11` FOREIGN KEY (`reporting_supervisor_desig_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_12` FOREIGN KEY (`equivalent_designation_id`) REFERENCES `hr_equivalent_designation`(`equivalent_designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_13` FOREIGN KEY (`dept_head_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_14` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_15` FOREIGN KEY (`company_setup_id`) REFERENCES `companies`(`id_companies`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_16` FOREIGN KEY (`id_sub_function`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_17` FOREIGN KEY (`id_hr_profession_type`) REFERENCES `hr_profession_type`(`id_hr_profession_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_18` FOREIGN KEY (`works_for_bu_id`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_2` FOREIGN KEY (`employee_desig_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_3` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_5` FOREIGN KEY (`work_station_id`) REFERENCES `hr_work_station`(`work_station_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_6` FOREIGN KEY (`id_employee_nature_type`) REFERENCES `hr_employee_nature_type`(`id_employee_nature_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_7` FOREIGN KEY (`shift_id`) REFERENCES `hr_shift_master`(`shift_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_8` FOREIGN KEY (`line_supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup` ADD CONSTRAINT `hr_organization_setup_ibfk_9` FOREIGN KEY (`line_supervisor_desig_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_change_records` ADD CONSTRAINT `hr_organization_setup_change_records_ibfk_1` FOREIGN KEY (`organization_setup_id`) REFERENCES `hr_organization_setup`(`organization_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_change_records` ADD CONSTRAINT `hr_organization_setup_change_records_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_change_records` ADD CONSTRAINT `hr_organization_setup_change_records_ibfk_3` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_change_records` ADD CONSTRAINT `hr_organization_setup_change_records_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_file_import` ADD CONSTRAINT `hr_organization_setup_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_file_import` ADD CONSTRAINT `hr_organization_setup_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_history` ADD CONSTRAINT `hr_organization_setup_history_ibfk_1` FOREIGN KEY (`organization_setup_id`) REFERENCES `hr_organization_setup`(`organization_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_history` ADD CONSTRAINT `hr_organization_setup_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_history` ADD CONSTRAINT `hr_organization_setup_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_organization_setup_history` ADD CONSTRAINT `hr_organization_setup_history_ibfk_4` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_over_stay_setup_file_import` ADD CONSTRAINT `hr_over_stay_setup_file_import_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_over_stay_setup_file_import` ADD CONSTRAINT `hr_over_stay_setup_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly` ADD CONSTRAINT `hr_overstay_entry_monthly_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly` ADD CONSTRAINT `hr_overstay_entry_monthly_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly` ADD CONSTRAINT `hr_overstay_entry_monthly_ibfk_3` FOREIGN KEY (`id_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly` ADD CONSTRAINT `hr_overstay_entry_monthly_ibfk_4` FOREIGN KEY (`employee_salary_info_id`) REFERENCES `hr_employee_salary_info`(`employee_salary_info_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly` ADD CONSTRAINT `hr_overstay_entry_monthly_ibfk_5` FOREIGN KEY (`id_hr_overstay_file_import`) REFERENCES `hr_overstay_file_import`(`id_hr_overstay_file_import`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly_history` ADD CONSTRAINT `hr_overstay_entry_monthly_history_ibfk_1` FOREIGN KEY (`id_overstay_entry_monthly`) REFERENCES `hr_overstay_entry_monthly`(`id_overstay_entry_monthly`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly_history` ADD CONSTRAINT `hr_overstay_entry_monthly_history_ibfk_2` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly_history` ADD CONSTRAINT `hr_overstay_entry_monthly_history_ibfk_3` FOREIGN KEY (`previous_id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_entry_monthly_history` ADD CONSTRAINT `hr_overstay_entry_monthly_history_ibfk_4` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_file_import` ADD CONSTRAINT `hr_overstay_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_setup` ADD CONSTRAINT `hr_overstay_setup_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_setup` ADD CONSTRAINT `hr_overstay_setup_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_setup` ADD CONSTRAINT `hr_overstay_setup_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_setup` ADD CONSTRAINT `hr_overstay_setup_ibfk_4` FOREIGN KEY (`overstay_template_id`) REFERENCES `hr_overstay_template`(`overstay_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_setup_history` ADD CONSTRAINT `hr_overstay_setup_history_ibfk_1` FOREIGN KEY (`overstay_setup_id`) REFERENCES `hr_overstay_setup`(`overstay_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_setup_history` ADD CONSTRAINT `hr_overstay_setup_history_ibfk_2` FOREIGN KEY (`overstay_template_id`) REFERENCES `hr_overstay_template`(`overstay_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_setup_history` ADD CONSTRAINT `hr_overstay_setup_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_setup_history` ADD CONSTRAINT `hr_overstay_setup_history_ibfk_4` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overstay_template` ADD CONSTRAINT `hr_overstay_template_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime` ADD CONSTRAINT `hr_overtime_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime` ADD CONSTRAINT `hr_overtime_ibfk_2` FOREIGN KEY (`overtime_template_id`) REFERENCES `hr_overtime_template`(`overtime_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime` ADD CONSTRAINT `hr_overtime_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime` ADD CONSTRAINT `hr_overtime_ibfk_4` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime_file_import` ADD CONSTRAINT `hr_overtime_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime_history` ADD CONSTRAINT `hr_overtime_history_ibfk_1` FOREIGN KEY (`overtime_id`) REFERENCES `hr_overtime`(`overtime_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime_history` ADD CONSTRAINT `hr_overtime_history_ibfk_2` FOREIGN KEY (`overtime_template_id`) REFERENCES `hr_overtime_template`(`overtime_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime_history` ADD CONSTRAINT `hr_overtime_history_ibfk_3` FOREIGN KEY (`previous_id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime_history` ADD CONSTRAINT `hr_overtime_history_ibfk_4` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime_setup_file_import` ADD CONSTRAINT `hr_overtime_setup_file_import_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime_setup_file_import` ADD CONSTRAINT `hr_overtime_setup_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_overtime_template` ADD CONSTRAINT `hr_overtime_template_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_page_permission` ADD CONSTRAINT `hr_page_permission_ibfk_1` FOREIGN KEY (`id_menu_submenu`) REFERENCES `hr_menu_submenu`(`id_menu_submenu`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_page_permission` ADD CONSTRAINT `hr_page_permission_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_page_permission` ADD CONSTRAINT `hr_page_permission_ibfk_3` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_page_permission` ADD CONSTRAINT `hr_page_permission_ibfk_4` FOREIGN KEY (`id_user_permitted_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_details_individual_history` ADD CONSTRAINT `hr_pay_slip_details_individual_history_ibfk_1` FOREIGN KEY (`pay_slip_generation_id`) REFERENCES `hr_pay_slip_generation`(`pay_slip_generation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_details_individual_history` ADD CONSTRAINT `hr_pay_slip_details_individual_history_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_details_individual_history` ADD CONSTRAINT `hr_pay_slip_details_individual_history_ibfk_3` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_employee_info` ADD CONSTRAINT `hr_pay_slip_employee_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_employee_info` ADD CONSTRAINT `hr_pay_slip_employee_info_ibfk_10` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_employee_info` ADD CONSTRAINT `hr_pay_slip_employee_info_ibfk_2` FOREIGN KEY (`employee_desig_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_employee_info` ADD CONSTRAINT `hr_pay_slip_employee_info_ibfk_5` FOREIGN KEY (`work_station_id`) REFERENCES `hr_work_station`(`work_station_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_employee_info` ADD CONSTRAINT `hr_pay_slip_employee_info_ibfk_7` FOREIGN KEY (`id_employee_nature_type`) REFERENCES `hr_employee_nature_type`(`id_employee_nature_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_employee_info` ADD CONSTRAINT `hr_pay_slip_employee_info_ibfk_9` FOREIGN KEY (`id_pay_slip_generation`) REFERENCES `hr_pay_slip_generation`(`pay_slip_generation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation` ADD CONSTRAINT `hr_pay_slip_generation_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation` ADD CONSTRAINT `hr_pay_slip_generation_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation` ADD CONSTRAINT `hr_pay_slip_generation_ibfk_3` FOREIGN KEY (`id_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation` ADD CONSTRAINT `hr_pay_slip_generation_ibfk_4` FOREIGN KEY (`id_calendar_setup`) REFERENCES `hr_calendar_setup`(`id_calendar_setup`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation` ADD CONSTRAINT `hr_pay_slip_generation_ibfk_5` FOREIGN KEY (`approver_id`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation` ADD CONSTRAINT `hr_pay_slip_generation_ibfk_6` FOREIGN KEY (`accountant_id`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_details` ADD CONSTRAINT `hr_pay_slip_generation_details_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_details` ADD CONSTRAINT `hr_pay_slip_generation_details_ibfk_2` FOREIGN KEY (`pay_slip_generation_id`) REFERENCES `hr_pay_slip_generation`(`pay_slip_generation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_details` ADD CONSTRAINT `hr_pay_slip_generation_details_ibfk_3` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_details` ADD CONSTRAINT `hr_pay_slip_generation_details_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_details_history` ADD CONSTRAINT `hr_pay_slip_generation_details_history_ibfk_1` FOREIGN KEY (`pay_slip_generation_id`) REFERENCES `hr_pay_slip_generation`(`pay_slip_generation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_details_history` ADD CONSTRAINT `hr_pay_slip_generation_details_history_ibfk_2` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_history` ADD CONSTRAINT `hr_pay_slip_generation_history_ibfk_1` FOREIGN KEY (`pay_slip_generation_id`) REFERENCES `hr_pay_slip_generation`(`pay_slip_generation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_history` ADD CONSTRAINT `hr_pay_slip_generation_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_info` ADD CONSTRAINT `hr_pay_slip_generation_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_info` ADD CONSTRAINT `hr_pay_slip_generation_info_ibfk_2` FOREIGN KEY (`pay_slip_generation_id`) REFERENCES `hr_pay_slip_generation`(`pay_slip_generation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_slip_generation_info` ADD CONSTRAINT `hr_pay_slip_generation_info_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_amount_update_history` ADD CONSTRAINT `hr_pay_structure_amount_update_history_ibfk_1` FOREIGN KEY (`pay_structure_setup_id`) REFERENCES `hr_pay_structure_setup`(`pay_structure_setup_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_amount_update_history` ADD CONSTRAINT `hr_pay_structure_amount_update_history_ibkf_1` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_records_history` ADD CONSTRAINT `hr_pay_structure_records_history_ibkf_1` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_records_history` ADD CONSTRAINT `hr_pay_structure_records_history_ibkf_2` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup` ADD CONSTRAINT `hr_pay_structure_setup_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup` ADD CONSTRAINT `hr_pay_structure_setup_ibfk_2` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup` ADD CONSTRAINT `hr_pay_structure_setup_ibfk_3` FOREIGN KEY (`pay_structure_template_details_id`) REFERENCES `hr_pay_structure_template_details`(`pay_structure_template_details_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup` ADD CONSTRAINT `hr_pay_structure_setup_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup_file_import` ADD CONSTRAINT `hr_pay_structure_setup_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup_file_import` ADD CONSTRAINT `hr_pay_structure_setup_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup_history` ADD CONSTRAINT `hr_pay_structure_setup_history_ibfk_1` FOREIGN KEY (`pay_structure_setup_records_id`) REFERENCES `hr_pay_structure_setup_records`(`pay_structure_setup_records_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup_history` ADD CONSTRAINT `hr_pay_structure_setup_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup_history` ADD CONSTRAINT `hr_pay_structure_setup_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup_records` ADD CONSTRAINT `hr_pay_structure_setup_records_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup_records` ADD CONSTRAINT `hr_pay_structure_setup_records_ibfk_2` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_setup_records` ADD CONSTRAINT `hr_pay_structure_setup_records_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template` ADD CONSTRAINT `hr_pay_structure_template_ibfk_1` FOREIGN KEY (`primary_earnings_head_id`) REFERENCES `hr_earning_heads`(`earning_heads_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template` ADD CONSTRAINT `hr_pay_structure_template_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template_details` ADD CONSTRAINT `hr_pay_structure_template_details_ibfk_1` FOREIGN KEY (`pay_structure_template_id`) REFERENCES `hr_pay_structure_template`(`pay_structure_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template_details` ADD CONSTRAINT `hr_pay_structure_template_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template_details_history` ADD CONSTRAINT `hr_pay_structure_template_details_history_ibfk_1` FOREIGN KEY (`pay_structure_template_id`) REFERENCES `hr_pay_structure_template`(`pay_structure_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template_details_history` ADD CONSTRAINT `hr_pay_structure_template_details_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template_details_history` ADD CONSTRAINT `hr_pay_structure_template_details_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template_history` ADD CONSTRAINT `hr_pay_structure_template_history_ibfk_1` FOREIGN KEY (`pay_structure_template_id`) REFERENCES `hr_pay_structure_template`(`pay_structure_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template_history` ADD CONSTRAINT `hr_pay_structure_template_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_template_history` ADD CONSTRAINT `hr_pay_structure_template_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_variable_input` ADD CONSTRAINT `fk_variable_input_id_business_unit_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_variable_input` ADD CONSTRAINT `hr_pay_structure_variable_input_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_pay_structure_variable_input` ADD CONSTRAINT `hr_pay_structure_variable_input_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_payment` ADD CONSTRAINT `hr_payment_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_payment` ADD CONSTRAINT `hr_payment_ibfk_5` FOREIGN KEY (`id_ledger`) REFERENCES `acc_ledgers`(`id_ledgers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_portal_access_records` ADD CONSTRAINT `hr_portal_access_records_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_portal_access_records` ADD CONSTRAINT `hr_portal_access_records_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_prefix` ADD CONSTRAINT `hr_prefix_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_prefix` ADD CONSTRAINT `hr_prefix_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_company` ADD CONSTRAINT `hr_present_company_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_company` ADD CONSTRAINT `hr_present_company_ibfk_2` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_company` ADD CONSTRAINT `hr_present_company_ibfk_3` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_company` ADD CONSTRAINT `hr_present_company_ibfk_4` FOREIGN KEY (`id_grade`) REFERENCES `hr_grades`(`id_grade`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_company` ADD CONSTRAINT `hr_present_company_ibfk_5` FOREIGN KEY (`id_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_company` ADD CONSTRAINT `hr_present_company_ibfk_6` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_file_import` ADD CONSTRAINT `hr_present_offday_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master` ADD CONSTRAINT `hr_present_offday_master_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master` ADD CONSTRAINT `hr_present_offday_master_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master` ADD CONSTRAINT `hr_present_offday_master_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master` ADD CONSTRAINT `hr_present_offday_master_ibfk_4` FOREIGN KEY (`present_offday_template_id`) REFERENCES `hr_present_offday_template`(`present_offday_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master_history` ADD CONSTRAINT `hr_present_offday_master_history_ibfk_1` FOREIGN KEY (`present_offday_id`) REFERENCES `hr_present_offday_master`(`present_offday_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master_history` ADD CONSTRAINT `hr_present_offday_master_history_ibfk_2` FOREIGN KEY (`present_offday_template_id`) REFERENCES `hr_present_offday_template`(`present_offday_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master_history` ADD CONSTRAINT `hr_present_offday_master_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master_history` ADD CONSTRAINT `hr_present_offday_master_history_ibfk_4` FOREIGN KEY (`previous_id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_master_history` ADD CONSTRAINT `hr_present_offday_master_history_ibfk_5` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_monthly` ADD CONSTRAINT `hr_present_offday_monthly` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_monthly` ADD CONSTRAINT `hr_present_offday_monthly_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_monthly` ADD CONSTRAINT `hr_present_offday_monthly_ibfk_3` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_monthly` ADD CONSTRAINT `hr_present_offday_monthly_ibfk_4` FOREIGN KEY (`id_hr_present_offday_file_import`) REFERENCES `hr_present_offday_file_import`(`id_hr_present_offday_file_import`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_monthly_history` ADD CONSTRAINT `hr_present_offday_monthly_history_ibfk_1` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_monthly_history` ADD CONSTRAINT `hr_present_offday_monthly_history_ibfk_2` FOREIGN KEY (`previous_id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_monthly_history` ADD CONSTRAINT `hr_present_offday_monthly_history_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_setup_file_import` ADD CONSTRAINT `hr_present_offday_setup_file_import_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_setup_file_import` ADD CONSTRAINT `hr_present_offday_setup_file_import_ibfk_2` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_present_offday_template` ADD CONSTRAINT `hr_present_offday_template_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_profession_type` ADD CONSTRAINT `hr_profession_type_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_project_permission` ADD CONSTRAINT `hr_project_permission_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_project_permission` ADD CONSTRAINT `hr_project_permission_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_projectwise_role_assign` ADD CONSTRAINT `hr_projectwise_role_assign_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_projectwise_role_assign` ADD CONSTRAINT `hr_projectwise_role_assign_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_projectwise_template_assign` ADD CONSTRAINT `hr_projectwise_template_assign_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_projectwise_template_assign` ADD CONSTRAINT `hr_projectwise_template_assign_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_promotion_info` ADD CONSTRAINT `hr_promotion_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_promotion_info` ADD CONSTRAINT `hr_promotion_info_ibfk_2` FOREIGN KEY (`id_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_promotion_info` ADD CONSTRAINT `hr_promotion_info_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_promotion_info` ADD CONSTRAINT `hr_promotion_info_ibfk_4` FOREIGN KEY (`id_equivalent_designation`) REFERENCES `hr_equivalent_designation`(`equivalent_designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_promotion_info` ADD CONSTRAINT `hr_promotion_info_ibfk_5` FOREIGN KEY (`id_prev_company`) REFERENCES `companies`(`id_companies`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_promotion_info` ADD CONSTRAINT `hr_promotion_info_ibfk_6` FOREIGN KEY (`id_prev_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_promotion_info` ADD CONSTRAINT `hr_promotion_info_ibfk_7` FOREIGN KEY (`id_prev_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_promotion_info` ADD CONSTRAINT `hr_promotion_info_ibfk_8` FOREIGN KEY (`id_prev_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_details` ADD CONSTRAINT `hr_provident_fund_details_ibfk_1` FOREIGN KEY (`id_hr_provident_fund_setup`) REFERENCES `hr_provident_fund_setup`(`id_hr_provident_fund_setup`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_details` ADD CONSTRAINT `hr_provident_fund_details_ibfk_2` FOREIGN KEY (`id_hr_provident_fund_template`) REFERENCES `hr_provident_fund_template`(`id_hr_provident_fund_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_details` ADD CONSTRAINT `hr_provident_fund_details_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_details` ADD CONSTRAINT `hr_provident_fund_details_ibfk_4` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_details` ADD CONSTRAINT `hr_provident_fund_details_ibfk_5` FOREIGN KEY (`pay_slip_generation_id`) REFERENCES `hr_pay_slip_generation`(`pay_slip_generation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_details` ADD CONSTRAINT `hr_provident_fund_details_ibfk_6` FOREIGN KEY (`generation_details_id`) REFERENCES `hr_pay_slip_generation_details`(`generation_details_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_details` ADD CONSTRAINT `hr_provident_fund_details_ibfk_7` FOREIGN KEY (`id_pay_slip_generation_info`) REFERENCES `hr_pay_slip_generation_info`(`id_pay_slip_generation_info`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_details` ADD CONSTRAINT `hr_provident_fund_details_ibfk_8` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_setup` ADD CONSTRAINT `hr_provident_fund_setup_ibfk_1` FOREIGN KEY (`id_hr_provident_fund_template`) REFERENCES `hr_provident_fund_template`(`id_hr_provident_fund_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_setup` ADD CONSTRAINT `hr_provident_fund_setup_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_setup` ADD CONSTRAINT `hr_provident_fund_setup_ibfk_3` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_setup` ADD CONSTRAINT `hr_provident_fund_setup_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_template` ADD CONSTRAINT `hr_provident_fund_template_ibfk_1` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_provident_fund_template` ADD CONSTRAINT `hr_provident_fund_template_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_reference` ADD CONSTRAINT `hr_reference_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_reference` ADD CONSTRAINT `hr_reference_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_salary_business_unit` ADD CONSTRAINT `hr_salary_business_unit_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_salary_business_unit` ADD CONSTRAINT `hr_salary_business_unit_ibfk_2` FOREIGN KEY (`bank_id`) REFERENCES `banks_original`(`id_banks`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_salary_business_unit` ADD CONSTRAINT `hr_salary_business_unit_ibfk_3` FOREIGN KEY (`branch_id`) REFERENCES `hr_bank_branch_master`(`branch_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_salary_business_unit` ADD CONSTRAINT `hr_salary_business_unit_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_shift_master` ADD CONSTRAINT `hr_shift_master_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_area` ADD CONSTRAINT `hr_tax_area_ibfk_1` FOREIGN KEY (`id_hr_tax_template`) REFERENCES `hr_tax_template`(`id_hr_tax_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_area` ADD CONSTRAINT `hr_tax_area_ibfk_2` FOREIGN KEY (`id_hr_tax_area_type`) REFERENCES `hr_tax_area_type`(`id_hr_tax_area_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_area` ADD CONSTRAINT `hr_tax_area_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_bonus_setup` ADD CONSTRAINT `hr_tax_bonus_setup_ibfk_1` FOREIGN KEY (`id_hr_tax_template`) REFERENCES `hr_tax_template`(`id_hr_tax_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_bonus_setup` ADD CONSTRAINT `hr_tax_bonus_setup_ibfk_2` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_bonus_setup` ADD CONSTRAINT `hr_tax_bonus_setup_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_calculation_range` ADD CONSTRAINT `hr_tax_calculation_range_ibfk_1` FOREIGN KEY (`id_hr_tax_template`) REFERENCES `hr_tax_template`(`id_hr_tax_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_calculation_range` ADD CONSTRAINT `hr_tax_calculation_range_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_calculation_range_history` ADD CONSTRAINT `hr_tax_calculation_range_history_ibfk_1` FOREIGN KEY (`id_hr_tax_template`) REFERENCES `hr_tax_template`(`id_hr_tax_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_calculation_range_history` ADD CONSTRAINT `hr_tax_calculation_range_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_calculation_range_history` ADD CONSTRAINT `hr_tax_calculation_range_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_employee` ADD CONSTRAINT `hr_tax_challan_employee_ibfk_1` FOREIGN KEY (`id_hr_tax_challan_entry`) REFERENCES `hr_tax_challan_entry`(`id_hr_tax_challan_entry`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_employee` ADD CONSTRAINT `hr_tax_challan_employee_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_employee` ADD CONSTRAINT `hr_tax_challan_employee_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry` ADD CONSTRAINT `hr_tax_challan_entry_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry` ADD CONSTRAINT `hr_tax_challan_entry_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `hr_bank_branch_master`(`branch_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry` ADD CONSTRAINT `hr_tax_challan_entry_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry` ADD CONSTRAINT `hr_tax_challan_entry_ibfk_5` FOREIGN KEY (`submitted_by_id`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry` ADD CONSTRAINT `hr_tax_challan_entry_ibfk_6` FOREIGN KEY (`approver_id`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry` ADD CONSTRAINT `hr_tax_challan_entry_ibfk_7` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry` ADD CONSTRAINT `hr_tax_challan_entry_ibfk_8` FOREIGN KEY (`pay_slip_generation_id`) REFERENCES `hr_pay_slip_generation`(`pay_slip_generation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry_file_import` ADD CONSTRAINT `hr_tax_challan_entry_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry_history` ADD CONSTRAINT `hr_tax_challan_entry_history_ibfk_1` FOREIGN KEY (`id_hr_tax_challan_entry`) REFERENCES `hr_tax_challan_entry`(`id_hr_tax_challan_entry`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_challan_entry_history` ADD CONSTRAINT `hr_tax_challan_entry_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_policy_earning_head_wise` ADD CONSTRAINT `hr_tax_policy_earning_head_wise_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_policy_earning_head_wise` ADD CONSTRAINT `hr_tax_policy_earning_head_wise_ibfk_2` FOREIGN KEY (`earning_heads_id`) REFERENCES `hr_earning_heads`(`earning_heads_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_policy_earning_head_wise` ADD CONSTRAINT `hr_tax_policy_earning_head_wise_ibfk_3` FOREIGN KEY (`id_hr_tax_template`) REFERENCES `hr_tax_template`(`id_hr_tax_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_policy_earning_head_wise_history` ADD CONSTRAINT `hr_tax_policy_earning_head_wise_history_ibfk_1` FOREIGN KEY (`id_hr_tax_template`) REFERENCES `hr_tax_template`(`id_hr_tax_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_policy_earning_head_wise_history` ADD CONSTRAINT `hr_tax_policy_earning_head_wise_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_policy_earning_head_wise_history` ADD CONSTRAINT `hr_tax_policy_earning_head_wise_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_recalculate` ADD CONSTRAINT `hr_tax_recalculate_ibfk_1` FOREIGN KEY (`id_hr_tax_template`) REFERENCES `hr_tax_template`(`id_hr_tax_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_recalculate` ADD CONSTRAINT `hr_tax_recalculate_ibfk_2` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_recalculate` ADD CONSTRAINT `hr_tax_recalculate_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_template` ADD CONSTRAINT `hr_tax_template_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_template` ADD CONSTRAINT `hr_tax_template_ibfk_2` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_template_history` ADD CONSTRAINT `hr_tax_template_history_ibfk_1` FOREIGN KEY (`id_hr_tax_template`) REFERENCES `hr_tax_template`(`id_hr_tax_template`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_template_history` ADD CONSTRAINT `hr_tax_template_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_tax_template_history` ADD CONSTRAINT `hr_tax_template_history_ibfk_3` FOREIGN KEY (`changes_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_training_certification` ADD CONSTRAINT `hr_training_certification_ibfk_1` FOREIGN KEY (`id_hr_institutes`) REFERENCES `hr_institutes`(`id_hr_institutes`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_training_certification` ADD CONSTRAINT `hr_training_certification_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_training_certification` ADD CONSTRAINT `hr_training_certification_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_company` ADD CONSTRAINT `hr_transferred_company_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_company` ADD CONSTRAINT `hr_transferred_company_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_company` ADD CONSTRAINT `hr_transferred_company_ibfk_3` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_company` ADD CONSTRAINT `hr_transferred_company_ibfk_4` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_company` ADD CONSTRAINT `hr_transferred_company_ibfk_5` FOREIGN KEY (`id_grade`) REFERENCES `hr_grades`(`id_grade`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_company` ADD CONSTRAINT `hr_transferred_company_ibfk_6` FOREIGN KEY (`id_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_employees_salary` ADD CONSTRAINT `hr_transferred_employees_salary_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_employees_salary` ADD CONSTRAINT `hr_transferred_employees_salary_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_employees_salary` ADD CONSTRAINT `hr_transferred_employees_salary_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_employees_salary` ADD CONSTRAINT `hr_transferred_employees_salary_ibfk_4` FOREIGN KEY (`pay_structure_template_id`) REFERENCES `hr_pay_structure_template`(`pay_structure_template_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_transferred_employees_salary` ADD CONSTRAINT `hr_transferred_employees_salary_ibfk_5` FOREIGN KEY (`transfer_id`) REFERENCES `hr_employee_transfer`(`employee_transfer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_variable_input_file_import` ADD CONSTRAINT `hr_variable_input_file_import_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_variable_input_file_import` ADD CONSTRAINT `hr_variable_input_file_import_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_variable_input_history` ADD CONSTRAINT `hr_variable_input_history_ibfk_1` FOREIGN KEY (`pay_structure_variable_input_id`) REFERENCES `hr_pay_structure_variable_input`(`pay_structure_variable_input_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_variable_input_history` ADD CONSTRAINT `hr_variable_input_history_ibfk_2` FOREIGN KEY (`previous_id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hr_work_station` ADD CONSTRAINT `hr_work_station_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_candidate_user_addresses` ADD CONSTRAINT `hris_candidate_user_addresses_ibfk_1` FOREIGN KEY (`id_candidate_user`) REFERENCES `hris_candidate_users`(`id_candidate_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_candidate_user_educations` ADD CONSTRAINT `hris_candidate_user_educations_ibfk_1` FOREIGN KEY (`id_candidate_user`) REFERENCES `hris_candidate_users`(`id_candidate_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_candidate_user_experiences` ADD CONSTRAINT `hris_candidate_user_experiences_ibfk_1` FOREIGN KEY (`id_candidate_user`) REFERENCES `hris_candidate_users`(`id_candidate_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_candidate_user_references` ADD CONSTRAINT `hris_candidate_user_references_ibfk_1` FOREIGN KEY (`id_candidate_user`) REFERENCES `hris_candidate_users`(`id_candidate_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_candidate_user_trainings` ADD CONSTRAINT `hris_candidate_user_trainings_ibfk_1` FOREIGN KEY (`id_candidate_user`) REFERENCES `hris_candidate_users`(`id_candidate_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_citeria_master` ADD CONSTRAINT `hris_citeria_master_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_citeria_master` ADD CONSTRAINT `hris_citeria_master_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_departmental_budget` ADD CONSTRAINT `hris_departmental_budget_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_departmental_budget` ADD CONSTRAINT `hris_departmental_budget_ibfk_2` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_departmental_budget` ADD CONSTRAINT `hris_departmental_budget_ibfk_3` FOREIGN KEY (`id_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_departmental_budget` ADD CONSTRAINT `hris_departmental_budget_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_departmental_budget_details` ADD CONSTRAINT `hris_departmental_budget_details_ibfk_1` FOREIGN KEY (`id_hris_departmental_budget`) REFERENCES `hris_departmental_budget`(`id_hris_departmental_budget`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_departmental_budget_details` ADD CONSTRAINT `hris_departmental_budget_details_ibfk_2` FOREIGN KEY (`id_hris_job_create_details`) REFERENCES `hris_job_create_details`(`id_hris_job_create_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_document_master` ADD CONSTRAINT `hris_document_master_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_document_master` ADD CONSTRAINT `hris_document_master_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_sitting_arragement_details` ADD CONSTRAINT `hris_employee_sitting_arragement_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_sitting_arragement_details` ADD CONSTRAINT `hris_employee_sitting_arragement_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_sitting_arragement_details` ADD CONSTRAINT `hris_employee_sitting_arragement_details_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_sitting_arragement_details` ADD CONSTRAINT `hris_employee_sitting_arragement_details_ibfk_4` FOREIGN KEY (`designation_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_sitting_arragement_details` ADD CONSTRAINT `hris_employee_sitting_arragement_details_ibfk_5` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_sitting_arragement_details` ADD CONSTRAINT `hris_employee_sitting_arragement_details_ibfk_6` FOREIGN KEY (`id_hris_work_station_flat_room_details`) REFERENCES `hris_work_station_flat_room_details`(`id_hris_work_station_flat_room_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_sitting_arragement_details` ADD CONSTRAINT `hris_employee_sitting_arragement_details_ibfk_7` FOREIGN KEY (`id_hris_work_station_flat_details`) REFERENCES `hris_work_station_flat_details`(`id_hris_work_station_flat_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_details` ADD CONSTRAINT `hris_employee_stationary_requisition_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_details` ADD CONSTRAINT `hris_employee_stationary_requisition_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_details` ADD CONSTRAINT `hris_employee_stationary_requisition_details_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_details` ADD CONSTRAINT `hris_employee_stationary_requisition_details_ibfk_4` FOREIGN KEY (`designation_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_details` ADD CONSTRAINT `hris_employee_stationary_requisition_details_ibfk_5` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_details` ADD CONSTRAINT `hris_employee_stationary_requisition_details_ibfk_6` FOREIGN KEY (`stationary_product_concern_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_items_details` ADD CONSTRAINT `hris_employee_stationary_requisition_items_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_items_details` ADD CONSTRAINT `hris_employee_stationary_requisition_items_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_items_details` ADD CONSTRAINT `hris_employee_stationary_requisition_items_details_ibfk_3` FOREIGN KEY (`id_hris_employee_stationary_requisition_details`) REFERENCES `hris_employee_stationary_requisition_details`(`id_hris_employee_stationary_requisition_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_employee_stationary_requisition_items_details` ADD CONSTRAINT `hris_employee_stationary_requisition_items_details_ibfk_4` FOREIGN KEY (`id_inv_items`) REFERENCES `inv_items`(`id_inv_items`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_evaluation_score_master` ADD CONSTRAINT `hris_evaluation_score_master_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_evaluation_score_master` ADD CONSTRAINT `hris_evaluation_score_master_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_file_archive_document_for` ADD CONSTRAINT `hris_file_archive_document_for_ibfk_1` FOREIGN KEY (`id_hris_file_archive_document_type`) REFERENCES `hris_file_archive_document_type`(`id_hris_file_archive_document_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_file_archive_document_for` ADD CONSTRAINT `hris_file_archive_document_for_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_file_archive_document_type` ADD CONSTRAINT `hris_file_archive_document_type_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_file_archive_entry` ADD CONSTRAINT `hris_file_archive_entry_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_file_archive_entry` ADD CONSTRAINT `hris_file_archive_entry_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_file_archive_entry_details` ADD CONSTRAINT `hris_file_archive_entry_details_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_guest_inter_viewer_details` ADD CONSTRAINT `hris_guest_inter_viewer_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_guest_inter_viewer_details` ADD CONSTRAINT `hris_guest_inter_viewer_details_ibfk_2` FOREIGN KEY (`id_hris_inter_view_board`) REFERENCES `hris_inter_view_board`(`id_hris_inter_view_board`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_guest_inter_viewer_details` ADD CONSTRAINT `hris_guest_inter_viewer_details_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_board` ADD CONSTRAINT `hris_inter_view_board_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_board` ADD CONSTRAINT `hris_inter_view_board_ibfk_2` FOREIGN KEY (`hris_job_requisition_id`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_board` ADD CONSTRAINT `hris_inter_view_board_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_setup_details` ADD CONSTRAINT `hris_inter_view_setup_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_setup_details` ADD CONSTRAINT `hris_inter_view_setup_details_ibfk_2` FOREIGN KEY (`id_job_requisition`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_setup_details` ADD CONSTRAINT `hris_inter_view_setup_details_ibfk_3` FOREIGN KEY (`id_hris_inter_view_time_schedule_details`) REFERENCES `hris_inter_view_time_schedule_details`(`id_hris_inter_view_time_schedule_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_setup_details` ADD CONSTRAINT `hris_inter_view_setup_details_ibfk_4` FOREIGN KEY (`id_candidate_user`) REFERENCES `hris_candidate_users`(`id_candidate_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_setup_details` ADD CONSTRAINT `hris_inter_view_setup_details_ibfk_5` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_time_schedule_details` ADD CONSTRAINT `hris_inter_view_time_schedule_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_time_schedule_details` ADD CONSTRAINT `hris_inter_view_time_schedule_details_ibfk_2` FOREIGN KEY (`id_hris_inter_view_board`) REFERENCES `hris_inter_view_board`(`id_hris_inter_view_board`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_view_time_schedule_details` ADD CONSTRAINT `hris_inter_view_time_schedule_details_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_viewer_details` ADD CONSTRAINT `hris_inter_viewer_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_viewer_details` ADD CONSTRAINT `hris_inter_viewer_details_ibfk_2` FOREIGN KEY (`id_hris_inter_view_board`) REFERENCES `hris_inter_view_board`(`id_hris_inter_view_board`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_viewer_details` ADD CONSTRAINT `hris_inter_viewer_details_ibfk_3` FOREIGN KEY (`inter_viewer_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_inter_viewer_details` ADD CONSTRAINT `hris_inter_viewer_details_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_appraise` ADD CONSTRAINT `hris_interview_appraise_ibfk_1` FOREIGN KEY (`id_inter_view_setup_details`) REFERENCES `hris_inter_view_setup_details`(`id_hris_inter_view_setup_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_appraise` ADD CONSTRAINT `hris_interview_appraise_ibfk_2` FOREIGN KEY (`id_interview_appraised_rating`) REFERENCES `hris_interview_appraised_ratings`(`id_interview_appraised_rating`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_appraise` ADD CONSTRAINT `hris_interview_appraise_ibfk_3` FOREIGN KEY (`id_interview_appraised_characteristic`) REFERENCES `hris_interview_appraised_characteristics`(`id_interview_appraised_characteristic`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_appraise` ADD CONSTRAINT `hris_interview_appraise_ibfk_4` FOREIGN KEY (`appraised_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_appraised_candidates` ADD CONSTRAINT `hris_interview_appraised_candidates_ibfk_1` FOREIGN KEY (`id_inter_view_setup_details`) REFERENCES `hris_inter_view_setup_details`(`id_hris_inter_view_setup_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_appraised_references` ADD CONSTRAINT `hris_interview_appraised_references_ibfk_1` FOREIGN KEY (`id_interview_appraise`) REFERENCES `hris_interview_appraise`(`id_interview_appraise`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_board_master` ADD CONSTRAINT `hris_interview_board_master_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_board_master` ADD CONSTRAINT `hris_interview_board_master_ibfk_2` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_board_master` ADD CONSTRAINT `hris_interview_board_master_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_board_master_interviewer_details` ADD CONSTRAINT `hris_interview_board_master_interviewer_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_board_master_interviewer_details` ADD CONSTRAINT `hris_interview_board_master_interviewer_details_ibfk_2` FOREIGN KEY (`id_hris_interview_board_master`) REFERENCES `hris_interview_board_master`(`id_hris_interview_board_master`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_board_master_interviewer_details` ADD CONSTRAINT `hris_interview_board_master_interviewer_details_ibfk_3` FOREIGN KEY (`inter_viewer_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_interview_board_master_interviewer_details` ADD CONSTRAINT `hris_interview_board_master_interviewer_details_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_details` ADD CONSTRAINT `hris_it_goods_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_details` ADD CONSTRAINT `hris_it_goods_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_details` ADD CONSTRAINT `hris_it_goods_details_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_details` ADD CONSTRAINT `hris_it_goods_details_ibfk_4` FOREIGN KEY (`designation_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_details` ADD CONSTRAINT `hris_it_goods_details_ibfk_5` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_details` ADD CONSTRAINT `hris_it_goods_details_ibfk_6` FOREIGN KEY (`concern_supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_details` ADD CONSTRAINT `hris_it_goods_details_ibfk_7` FOREIGN KEY (`concern_it_person_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_items_details` ADD CONSTRAINT `hris_it_goods_items_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_items_details` ADD CONSTRAINT `hris_it_goods_items_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_items_details` ADD CONSTRAINT `hris_it_goods_items_details_ibfk_3` FOREIGN KEY (`id_hris_it_goods_details`) REFERENCES `hris_it_goods_details`(`id_hris_it_goods_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_it_goods_items_details` ADD CONSTRAINT `hris_it_goods_items_details_ibfk_4` FOREIGN KEY (`id_inv_items`) REFERENCES `inv_items`(`id_inv_items`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_bill_entry` ADD CONSTRAINT `hris_job_advertisement_bill_entry_ibfk_1` FOREIGN KEY (`id_job_advertisements`) REFERENCES `hris_job_advertisements`(`id_job_advertisements`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_bill_entry` ADD CONSTRAINT `hris_job_advertisement_bill_entry_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_bill_entry` ADD CONSTRAINT `hris_job_advertisement_bill_entry_ibfk_3` FOREIGN KEY (`approver_1`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_bill_entry` ADD CONSTRAINT `hris_job_advertisement_bill_entry_ibfk_4` FOREIGN KEY (`approver_2`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_bill_entry` ADD CONSTRAINT `hris_job_advertisement_bill_entry_ibfk_5` FOREIGN KEY (`account_payable`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_bill_entry` ADD CONSTRAINT `hris_job_advertisement_bill_entry_ibfk_6` FOREIGN KEY (`id_vendors`) REFERENCES `vendors`(`id_vendors`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_bill_entry` ADD CONSTRAINT `hris_job_advertisement_bill_entry_ibfk_7` FOREIGN KEY (`id_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_bill_entry` ADD CONSTRAINT `hris_job_advertisement_bill_entry_ibfk_8` FOREIGN KEY (`id_user`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_media_masters` ADD CONSTRAINT `hris_job_advertisement_media_masters_ibfk_1` FOREIGN KEY (`id_job_advertisement`) REFERENCES `hris_job_advertisements`(`id_job_advertisements`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisement_media_masters` ADD CONSTRAINT `hris_job_advertisement_media_masters_ibfk_2` FOREIGN KEY (`id_vendors`) REFERENCES `vendors`(`id_vendors`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_advertisements` ADD CONSTRAINT `hris_job_advertisements_ibfk_1` FOREIGN KEY (`id_job_requisition`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_application_history` ADD CONSTRAINT `hris_job_application_history_ibfk_1` FOREIGN KEY (`id_job_application`) REFERENCES `hris_job_applications`(`id_job_application`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_application_history` ADD CONSTRAINT `hris_job_application_history_ibfk_2` FOREIGN KEY (`previous_job_requisition_id`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_application_history` ADD CONSTRAINT `hris_job_application_history_ibfk_3` FOREIGN KEY (`current_job_requisition_id`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_application_history` ADD CONSTRAINT `hris_job_application_history_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_applications` ADD CONSTRAINT `hris_job_applications_ibfk_1` FOREIGN KEY (`id_job_requisition`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_applications` ADD CONSTRAINT `hris_job_applications_ibfk_2` FOREIGN KEY (`id_candidate_user`) REFERENCES `hris_candidate_users`(`id_candidate_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_create` ADD CONSTRAINT `hris_job_create_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_create` ADD CONSTRAINT `hris_job_create_ibfk_2` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_create` ADD CONSTRAINT `hris_job_create_ibfk_3` FOREIGN KEY (`id_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_create` ADD CONSTRAINT `hris_job_create_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_create_details` ADD CONSTRAINT `hris_job_create_details_ibfk_1` FOREIGN KEY (`id_hris_job_create`) REFERENCES `hris_job_create`(`id_hris_job_create`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description` ADD CONSTRAINT `fk_reporting_to_employee_id` FOREIGN KEY (`reporting_to`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description` ADD CONSTRAINT `hris_job_description_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description` ADD CONSTRAINT `hris_job_description_ibfk_2` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description` ADD CONSTRAINT `hris_job_description_ibfk_3` FOREIGN KEY (`grade_id`) REFERENCES `hr_grades`(`id_grade`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description` ADD CONSTRAINT `hris_job_description_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description` ADD CONSTRAINT `hris_job_description_ibfk_5` FOREIGN KEY (`designation_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description` ADD CONSTRAINT `hris_job_description_ibfk_6` FOREIGN KEY (`work_station_id`) REFERENCES `hr_work_station`(`work_station_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_dimension` ADD CONSTRAINT `hris_job_description_dimension_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_experience` ADD CONSTRAINT `hris_job_description_experience_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_external_customer` ADD CONSTRAINT `hris_job_description_external_customer_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_internal_customer` ADD CONSTRAINT `hris_job_description_internal_customer_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_non_performing_areas` ADD CONSTRAINT `hris_job_description_non_performing_areas_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_non_performing_areas` ADD CONSTRAINT `hris_job_description_non_performing_areas_ibfk_2` FOREIGN KEY (`id_job_description_performing_area`) REFERENCES `hris_job_description_performing_area`(`id_hris_jd_performing_area`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_performing_area` ADD CONSTRAINT `hris_job_description_performing_area_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_qualification` ADD CONSTRAINT `hris_job_description_qualification_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_quality_parameter` ADD CONSTRAINT `hris_job_description_quality_parameter_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_soft_skill` ADD CONSTRAINT `hris_job_description_soft_skill_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_special_requirement` ADD CONSTRAINT `hris_job_description_special_requirement_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_description_technical_skill` ADD CONSTRAINT `hris_job_description_technical_skill_ibfk_1` FOREIGN KEY (`id_hris_job_description`) REFERENCES `hris_job_description`(`id_hris_job_description`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisition_approval_activities` ADD CONSTRAINT `hris_job_requisition_approval_activities_ibfk_1` FOREIGN KEY (`id_job_requisition`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisition_summery` ADD CONSTRAINT `hris_job_requisition_summery_ibfk_1` FOREIGN KEY (`id_projects`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisition_summery` ADD CONSTRAINT `hris_job_requisition_summery_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisition_summery` ADD CONSTRAINT `hris_job_requisition_summery_ibfk_3` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisition_summery` ADD CONSTRAINT `hris_job_requisition_summery_ibfk_4` FOREIGN KEY (`id_employee_nature_type`) REFERENCES `hr_employee_nature_type`(`id_employee_nature_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisition_summery` ADD CONSTRAINT `hris_job_requisition_summery_ibfk_7` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisition_summery_potential_candidate_cv` ADD CONSTRAINT `hris_job_requisition_summery_potential_candidate_cv_ibfk_1` FOREIGN KEY (`id_hris_job_requisition_summery`) REFERENCES `hris_job_requisition_summery`(`id_hris_job_requisition_summery`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisition_summery_potential_candidate_cv` ADD CONSTRAINT `hris_job_requisition_summery_potential_candidate_cv_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_1` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_10` FOREIGN KEY (`id_recruitment_officer`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_11` FOREIGN KEY (`id_hr_recommendation`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_12` FOREIGN KEY (`id_coo_recommendation`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_13` FOREIGN KEY (`id_requester`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_14` FOREIGN KEY (`id_divisional_hr`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_2` FOREIGN KEY (`id_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_3` FOREIGN KEY (`id_grade`) REFERENCES `hr_grades`(`id_grade`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_4` FOREIGN KEY (`id_employee_status`) REFERENCES `hr_employee_nature_type`(`id_employee_nature_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_5` FOREIGN KEY (`id_work_station`) REFERENCES `hr_work_station`(`work_station_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_6` FOREIGN KEY (`id_recommender`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_7` FOREIGN KEY (`id_project_hr`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_8` FOREIGN KEY (`id_coo_chro`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_requisitions` ADD CONSTRAINT `hris_job_requisitions_ibfk_9` FOREIGN KEY (`id_ceo`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_job_responsibilities` ADD CONSTRAINT `hris_job_responsibilities_ibfk_1` FOREIGN KEY (`id_job_requisition`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_man_power_planning` ADD CONSTRAINT `hris_man_power_planning_ibfk_1` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_man_power_planning` ADD CONSTRAINT `hris_man_power_planning_ibfk_2` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_man_power_planning` ADD CONSTRAINT `hris_man_power_planning_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_man_power_planning_details` ADD CONSTRAINT `hris_man_power_planning_details_ibfk_1` FOREIGN KEY (`id_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_man_power_planning_details` ADD CONSTRAINT `hris_man_power_planning_details_ibfk_2` FOREIGN KEY (`id_hris_man_power_planning`) REFERENCES `hris_man_power_planning`(`id_hris_man_power_planning`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_marking_system_master` ADD CONSTRAINT `hris_marking_system_master_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_marking_system_master` ADD CONSTRAINT `hris_marking_system_master_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_media_master` ADD CONSTRAINT `hris_media_master_ibfk_1` FOREIGN KEY (`id_media_type`) REFERENCES `hris_media_type`(`id_media_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_performance_appraisal_date_ranges` ADD CONSTRAINT `hris_performance_appraisal_date_ranges_ibfk_1` FOREIGN KEY (`id_performance_appraisal_setup`) REFERENCES `hris_performance_appraisal_setup`(`id_performance_appraisal_setup`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_performance_appraisal_setup` ADD CONSTRAINT `hris_performance_appraisal_setup_ibfk_1` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_pms_score_master` ADD CONSTRAINT `hris_pms_score_master_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_pms_score_master` ADD CONSTRAINT `hris_pms_score_master_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_benificiary_details` ADD CONSTRAINT `hris_rent_agreement_benificiary_details_ibfk_1` FOREIGN KEY (`id_hris_rent_agreement_details`) REFERENCES `hris_rent_agreement_details`(`id_hris_rent_agreement_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_benificiary_details` ADD CONSTRAINT `hris_rent_agreement_benificiary_details_ibfk_2` FOREIGN KEY (`business_unit_id_benificiary`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_benificiary_details` ADD CONSTRAINT `hris_rent_agreement_benificiary_details_ibfk_3` FOREIGN KEY (`cost_center_id_benificiary`) REFERENCES `cost_center`(`id_cost_center`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_benificiary_details` ADD CONSTRAINT `hris_rent_agreement_benificiary_details_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_1` FOREIGN KEY (`business_unit_id_lesses`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_2` FOREIGN KEY (`representor_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_3` FOREIGN KEY (`representor_vendor_id`) REFERENCES `vendors`(`id_vendors`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_4` FOREIGN KEY (`bank_id`) REFERENCES `banks_original`(`id_banks`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_5` FOREIGN KEY (`branch_id`) REFERENCES `hr_bank_branch_master`(`branch_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_6` FOREIGN KEY (`ap_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_7` FOREIGN KEY (`accountant_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_8` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_details` ADD CONSTRAINT `hris_rent_agreement_details_ibfk_9` FOREIGN KEY (`id_voucher`) REFERENCES `acc_voucher`(`id_voucher`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_lessors_details` ADD CONSTRAINT `hris_rent_agreement_lessors_details_ibfk_1` FOREIGN KEY (`id_hris_rent_agreement_details`) REFERENCES `hris_rent_agreement_details`(`id_hris_rent_agreement_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_lessors_details` ADD CONSTRAINT `hris_rent_agreement_lessors_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_payment_details` ADD CONSTRAINT `hris_rent_agreement_payment_details_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_payment_details` ADD CONSTRAINT `hris_rent_agreement_payment_details_ibfk_2` FOREIGN KEY (`id_hris_rent_agreement_details`) REFERENCES `hris_rent_agreement_details`(`id_hris_rent_agreement_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_payment_details` ADD CONSTRAINT `hris_rent_agreement_payment_details_ibfk_3` FOREIGN KEY (`id_ledgers`) REFERENCES `acc_ledgers`(`id_ledgers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_rent_details` ADD CONSTRAINT `hris_rent_agreement_rent_details_ibfk_1` FOREIGN KEY (`id_hris_rent_agreement_details`) REFERENCES `hris_rent_agreement_details`(`id_hris_rent_agreement_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_agreement_rent_details` ADD CONSTRAINT `hris_rent_agreement_rent_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_attachments_details` ADD CONSTRAINT `hris_rent_generation_attachments_details_ibfk_1` FOREIGN KEY (`id_hris_rent_generation_details`) REFERENCES `hris_rent_generation_details`(`id_hris_rent_generation_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_attachments_details` ADD CONSTRAINT `hris_rent_generation_attachments_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_details` ADD CONSTRAINT `hris_rent_generation_details_ibfk_1` FOREIGN KEY (`id_hris_rent_agreement_details`) REFERENCES `hris_rent_agreement_details`(`id_hris_rent_agreement_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_details` ADD CONSTRAINT `hris_rent_generation_details_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_details` ADD CONSTRAINT `hris_rent_generation_details_ibfk_3` FOREIGN KEY (`ap_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_details` ADD CONSTRAINT `hris_rent_generation_details_ibfk_4` FOREIGN KEY (`accountant_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_details` ADD CONSTRAINT `hris_rent_generation_details_ibfk_5` FOREIGN KEY (`checked_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_details` ADD CONSTRAINT `hris_rent_generation_details_ibfk_6` FOREIGN KEY (`submitted_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_details` ADD CONSTRAINT `hris_rent_generation_details_ibfk_7` FOREIGN KEY (`certified_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_payment_details` ADD CONSTRAINT `hris_rent_generation_payment_details_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_payment_details` ADD CONSTRAINT `hris_rent_generation_payment_details_ibfk_2` FOREIGN KEY (`id_hris_rent_generation_details`) REFERENCES `hris_rent_generation_details`(`id_hris_rent_generation_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_rent_generation_payment_details` ADD CONSTRAINT `hris_rent_generation_payment_details_ibfk_3` FOREIGN KEY (`id_ledgers`) REFERENCES `acc_ledgers`(`id_ledgers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_resident_details` ADD CONSTRAINT `hris_resident_details_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_resident_flat_details` ADD CONSTRAINT `hris_resident_flat_details_ibfk_1` FOREIGN KEY (`id_hris_resident_floor_details`) REFERENCES `hris_resident_floor_details`(`id_hris_resident_floor_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_resident_flat_details` ADD CONSTRAINT `hris_resident_flat_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_resident_flat_room_details` ADD CONSTRAINT `hris_resident_flat_room_details_ibfk_1` FOREIGN KEY (`id_hris_resident_flat_details`) REFERENCES `hris_resident_flat_details`(`id_hris_resident_flat_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_resident_flat_room_details` ADD CONSTRAINT `hris_resident_flat_room_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_resident_floor_details` ADD CONSTRAINT `hris_resident_floor_details_ibfk_1` FOREIGN KEY (`id_hris_resident_details`) REFERENCES `hris_resident_details`(`id_hris_resident_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_resident_floor_details` ADD CONSTRAINT `hris_resident_floor_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_responsibility_matrix_function` ADD CONSTRAINT `hris_responsibility_matrix_function_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_responsibility_matrix_incharge` ADD CONSTRAINT `hris_responsibility_matrix_incharge_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_responsibility_matrix_incharge` ADD CONSTRAINT `hris_responsibility_matrix_incharge_ibfk_2` FOREIGN KEY (`id_hris_responsibility_matrix_sub_function`) REFERENCES `hris_responsibility_matrix_sub_function`(`id_hris_responsibility_matrix_sub_function`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_responsibility_matrix_sub_function` ADD CONSTRAINT `hris_responsibility_matrix_sub_function_ibfk_1` FOREIGN KEY (`id_hris_responsibility_matrix_function`) REFERENCES `hris_responsibility_matrix_function`(`id_hris_responsibility_matrix_function`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_responsibility_sub_function_details` ADD CONSTRAINT `hris_responsibility_sub_function_details_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_responsibility_sub_function_details` ADD CONSTRAINT `hris_responsibility_sub_function_details_ibfk_2` FOREIGN KEY (`id_hris_responsibility_sub_function`) REFERENCES `hris_responsibility_matrix_sub_function`(`id_hris_responsibility_matrix_sub_function`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_special_notes` ADD CONSTRAINT `hris_special_notes_ibfk_1` FOREIGN KEY (`id_job_requisition`) REFERENCES `hris_job_requisitions`(`id_job_requisition`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_details` ADD CONSTRAINT `hris_talent_acquisition_joining_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_details` ADD CONSTRAINT `hris_talent_acquisition_joining_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_details` ADD CONSTRAINT `hris_talent_acquisition_joining_details_ibfk_3` FOREIGN KEY (`id_appointment_letter`) REFERENCES `hris_interview_appraised_candidates`(`id_interview_appraised_candidate`) ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_details` ADD CONSTRAINT `hris_talent_acquisition_joining_details_ibfk_4` FOREIGN KEY (`candidate_id`) REFERENCES `hris_candidate_users`(`id_candidate_user`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_details` ADD CONSTRAINT `hris_talent_acquisition_joining_details_ibfk_5` FOREIGN KEY (`concern_super_visor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_details` ADD CONSTRAINT `hris_talent_acquisition_joining_details_ibfk_6` FOREIGN KEY (`concern_hr_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_handover_documents_details` ADD CONSTRAINT `hris_handover_documents_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_handover_documents_details` ADD CONSTRAINT `hris_handover_documents_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_handover_documents_details` ADD CONSTRAINT `hris_handover_documents_details_ibfk_3` FOREIGN KEY (`id_hris_talent_acquisition_joining_details`) REFERENCES `hris_talent_acquisition_joining_details`(`id_hris_talent_acquisition_joining_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_handover_documents_details` ADD CONSTRAINT `hris_handover_documents_details_ibfk_4` FOREIGN KEY (`id_hris_document_master`) REFERENCES `hris_document_master`(`id_hris_document_master`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_receive_documents_details` ADD CONSTRAINT `hris_receive_documents_details_idfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_receive_documents_details` ADD CONSTRAINT `hris_receive_documents_details_idfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_receive_documents_details` ADD CONSTRAINT `hris_receive_documents_details_idfk_3` FOREIGN KEY (`id_hris_talent_acquisition_joining_details`) REFERENCES `hris_talent_acquisition_joining_details`(`id_hris_talent_acquisition_joining_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_talent_acquisition_joining_receive_documents_details` ADD CONSTRAINT `hris_receive_documents_details_idfk_4` FOREIGN KEY (`id_hris_document_master`) REFERENCES `hris_document_master`(`id_hris_document_master`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_traits_master` ADD CONSTRAINT `hris_traits_master_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_traits_master` ADD CONSTRAINT `hris_traits_master_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_traits_setup_details` ADD CONSTRAINT `hris_traits_setup_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_traits_setup_details` ADD CONSTRAINT `hris_traits_setup_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_traits_setup_details` ADD CONSTRAINT `hris_traits_setup_details_ibfk_3` FOREIGN KEY (`id_designation`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_traits_setup_details` ADD CONSTRAINT `hris_traits_setup_details_ibfk_4` FOREIGN KEY (`id_hris_traits_master`) REFERENCES `hris_traits_master`(`id_hris_traits_master`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_attachments_details` ADD CONSTRAINT `hris_utility_generation_attachments_details_ibfk_1` FOREIGN KEY (`id_hris_utility_generation_details`) REFERENCES `hris_utility_generation_details`(`id_hris_utility_generation_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_attachments_details` ADD CONSTRAINT `hris_utility_generation_attachments_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_charge_details` ADD CONSTRAINT `hris_utility_generation_charge_details_ibfk_1` FOREIGN KEY (`id_hris_utility_generation_details`) REFERENCES `hris_utility_generation_details`(`id_hris_utility_generation_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_charge_details` ADD CONSTRAINT `hris_utility_generation_charge_details_ibfk_2` FOREIGN KEY (`id_hris_utility_service`) REFERENCES `hris_utility_service`(`id_hris_utility_service`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_charge_details` ADD CONSTRAINT `hris_utility_generation_charge_details_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_details` ADD CONSTRAINT `hris_utility_generation_details_ibfk_1` FOREIGN KEY (`id_hris_rent_agreement_details`) REFERENCES `hris_rent_agreement_details`(`id_hris_rent_agreement_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_details` ADD CONSTRAINT `hris_utility_generation_details_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_details` ADD CONSTRAINT `hris_utility_generation_details_ibfk_3` FOREIGN KEY (`ap_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_details` ADD CONSTRAINT `hris_utility_generation_details_ibfk_4` FOREIGN KEY (`accountant_employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_details` ADD CONSTRAINT `hris_utility_generation_details_ibfk_5` FOREIGN KEY (`submitted_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_details` ADD CONSTRAINT `hris_utility_generation_details_ibfk_6` FOREIGN KEY (`checked_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_details` ADD CONSTRAINT `hris_utility_generation_details_ibfk_7` FOREIGN KEY (`certified_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_payment_details` ADD CONSTRAINT `hris_utility_generation_payment_details_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_payment_details` ADD CONSTRAINT `hris_utility_generation_payment_details_ibfk_2` FOREIGN KEY (`id_hris_utility_generation_details`) REFERENCES `hris_utility_generation_details`(`id_hris_utility_generation_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_generation_payment_details` ADD CONSTRAINT `hris_utility_generation_payment_details_ibfk_3` FOREIGN KEY (`id_ledgers`) REFERENCES `acc_ledgers`(`id_ledgers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_utility_service` ADD CONSTRAINT `hris_utility_service_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_work_station_details` ADD CONSTRAINT `hris_work_station_details_ibfk_1` FOREIGN KEY (`work_station_id`) REFERENCES `hr_work_station`(`work_station_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_work_station_details` ADD CONSTRAINT `hris_work_station_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_work_station_flat_details` ADD CONSTRAINT `hris_work_station_flat_details_ibfk_1` FOREIGN KEY (`id_hris_work_station_floor_details`) REFERENCES `hris_work_station_floor_details`(`id_hris_work_station_floor_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_work_station_flat_details` ADD CONSTRAINT `hris_work_station_flat_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_work_station_flat_room_details` ADD CONSTRAINT `hris_work_station_flat_room_details_ibfk_1` FOREIGN KEY (`id_hris_work_station_flat_details`) REFERENCES `hris_work_station_flat_details`(`id_hris_work_station_flat_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_work_station_flat_room_details` ADD CONSTRAINT `hris_work_station_flat_room_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_work_station_floor_details` ADD CONSTRAINT `hris_work_station_floor_details_ibfk_1` FOREIGN KEY (`id_hris_work_station_details`) REFERENCES `hris_work_station_details`(`id_hris_work_station_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hris_work_station_floor_details` ADD CONSTRAINT `hris_work_station_floor_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_1` FOREIGN KEY (`id_categories`) REFERENCES `categories`(`id_categories`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_10` FOREIGN KEY (`id_secondary_unit`) REFERENCES `unit`(`id_unit`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_2` FOREIGN KEY (`id_unit`) REFERENCES `unit`(`id_unit`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_4` FOREIGN KEY (`id_size`) REFERENCES `size`(`id_size`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_5` FOREIGN KEY (`id_color`) REFERENCES `color`(`id_color`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_6` FOREIGN KEY (`id_specifications`) REFERENCES `specifications`(`id_specifications`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_7` FOREIGN KEY (`id_models`) REFERENCES `models`(`id_models`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_8` FOREIGN KEY (`id_products`) REFERENCES `products`(`id_products`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inv_items` ADD CONSTRAINT `inv_items_ibfk_9` FOREIGN KEY (`id_default_image`) REFERENCES `inv_item_images`(`id_inv_item_images`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_advance` ADD CONSTRAINT `por_advance_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_advance` ADD CONSTRAINT `por_advance_ibfk_2` FOREIGN KEY (`id_cur_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_advance` ADD CONSTRAINT `por_advance_ibfk_3` FOREIGN KEY (`approved_supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_advance` ADD CONSTRAINT `por_advance_ibfk_4` FOREIGN KEY (`approved_hr_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_app_fcm_tokens` ADD CONSTRAINT `por_app_fcm_tokens_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_attendance` ADD CONSTRAINT `por_attendance_ibfk_1` FOREIGN KEY (`line_supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_attendance` ADD CONSTRAINT `por_attendance_ibfk_2` FOREIGN KEY (`hr_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_certificate_master` ADD CONSTRAINT `por_certificate_master_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_certificate_master` ADD CONSTRAINT `por_certificate_master_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_certificate_request` ADD CONSTRAINT `por_certificate_request_ibfk_1` FOREIGN KEY (`requested_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_certificate_request` ADD CONSTRAINT `por_certificate_request_ibfk_2` FOREIGN KEY (`id_por_certificate_master`) REFERENCES `por_certificate_master`(`id_por_certificate_master`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_compensatory_leaves` ADD CONSTRAINT `por_compensatory_leaves_ibfk_1` FOREIGN KEY (`line_supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_compensatory_leaves` ADD CONSTRAINT `por_compensatory_leaves_ibfk_2` FOREIGN KEY (`reporting_supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_compensatory_leaves` ADD CONSTRAINT `por_compensatory_leaves_ibfk_3` FOREIGN KEY (`bu_hr_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee` ADD CONSTRAINT `por_employee_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_appraisal_details` ADD CONSTRAINT `por_employee_appraisal_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_appraisal_details` ADD CONSTRAINT `por_employee_appraisal_details_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_appraisal_details` ADD CONSTRAINT `por_employee_appraisal_details_ibfk_3` FOREIGN KEY (`appraisal_head_pm_pd_ceo_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_appraisal_details` ADD CONSTRAINT `por_employee_appraisal_details_ibfk_4` FOREIGN KEY (`id_performance_appraisal_setup`) REFERENCES `hris_performance_appraisal_setup`(`id_performance_appraisal_setup`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_appraisal_target_details` ADD CONSTRAINT `por_employee_appraisal_target_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_appraisal_target_details` ADD CONSTRAINT `por_employee_appraisal_target_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_appraisal_target_details` ADD CONSTRAINT `por_employee_appraisal_target_details_ibfk_3` FOREIGN KEY (`id_por_employee_appraisal_details`) REFERENCES `por_employee_appraisal_details`(`id_por_employee_appraisal_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_car_ait` ADD CONSTRAINT `por_employee_car_ait_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_car_ait` ADD CONSTRAINT `por_employee_car_ait_ibfk_2` FOREIGN KEY (`approver_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_car_ait` ADD CONSTRAINT `por_employee_car_ait_ibfk_3` FOREIGN KEY (`id_fiscal_year`) REFERENCES `acc_fiscal_year`(`id_fiscal_year`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_hr` ADD CONSTRAINT `por_employee_hr_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_hr_details` ADD CONSTRAINT `por_employee_hr_details_ibfk_1` FOREIGN KEY (`hr_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_hr_details` ADD CONSTRAINT `por_employee_hr_details_ibfk_2` FOREIGN KEY (`id_employee_hr`) REFERENCES `por_employee_hr`(`id_employee_hr`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_hr_details` ADD CONSTRAINT `por_employee_hr_details_ibfk_3` FOREIGN KEY (`deleted_by`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_hr_details` ADD CONSTRAINT `por_employee_hr_details_ibfk_4` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_review` ADD CONSTRAINT `por_employee_review_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_review` ADD CONSTRAINT `por_employee_review_ibfk_2` FOREIGN KEY (`review_submitted_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_supervisor` ADD CONSTRAINT `por_employee_supervisor_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_supervisor` ADD CONSTRAINT `por_employee_supervisor_ibfk_2` FOREIGN KEY (`supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_tin_info` ADD CONSTRAINT `por_employee_tin_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_employee_tin_info` ADD CONSTRAINT `por_employee_tin_info_ibfk_2` FOREIGN KEY (`id_hr_tax_area_type`) REFERENCES `hr_tax_area_type`(`id_hr_tax_area_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_details` ADD CONSTRAINT `por_it_goods_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_details` ADD CONSTRAINT `por_it_goods_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_details` ADD CONSTRAINT `por_it_goods_details_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_details` ADD CONSTRAINT `por_it_goods_details_ibfk_4` FOREIGN KEY (`designation_id`) REFERENCES `hr_designation_master`(`designation_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_details` ADD CONSTRAINT `por_it_goods_details_ibfk_5` FOREIGN KEY (`id_department`) REFERENCES `hr_departments`(`id_department`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_details` ADD CONSTRAINT `por_it_goods_details_ibfk_6` FOREIGN KEY (`concern_it_person_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_items_details` ADD CONSTRAINT `por_it_goods_items_details_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_items_details` ADD CONSTRAINT `por_it_goods_items_details_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_items_details` ADD CONSTRAINT `por_it_goods_items_details_ibfk_3` FOREIGN KEY (`id_por_it_goods_details`) REFERENCES `por_it_goods_details`(`id_por_it_goods_details`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_it_goods_items_details` ADD CONSTRAINT `por_it_goods_items_details_ibfk_4` FOREIGN KEY (`id_inv_items`) REFERENCES `inv_items`(`id_inv_items`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_dimensions` ADD CONSTRAINT `por_job_description_additional_dimensions_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_dimensions_history` ADD CONSTRAINT `por_job_description_additional_dimensions_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_dimension`) REFERENCES `por_job_description_additional_dimensions`(`id_job_description_additional_dimension`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_experiences` ADD CONSTRAINT `por_job_description_additional_experiences_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_experiences_history` ADD CONSTRAINT `por_job_description_additional_experiences_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_experience`) REFERENCES `por_job_description_additional_experiences`(`id_job_description_additional_experience`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_external_customers` ADD CONSTRAINT `por_job_description_additional_external_customers_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_external_customers_history` ADD CONSTRAINT `por_job_description_additional_external_customers_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_external_customer`) REFERENCES `por_job_description_additional_external_customers`(`id_job_description_additional_external_customer`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_internal_customers` ADD CONSTRAINT `por_job_description_additional_internal_customers_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_internal_customers_history` ADD CONSTRAINT `por_job_description_additional_internal_customers_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_internal_customer`) REFERENCES `por_job_description_additional_internal_customers`(`id_job_description_additional_internal_customer`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_performing_areas` ADD CONSTRAINT `por_job_description_additional_performing_areas_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_performing_areas_history` ADD CONSTRAINT `por_job_description_additional_performing_areas_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_performing_area`) REFERENCES `por_job_description_additional_performing_areas`(`id_job_description_additional_performing_area`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_qualifications` ADD CONSTRAINT `por_job_description_additional_qualifications_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_qualifications_history` ADD CONSTRAINT `por_job_description_additional_qualifications_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_qualification`) REFERENCES `por_job_description_additional_qualifications`(`id_job_description_additional_qualification`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_quality_parameters` ADD CONSTRAINT `por_job_description_additional_quality_parameters_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_quality_parameters_history` ADD CONSTRAINT `por_job_description_additional_quality_parameters_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_quality_parameter`) REFERENCES `por_job_description_additional_quality_parameters`(`id_job_description_additional_quality_parameter`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_soft_skills` ADD CONSTRAINT `por_job_description_additional_soft_skills_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_soft_skills_history` ADD CONSTRAINT `por_job_description_additional_soft_skills_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_soft_skill`) REFERENCES `por_job_description_additional_soft_skills`(`id_job_description_additional_soft_skill`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_special_requirements` ADD CONSTRAINT `por_job_description_additional_special_requirements_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_special_requirements_history` ADD CONSTRAINT `por_job_description_asrh_ibfk_1` FOREIGN KEY (`id_job_description_additional_special_requirement`) REFERENCES `por_job_description_additional_special_requirements`(`id_job_description_additional_special_requirement`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_tech_skills` ADD CONSTRAINT `por_job_description_additional_tech_skills_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_description_additional_tech_skills_history` ADD CONSTRAINT `por_job_description_additional_tech_skills_history_ibfk_1` FOREIGN KEY (`id_job_description_additional_tech_skill`) REFERENCES `por_job_description_additional_tech_skills`(`id_job_description_additional_tech_skill`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_requisitions` ADD CONSTRAINT `por_job_requisitions_ibfk_3` FOREIGN KEY (`id_business_unit`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_job_requisitions` ADD CONSTRAINT `por_job_requisitions_ibfk_9` FOREIGN KEY (`submitted_by`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_leave` ADD CONSTRAINT `por_leave_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_leave` ADD CONSTRAINT `por_leave_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects`(`id_projects`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_leave` ADD CONSTRAINT `por_leave_ibfk_3` FOREIGN KEY (`id_leave_type`) REFERENCES `hr_leave_type`(`id_leave_type`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_leave` ADD CONSTRAINT `por_leave_ibfk_5` FOREIGN KEY (`hr_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_leave` ADD CONSTRAINT `por_leave_ibfk_6` FOREIGN KEY (`line_supervisor_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_leave` ADD CONSTRAINT `por_leave_ibfk_7` FOREIGN KEY (`leave_hr_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_leave_details` ADD CONSTRAINT `por_leave_details_ibfk_1` FOREIGN KEY (`id_por_leave`) REFERENCES `por_leave`(`id_por_leave`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise` ADD CONSTRAINT `por_performance_appraise_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise` ADD CONSTRAINT `por_performance_appraise_ibfk_2` FOREIGN KEY (`id_performance_appraisal_setup`) REFERENCES `hris_performance_appraisal_setup`(`id_performance_appraisal_setup`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise` ADD CONSTRAINT `por_performance_appraise_ibfk_3` FOREIGN KEY (`id_hris_pms_score_master`) REFERENCES `hris_pms_score_master`(`id_hris_pms_score_master`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise_achievements` ADD CONSTRAINT `por_performance_appraise_achievements_ibfk_1` FOREIGN KEY (`id_performance_appraise`) REFERENCES `por_performance_appraise`(`id_performance_appraise`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise_details` ADD CONSTRAINT `por_performance_appraise_details_ibfk_1` FOREIGN KEY (`id_performance_appraisal_date_range`) REFERENCES `hris_performance_appraisal_date_ranges`(`id_performance_appraisal_date_range`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise_details` ADD CONSTRAINT `por_performance_appraise_details_ibfk_2` FOREIGN KEY (`id_appraiser`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise_details` ADD CONSTRAINT `por_performance_appraise_details_ibfk_3` FOREIGN KEY (`id_performance_appraise`) REFERENCES `por_performance_appraise`(`id_performance_appraise`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise_details` ADD CONSTRAINT `por_performance_appraise_details_ibfk_4` FOREIGN KEY (`id_performance_appraisal_date_range`) REFERENCES `hris_performance_appraisal_date_ranges`(`id_performance_appraisal_date_range`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise_traits` ADD CONSTRAINT `por_performance_appraise_traits_ibfk_1` FOREIGN KEY (`id_hris_traits_master`) REFERENCES `hris_traits_master`(`id_hris_traits_master`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `por_performance_appraise_traits` ADD CONSTRAINT `por_performance_appraise_traits_ibfk_2` FOREIGN KEY (`id_performance_appraise`) REFERENCES `por_performance_appraise`(`id_performance_appraise`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `fk_projects_companies1` FOREIGN KEY (`id_companies`) REFERENCES `companies`(`id_companies`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `hr_employee`(`employee_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_active_status` ON `acc_fiscal_year` (`active_status`);--> statement-breakpoint
CREATE INDEX `bank_cash_type` ON `acc_ledgers` (`bank_cash_type`);--> statement-breakpoint
CREATE INDEX `expense_type` ON `acc_ledgers` (`expense_type`);--> statement-breakpoint
CREATE INDEX `idx_active_status` ON `acc_ledgers` (`active_status`);--> statement-breakpoint
CREATE INDEX `idx_category` ON `acc_ledgers` (`category`);--> statement-breakpoint
CREATE INDEX `idx_id_reference` ON `acc_ledgers` (`id_reference`);--> statement-breakpoint
CREATE INDEX `idx_ledger_level` ON `acc_ledgers` (`ledger_level`);--> statement-breakpoint
CREATE INDEX `idx_ledger_name` ON `acc_ledgers` (`ledger_name`);--> statement-breakpoint
CREATE INDEX `idx_ledger_type` ON `acc_ledgers` (`ledger_type`);--> statement-breakpoint
CREATE INDEX `idx_parent_id` ON `acc_ledgers` (`parent_id`);--> statement-breakpoint
CREATE INDEX `idx_reference_type` ON `acc_ledgers` (`reference_type`);--> statement-breakpoint
CREATE INDEX `bill_invoice_type` ON `acc_voucher` (`bill_invoice_type`);--> statement-breakpoint
CREATE INDEX `id_bill_invoice` ON `acc_voucher` (`id_bill_invoice`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `acc_voucher` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_company` ON `acc_voucher` (`id_company`);--> statement-breakpoint
CREATE INDEX `id_ref` ON `acc_voucher` (`id_ref`);--> statement-breakpoint
CREATE INDEX `voucher_no` ON `acc_voucher` (`voucher_no`);--> statement-breakpoint
CREATE INDEX `fk_cost_center_projects1_idx` ON `cost_center` (`id_projects`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_absent_entry` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hr_absent_entry_file_upload` ON `hr_absent_entry` (`id_hr_absent_entry_file_upload`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_absent_setup` (`changes_by`);--> statement-breakpoint
CREATE INDEX `hr_absent_template_id` ON `hr_absent_setup` (`hr_absent_template_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_absent_setup` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_absent_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_absent_template` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_ledger` ON `hr_accounting_setup` (`id_ledger`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_accounting_setup` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_advance_template` ON `hr_advance` (`id_advance_template`);--> statement-breakpoint
CREATE INDEX `id_cur_business_unit` ON `hr_advance` (`id_cur_business_unit`);--> statement-breakpoint
CREATE INDEX `id_cur_sal_bus_unit` ON `hr_advance` (`id_cur_sal_bus_unit`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_advance` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_por_advance` ON `hr_advance` (`id_por_advance`);--> statement-breakpoint
CREATE INDEX `id_voucher` ON `hr_advance` (`id_voucher`);--> statement-breakpoint
CREATE INDEX `id_advance` ON `hr_advance_payment_history` (`id_advance`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_advance_payment_history` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_advance_payment_history` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_advance_payment_history` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_advance_payment_template` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_attendance` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_attendance` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_user_operator` ON `hr_attendance` (`id_user_operator`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_attendance_calculation_info` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_calendar_setup` ON `hr_attendance_calculation_info` (`id_calendar_setup`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_attendance_calculation_info` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_attendance_calendar_file_import` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_attendance_calendar_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_attendance_entry` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_attendance_entry` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hr_attendance_file_import` ON `hr_attendance_entry_error` (`id_hr_attendance_file_import`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_attendance_entry_error` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_attendance_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `hr_attendance_file_import_id` ON `hr_attendance_file_import_errors` (`hr_attendance_file_import_id`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_attendance_file_import_errors` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_attendance_monthly` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_attendance_monthly` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_attendance_monthly` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_hr_attendance` ON `hr_attendance_update_history` (`id_hr_attendance`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_attendance_update_history` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_bank_branch_master` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_bank_master` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_bonus_setup_variable_earning_head1_idx` ON `hr_bonus_setup` (`bonus_type_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_bonus_setup` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_bonus_setup` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_bonus_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_voucher` ON `hr_bonus_setup` (`id_voucher`);--> statement-breakpoint
CREATE INDEX `bonus_setup_id` ON `hr_bonus_setup_history` (`bonus_setup_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_bonus_setup_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `id_city` ON `hr_business_unit` (`id_city`);--> statement-breakpoint
CREATE INDEX `id_company` ON `hr_business_unit` (`id_company`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_business_unit` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_calendar_setup` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_city` (`id_user`);--> statement-breakpoint
CREATE INDEX `group_id` ON `hr_company_setup` (`group_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_company_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_compensatory_leave` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_compensatory_leave` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_compensatory_leave` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_contact_employee_business_unit1_idx` ON `hr_contact_employee_details` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `fk_contact_employee_employee1_idx` ON `hr_contact_employee_details` (`employee_id`);--> statement-breakpoint
CREATE INDEX `fk_contact_employee_users1_idx` ON `hr_contact_employee_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_deduction_heads` (`id_users`);--> statement-breakpoint
CREATE INDEX `deduction_heads_id` ON `hr_deduction_heads_history` (`deduction_heads_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_deduction_heads_history` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_denomination` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_departments` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_designation_master` (`id_users`);--> statement-breakpoint
CREATE INDEX `earning_heads_id` ON `hr_earning_heads_history` (`earning_heads_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_earning_heads_history` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_education_employee1_idx` ON `hr_education` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_education` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_education_concentrations` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_education_levels` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_employee_bonus_info_bonus_setup1_idx` ON `hr_employee_bonus_info` (`bonus_setup_id`);--> statement-breakpoint
CREATE INDEX `fk_employee_bonus_info_employee1_idx` ON `hr_employee_bonus_info` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_bonus_info` (`id_users`);--> statement-breakpoint
CREATE INDEX `bonus_setup_id` ON `hr_employee_bonus_info_history` (`bonus_setup_id`);--> statement-breakpoint
CREATE INDEX `employee_bonus_info_id` ON `hr_employee_bonus_info_individual_history` (`employee_bonus_info_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_employee_bonus_info_individual_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_employee_cost_center_setup` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_cost_center_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_cost_center` ON `hr_employee_cost_center_setup_details` (`id_cost_center`);--> statement-breakpoint
CREATE INDEX `id_hr_employee_cost_center_setup` ON `hr_employee_cost_center_setup_details` (`id_hr_employee_cost_center_setup`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_cost_center_setup_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_employee_description` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_employee_education_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_education_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_employee_experience_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_experience_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_employee_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_employee_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_employee_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_employee_insert_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_insert_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_nature_type` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_employee_salary_business_unit1_idx` ON `hr_employee_salary_business_unit` (`organization_setup_id`);--> statement-breakpoint
CREATE INDEX `fk_employee_salary_business_unit_idx` ON `hr_employee_salary_business_unit` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_salary_business_unit` (`id_users`);--> statement-breakpoint
CREATE INDEX `salary_business_unit_id` ON `hr_employee_salary_business_unit` (`salary_business_unit_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_employee_salary_business_unit_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `organization_setup_id` ON `hr_employee_salary_business_unit_history` (`organization_setup_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_employee_salary_business_unit_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `fk_employee_salary_employee1_idx` ON `hr_employee_salary_info` (`employee_id`);--> statement-breakpoint
CREATE INDEX `fk_employee_salary_pay_structure_template_details1_idx` ON `hr_employee_salary_info` (`pay_structure_template_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_salary_info` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_structure_setup_records_id` ON `hr_employee_salary_info` (`pay_structure_setup_records_id`);--> statement-breakpoint
CREATE INDEX `pay_structure_setup_records_id` ON `hr_employee_salary_info_history` (`pay_structure_setup_records_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_employee_salary_info_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_employee_tax_changes_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_employee_tax_changes_history` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_recalculate` ON `hr_employee_tax_changes_history` (`id_hr_tax_recalculate`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_tax_changes_history` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_structure_setup_records_id` ON `hr_employee_tax_changes_history` (`pay_structure_setup_records_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_employee_tax_info` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_employee_tax_info` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_tax_info` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_employee_tax_info_details` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hr_employee_tax_info` ON `hr_employee_tax_info_details` (`id_hr_employee_tax_info`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_tax_info_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `current_business_unit_id` ON `hr_employee_transfer` (`current_business_unit_id`);--> statement-breakpoint
CREATE INDEX `fk_employee_transfer_employee1_idx` ON `hr_employee_transfer` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_transfer` (`id_users`);--> statement-breakpoint
CREATE INDEX `previous_business_unit_id` ON `hr_employee_transfer` (`previous_business_unit_id`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_employee_update_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_employee_update_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_employee_weekends` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hr_weekend` ON `hr_employee_weekends` (`id_hr_weekend`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_employee_weekends` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_equivalent_designation` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hr_education_levels` ON `hr_exam_titles` (`id_hr_education_levels`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_exam_titles` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_experience_employee1_idx` ON `hr_experience` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_experience` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_farewell` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_farewell` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_final_settlement_employee1_idx` ON `hr_final_settlement` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_final_settlement` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_deduction_voucher` ON `hr_final_settlement` (`id_deduction_voucher`);--> statement-breakpoint
CREATE INDEX `id_earning_voucher` ON `hr_final_settlement` (`id_earning_voucher`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_final_settlement` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_final_settlement_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `final_settlement_id` ON `hr_final_settlement_history` (`final_settlement_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_final_settlement_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_final_settlement_performance_status_providers` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hr_final_settlement` ON `hr_final_settlement_performance_status_providers` (`id_hr_final_settlement`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_finger_print_marge_file_import` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_finger_print_marge_record` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_finger_print_marge_file_import` ON `hr_finger_print_marge_record` (`id_finger_print_marge_file_import`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_finger_print_marge_record` (`id_users`);--> statement-breakpoint
CREATE INDEX `AttendanceTimestamp` ON `hr_fp_machine_attendance_logs` (`attendance_timestamp`);--> statement-breakpoint
CREATE INDEX `MachineUserId` ON `hr_fp_machine_attendance_logs` (`machine_user_id`);--> statement-breakpoint
CREATE INDEX `AttendanceTimestamp` ON `hr_fp_machine_attendance_logs_copy` (`attendance_timestamp`);--> statement-breakpoint
CREATE INDEX `MachineUserId` ON `hr_fp_machine_attendance_logs_copy` (`machine_user_id`);--> statement-breakpoint
CREATE INDEX `idx_id_inv_pages_permission` ON `hr_fp_user_permission` (`id_hr_fp_pages`);--> statement-breakpoint
CREATE INDEX `idx_id_users_3` ON `hr_fp_user_permission` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_grades` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_group_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_holding_heads` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_holding_heads` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_holiday_type` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_holiday_type` ON `hr_holidays` (`id_holiday_type`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_holidays` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_increment_file_import` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_increment_file_import` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_increment_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_increment_records` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_increment_file_import` ON `hr_increment_records` (`id_increment_file_import`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_increment_records` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_job_description` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_job_description` ON `hr_job_performance_area` (`id_job_description`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_job_performance_area` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_late_present` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_leave_application` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_leave_policy` ON `hr_leave_application` (`id_leave_policy`);--> statement-breakpoint
CREATE INDEX `id_leave_type` ON `hr_leave_application` (`id_leave_type`);--> statement-breakpoint
CREATE INDEX `id_por_leave` ON `hr_leave_application` (`id_por_leave`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_leave_application` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_leave_application` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_leave_application_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_leave_application_file_import` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_leave_balance` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_leave_balance` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_leave_policy` ON `hr_leave_balance` (`id_leave_policy`);--> statement-breakpoint
CREATE INDEX `id_hr_leave_balance` ON `hr_leave_balance_details` (`id_hr_leave_balance`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_leave_balance_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_leave_calculation` ON `hr_leave_calculation_details` (`id_leave_calculation`);--> statement-breakpoint
CREATE INDEX `id_hr_leave_type` ON `hr_leave_encashment` (`id_hr_leave_type`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_leave_encashment` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_leave_encashment` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_voucher` ON `hr_leave_encashment` (`id_voucher`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_leave_encashment_details` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hr_leave_encashment` ON `hr_leave_encashment_details` (`id_hr_leave_encashment`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_leave_encashment_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_structure_setup_records_id` ON `hr_leave_encashment_details` (`pay_structure_setup_records_id`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_leave_encashment_history` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_leave_type` ON `hr_leave_encashment_history` (`id_leave_type`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_leave_encashment_history` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_leave_encashment_history` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_leave_encashment_setup` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_leave_type` ON `hr_leave_encashment_setup` (`id_leave_type`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_leave_encashment_setup` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_leave_policy_template` ON `hr_leave_policy` (`id_leave_policy_template`);--> statement-breakpoint
CREATE INDEX `id_leave_type` ON `hr_leave_policy` (`id_leave_type`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_leave_policy` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_leave_policy` ON `hr_leave_policy_update_history` (`id_leave_policy`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_leave_type` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_leave_year` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_hr_leave_year` ON `hr_leave_year_history` (`id_hr_leave_year`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_leave_year_history` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_leaving_dates` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_leave_application` ON `hr_leaving_dates` (`id_leave_application`);--> statement-breakpoint
CREATE INDEX `id_leave_type` ON `hr_leaving_dates` (`id_leave_type`);--> statement-breakpoint
CREATE INDEX `earning_heads_id` ON `hr_man_power_budget` (`earning_heads_id`);--> statement-breakpoint
CREATE INDEX `id_hr_man_power_budget_file_import` ON `hr_man_power_budget` (`id_hr_man_power_budget_file_import`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_man_power_budget` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_man_power_budget` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_man_power_budget_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_man_power_budget_file_import` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_manual_overtime` (`employee_id`);--> statement-breakpoint
CREATE INDEX `employee_salary_info_id` ON `hr_manual_overtime` (`employee_salary_info_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_manual_overtime` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_hr_manual_overtime_entry` ON `hr_manual_overtime` (`id_hr_manual_overtime_entry`);--> statement-breakpoint
CREATE INDEX `id_hr_overtime_file_import` ON `hr_manual_overtime` (`id_hr_overtime_file_import`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_manual_overtime` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_manual_overtime_entry` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_manual_overtime_entry` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_voucher` ON `hr_manual_overtime_entry` (`id_voucher`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_manual_overtime_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_manual_overtime_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `overtime_entry_id` ON `hr_manual_overtime_history` (`overtime_entry_id`);--> statement-breakpoint
CREATE INDEX `previous_id_user` ON `hr_manual_overtime_history` (`previous_id_user`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_menu` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_hr_menu` ON `hr_menu_submenu` (`id_hr_menu`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_mobile_banking_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `company_setup_id` ON `hr_organization_setup` (`company_setup_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_departments1_idx` ON `hr_organization_setup` (`id_department`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_designation_master1_idx` ON `hr_organization_setup` (`employee_desig_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_designation_master2_idx` ON `hr_organization_setup` (`line_supervisor_desig_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_designation_master3_idx` ON `hr_organization_setup` (`reporting_supervisor_desig_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_employee1_idx` ON `hr_organization_setup` (`employee_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_employee2_idx` ON `hr_organization_setup` (`line_supervisor_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_employee3_idx` ON `hr_organization_setup` (`reporting_supervisor_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_employee4_idx` ON `hr_organization_setup` (`dept_head_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_employee_nature_type1_idx` ON `hr_organization_setup` (`id_employee_nature_type`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_equivalent_designation1_idx` ON `hr_organization_setup` (`equivalent_designation_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_shift_master1_idx` ON `hr_organization_setup` (`shift_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_work_station1_idx` ON `hr_organization_setup` (`work_station_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_organization_setup` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_hr_profession_type` ON `hr_organization_setup` (`id_hr_profession_type`);--> statement-breakpoint
CREATE INDEX `id_sub_function` ON `hr_organization_setup` (`id_sub_function`);--> statement-breakpoint
CREATE INDEX `works_for_bu_id` ON `hr_organization_setup` (`works_for_bu_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_organization_setup_change_records` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_organization_setup_change_records` (`id_users`);--> statement-breakpoint
CREATE INDEX `organization_setup_id` ON `hr_organization_setup_change_records` (`organization_setup_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_organization_setup_change_records` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_organization_setup_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_organization_setup_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_organization_setup_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_organization_setup_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `organization_setup_id` ON `hr_organization_setup_history` (`organization_setup_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_organization_setup_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_over_stay_setup_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_over_stay_setup_file_import` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_overstay_entry_monthly` (`employee_id`);--> statement-breakpoint
CREATE INDEX `employee_salary_info_id` ON `hr_overstay_entry_monthly` (`employee_salary_info_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_overstay_entry_monthly` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_hr_overstay_file_import` ON `hr_overstay_entry_monthly` (`id_hr_overstay_file_import`);--> statement-breakpoint
CREATE INDEX `id_voucher` ON `hr_overstay_entry_monthly` (`id_voucher`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_overstay_entry_monthly_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_overstay_entry_monthly_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_overstay_entry_monthly` ON `hr_overstay_entry_monthly_history` (`id_overstay_entry_monthly`);--> statement-breakpoint
CREATE INDEX `previous_id_user` ON `hr_overstay_entry_monthly_history` (`previous_id_user`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_overstay_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_overstay_setup` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_overstay_setup` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_overstay_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `overstay_template_id` ON `hr_overstay_setup` (`overstay_template_id`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_overstay_setup_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_overstay_setup_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `overstay_setup_id` ON `hr_overstay_setup_history` (`overstay_setup_id`);--> statement-breakpoint
CREATE INDEX `overstay_template_id` ON `hr_overstay_setup_history` (`overstay_template_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_overstay_template` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_overtime` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_overtime` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_overtime` (`id_users`);--> statement-breakpoint
CREATE INDEX `overtime_template_id` ON `hr_overtime` (`overtime_template_id`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_overtime_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_overtime_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `overtime_id` ON `hr_overtime_history` (`overtime_id`);--> statement-breakpoint
CREATE INDEX `overtime_template_id` ON `hr_overtime_history` (`overtime_template_id`);--> statement-breakpoint
CREATE INDEX `previous_id_user` ON `hr_overtime_history` (`previous_id_user`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_overtime_setup_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_overtime_setup_file_import` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_overtime_template` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_menu_submenu` ON `hr_page_permission` (`id_menu_submenu`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_page_permission` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_page_permission` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_user_permitted_by` ON `hr_page_permission` (`id_user_permitted_by`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_pay_slip_details_individual_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `pay_slip_generation_id` ON `hr_pay_slip_details_individual_history` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_pay_slip_details_individual_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `bank_id` ON `hr_pay_slip_employee_info` (`bank_id`);--> statement-breakpoint
CREATE INDEX `branch_id` ON `hr_pay_slip_employee_info` (`branch_id`);--> statement-breakpoint
CREATE INDEX `company_setup_id` ON `hr_pay_slip_employee_info` (`company_setup_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_designation_master1_idx` ON `hr_pay_slip_employee_info` (`employee_desig_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_employee1_idx` ON `hr_pay_slip_employee_info` (`employee_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_employee_nature_type1_idx` ON `hr_pay_slip_employee_info` (`id_employee_nature_type`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_equivalent_designation1_idx` ON `hr_pay_slip_employee_info` (`equivalent_designation_id`);--> statement-breakpoint
CREATE INDEX `fk_organization_setup_work_station1_idx` ON `hr_pay_slip_employee_info` (`work_station_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_pay_slip_employee_info` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_grade` ON `hr_pay_slip_employee_info` (`id_grade`);--> statement-breakpoint
CREATE INDEX `id_pay_slip_generation` ON `hr_pay_slip_employee_info` (`id_pay_slip_generation`);--> statement-breakpoint
CREATE INDEX `mobile_banking_type_id` ON `hr_pay_slip_employee_info` (`mobile_banking_type_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_pay_slip_generation` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_calendar_setup` ON `hr_pay_slip_generation` (`id_calendar_setup`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_slip_generation` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_voucher` ON `hr_pay_slip_generation` (`id_voucher`);--> statement-breakpoint
CREATE INDEX `fk_generation_details_employee1_idx` ON `hr_pay_slip_generation_details` (`employee_id`);--> statement-breakpoint
CREATE INDEX `fk_generation_details_pay_slip_generation1_idx` ON `hr_pay_slip_generation_details` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_pay_slip_generation_details` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_slip_generation_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_slip_generation_id` ON `hr_pay_slip_generation_details_history` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_pay_slip_generation_details_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `pay_slip_generation_id` ON `hr_pay_slip_generation_history` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_pay_slip_generation_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_pay_slip_generation_info` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_slip_generation_info` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_slip_generation_id` ON `hr_pay_slip_generation_info` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `fk_generation_details_employee1_idx` ON `hr_pay_slip_generation_split_cost_center` (`employee_id`);--> statement-breakpoint
CREATE INDEX `fk_generation_details_pay_slip_generation1_idx` ON `hr_pay_slip_generation_split_cost_center` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_pay_slip_generation_split_cost_center` (`cost_center_business_unit_id`);--> statement-breakpoint
CREATE INDEX `id_cost_center` ON `hr_pay_slip_generation_split_cost_center` (`id_cost_center`);--> statement-breakpoint
CREATE INDEX `pay_slip_generation_id` ON `hr_pay_slip_generation_split_cost_center` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_pay_structure_amount_update_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `pay_structure_setup_id` ON `hr_pay_structure_amount_update_history` (`pay_structure_setup_id`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_pay_structure_records_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_pay_structure_records_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `fk_pay_structure_setup_employee1_idx` ON `hr_pay_structure_setup` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_pay_structure_setup` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_structure_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_structure_template_details_id` ON `hr_pay_structure_setup` (`pay_structure_template_details_id`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_pay_structure_setup_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_structure_setup_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_pay_structure_setup_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `pay_structure_setup_records_id` ON `hr_pay_structure_setup_history` (`pay_structure_setup_records_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_pay_structure_setup_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_pay_structure_setup_records` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_pay_structure_setup_records` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_structure_setup_records` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_pay_structure_template_earning_heads1_idx` ON `hr_pay_structure_template` (`primary_earnings_head_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_structure_template` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_pay_structure_template_details1_idx` ON `hr_pay_structure_template_details` (`pay_structure_template_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_structure_template_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `changes_by` ON `hr_pay_structure_template_details_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `pay_structure_template_id` ON `hr_pay_structure_template_details_history` (`pay_structure_template_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_pay_structure_template_details_history` (`changes_to`,`previous_id_users`);--> statement-breakpoint
CREATE INDEX `changes_by_id_users` ON `hr_pay_structure_template_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `pay_structure_template_id` ON `hr_pay_structure_template_history` (`pay_structure_template_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_pay_structure_template_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `fk_pay_structure_variable_input_employee1_idx` ON `hr_pay_structure_variable_input` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_pay_structure_variable_input` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_ledger` ON `hr_payment` (`id_ledger`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_payment` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_voucher` ON `hr_payment` (`id_voucher`);--> statement-breakpoint
CREATE INDEX `id_voucher_bank_book` ON `hr_payment` (`id_voucher_bank_book`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_portal_access_records` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_portal_access_records` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_prefix` (`id_users`);--> statement-breakpoint
CREATE INDEX `project_id` ON `hr_prefix` (`project_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_present_company` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_department` ON `hr_present_company` (`id_department`);--> statement-breakpoint
CREATE INDEX `id_designation` ON `hr_present_company` (`id_designation`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_present_company` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_grades` ON `hr_present_company` (`id_grade`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_present_company` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_present_offday_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_present_offday_master` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_present_offday_master` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_present_offday_master` (`id_users`);--> statement-breakpoint
CREATE INDEX `present_offday_template_id` ON `hr_present_offday_master` (`present_offday_template_id`);--> statement-breakpoint
CREATE INDEX `changes_by_id_user` ON `hr_present_offday_master_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_present_offday_master_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `present_offday_id` ON `hr_present_offday_master_history` (`present_offday_id`);--> statement-breakpoint
CREATE INDEX `present_offday_template_id` ON `hr_present_offday_master_history` (`present_offday_template_id`);--> statement-breakpoint
CREATE INDEX `previous_id_user` ON `hr_present_offday_master_history` (`previous_id_user`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_present_offday_monthly` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_present_offday_monthly` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_hr_present_offday_file_import` ON `hr_present_offday_monthly` (`id_hr_present_offday_file_import`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_present_offday_monthly` (`id_user`);--> statement-breakpoint
CREATE INDEX `fk_hr_present_offday_monthly_history_id_employee1_idx` ON `hr_present_offday_monthly_history` (`employee_id`);--> statement-breakpoint
CREATE INDEX `fk_hr_present_offday_monthly_history_id_users1_idx` ON `hr_present_offday_monthly_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `fk_hr_present_offday_monthly_history_id_users2_idx` ON `hr_present_offday_monthly_history` (`previous_id_user`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_present_offday_setup_file_import` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_present_offday_setup_file_import` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_present_offday_template` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_profession_type` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hr_project_permission` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_project_permission` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_projectwise_role_assign` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_projectwise_role_assign` (`id_users`);--> statement-breakpoint
CREATE INDEX `fk_projectwise_template_assign_business_unit1_idx` ON `hr_projectwise_template_assign` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `fk_projectwise_template_assign_users1_idx` ON `hr_projectwise_template_assign` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_promotion_info` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_designation` ON `hr_promotion_info` (`id_designation`);--> statement-breakpoint
CREATE INDEX `id_equivalent_designation` ON `hr_promotion_info` (`id_equivalent_designation`);--> statement-breakpoint
CREATE INDEX `id_prev_business_unit` ON `hr_promotion_info` (`id_prev_business_unit`);--> statement-breakpoint
CREATE INDEX `id_prev_company` ON `hr_promotion_info` (`id_prev_company`);--> statement-breakpoint
CREATE INDEX `id_prev_department` ON `hr_promotion_info` (`id_prev_department`);--> statement-breakpoint
CREATE INDEX `id_prev_designation` ON `hr_promotion_info` (`id_prev_designation`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_promotion_info` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_provident_fund_details` (`employee_id`);--> statement-breakpoint
CREATE INDEX `generation_details_id` ON `hr_provident_fund_details` (`generation_details_id`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_provident_fund_details` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_hr_provident_fund_setup` ON `hr_provident_fund_details` (`id_hr_provident_fund_setup`);--> statement-breakpoint
CREATE INDEX `id_hr_provident_fund_template` ON `hr_provident_fund_details` (`id_hr_provident_fund_template`);--> statement-breakpoint
CREATE INDEX `id_pay_slip_generation_info` ON `hr_provident_fund_details` (`id_pay_slip_generation_info`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_provident_fund_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_slip_generation_id` ON `hr_provident_fund_details` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_provident_fund_setup` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hr_provident_fund_template` ON `hr_provident_fund_setup` (`id_hr_provident_fund_template`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_provident_fund_setup` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_provident_fund_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hr_provident_fund_template` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_provident_fund_template` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_reference` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_reference` (`id_users`);--> statement-breakpoint
CREATE INDEX `bank_id` ON `hr_salary_business_unit` (`bank_id`);--> statement-breakpoint
CREATE INDEX `branch_id` ON `hr_salary_business_unit` (`branch_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_salary_business_unit` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_salary_business_unit` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_shift_master` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_area_type` ON `hr_tax_area` (`id_hr_tax_area_type`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_template` ON `hr_tax_area` (`id_hr_tax_template`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_tax_area` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_tax_bonus_setup` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_template` ON `hr_tax_bonus_setup` (`id_hr_tax_template`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_tax_bonus_setup` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_template` ON `hr_tax_calculation_range` (`id_hr_tax_template`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_tax_calculation_range` (`id_users`);--> statement-breakpoint
CREATE INDEX `changes_by_id_users` ON `hr_tax_calculation_range_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_template` ON `hr_tax_calculation_range_history` (`id_hr_tax_template`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_tax_calculation_range_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_tax_challan_employee` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_challan_entry` ON `hr_tax_challan_employee` (`id_hr_tax_challan_entry`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_tax_challan_employee` (`id_users`);--> statement-breakpoint
CREATE INDEX `approver_id` ON `hr_tax_challan_entry` (`approver_id`);--> statement-breakpoint
CREATE INDEX `branch_id` ON `hr_tax_challan_entry` (`branch_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_tax_challan_entry` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_tax_challan_entry` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_tax_challan_entry` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_slip_generation_id` ON `hr_tax_challan_entry` (`pay_slip_generation_id`);--> statement-breakpoint
CREATE INDEX `submitted_by_id` ON `hr_tax_challan_entry` (`submitted_by_id`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hr_tax_challan_entry_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_challan_entry` ON `hr_tax_challan_entry_history` (`id_hr_tax_challan_entry`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_tax_challan_entry_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `earning_heads_id` ON `hr_tax_policy_earning_head_wise` (`earning_heads_id`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_template` ON `hr_tax_policy_earning_head_wise` (`id_hr_tax_template`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_tax_policy_earning_head_wise` (`id_users`);--> statement-breakpoint
CREATE INDEX `changes_by_id_users` ON `hr_tax_policy_earning_head_wise_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_template` ON `hr_tax_policy_earning_head_wise_history` (`id_hr_tax_template`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_tax_policy_earning_head_wise_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_tax_recalculate` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_template` ON `hr_tax_recalculate` (`id_hr_tax_template`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_tax_recalculate` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hr_tax_template` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_tax_template` (`id_users`);--> statement-breakpoint
CREATE INDEX `changes_by_id_users` ON `hr_tax_template_history` (`changes_by`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_template` ON `hr_tax_template_history` (`id_hr_tax_template`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_tax_template_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hr_training_certification` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_country` ON `hr_training_certification` (`id_country`);--> statement-breakpoint
CREATE INDEX `id_hr_institutes` ON `hr_training_certification` (`id_hr_institutes`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_training_certification` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_transferred_company` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_department` ON `hr_transferred_company` (`id_department`);--> statement-breakpoint
CREATE INDEX `id_designation` ON `hr_transferred_company` (`id_designation`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `hr_transferred_company` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_grade` ON `hr_transferred_company` (`id_grade`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_transferred_company` (`id_user`);--> statement-breakpoint
CREATE INDEX `fk_transferred_employees_salary_employee1_idx` ON `hr_transferred_employees_salary` (`employee_id`);--> statement-breakpoint
CREATE INDEX `fk_transferred_employees_salary_id_business_unit1_idx` ON `hr_transferred_employees_salary` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `fk_transferred_employees_salary_id_users1_idx` ON `hr_transferred_employees_salary` (`id_users`);--> statement-breakpoint
CREATE INDEX `pay_structure_template_id` ON `hr_transferred_employees_salary` (`pay_structure_template_id`);--> statement-breakpoint
CREATE INDEX `transfer_id` ON `hr_transferred_employees_salary` (`transfer_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hr_variable_input_file_import` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_variable_input_file_import` (`id_user`);--> statement-breakpoint
CREATE INDEX `pay_structure_variable_input_id` ON `hr_variable_input_history` (`pay_structure_variable_input_id`);--> statement-breakpoint
CREATE INDEX `previous_id_users` ON `hr_variable_input_history` (`previous_id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hr_work_station` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_candidate_user` ON `hris_candidate_user_addresses` (`id_candidate_user`);--> statement-breakpoint
CREATE INDEX `id_candidate_user` ON `hris_candidate_user_educations` (`id_candidate_user`);--> statement-breakpoint
CREATE INDEX `id_candidate_user` ON `hris_candidate_user_experiences` (`id_candidate_user`);--> statement-breakpoint
CREATE INDEX `id_candidate_user` ON `hris_candidate_user_references` (`id_candidate_user`);--> statement-breakpoint
CREATE INDEX `id_candidate_user` ON `hris_candidate_user_trainings` (`id_candidate_user`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hris_citeria_master` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hris_departmental_budget` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_department` ON `hris_departmental_budget` (`id_department`);--> statement-breakpoint
CREATE INDEX `id_designation` ON `hris_departmental_budget` (`id_designation`);--> statement-breakpoint
CREATE INDEX `id_hris_departmental_budget` ON `hris_departmental_budget_details` (`id_hris_departmental_budget`);--> statement-breakpoint
CREATE INDEX `id_hris_job_create_details` ON `hris_departmental_budget_details` (`id_hris_job_create_details`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hris_document_master` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_file_archive_document_type` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hris_file_archive_entry` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_file_archive_entry` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_file_archive_entry_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `appraised_by` ON `hris_interview_appraise` (`appraised_by`);--> statement-breakpoint
CREATE INDEX `id_inter_view_setup_details` ON `hris_interview_appraise` (`id_inter_view_setup_details`);--> statement-breakpoint
CREATE INDEX `id_interview_appraised_characteristic` ON `hris_interview_appraise` (`id_interview_appraised_characteristic`);--> statement-breakpoint
CREATE INDEX `id_interview_appraised_rating` ON `hris_interview_appraise` (`id_interview_appraised_rating`);--> statement-breakpoint
CREATE INDEX `id_inter_view_setup_details` ON `hris_interview_appraised_candidates` (`id_inter_view_setup_details`);--> statement-breakpoint
CREATE INDEX `id_interview_appraise` ON `hris_interview_appraised_references` (`id_interview_appraise`);--> statement-breakpoint
CREATE INDEX `account_payable` ON `hris_job_advertisement_bill_entry` (`account_payable`);--> statement-breakpoint
CREATE INDEX `approver_1` ON `hris_job_advertisement_bill_entry` (`approver_1`);--> statement-breakpoint
CREATE INDEX `approver_2` ON `hris_job_advertisement_bill_entry` (`approver_2`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hris_job_advertisement_bill_entry` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_job_advertisements` ON `hris_job_advertisement_bill_entry` (`id_job_advertisements`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hris_job_advertisement_bill_entry` (`id_user`);--> statement-breakpoint
CREATE INDEX `id_vendors` ON `hris_job_advertisement_bill_entry` (`id_vendors`);--> statement-breakpoint
CREATE INDEX `id_voucher` ON `hris_job_advertisement_bill_entry` (`id_voucher`);--> statement-breakpoint
CREATE INDEX `id_job_advertisement` ON `hris_job_advertisement_media_masters` (`id_job_advertisement`);--> statement-breakpoint
CREATE INDEX `id_vendors` ON `hris_job_advertisement_media_masters` (`id_vendors`);--> statement-breakpoint
CREATE INDEX `id_job_requisition` ON `hris_job_advertisements` (`id_job_requisition`);--> statement-breakpoint
CREATE INDEX `current_job_requisition_id` ON `hris_job_application_history` (`current_job_requisition_id`);--> statement-breakpoint
CREATE INDEX `id_job_application` ON `hris_job_application_history` (`id_job_application`);--> statement-breakpoint
CREATE INDEX `id_user` ON `hris_job_application_history` (`id_user`);--> statement-breakpoint
CREATE INDEX `previous_job_requisition_id` ON `hris_job_application_history` (`previous_job_requisition_id`);--> statement-breakpoint
CREATE INDEX `id_candidate_user` ON `hris_job_applications` (`id_candidate_user`);--> statement-breakpoint
CREATE INDEX `id_job_requisition` ON `hris_job_applications` (`id_job_requisition`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hris_job_create` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_department` ON `hris_job_create` (`id_department`);--> statement-breakpoint
CREATE INDEX `id_designation` ON `hris_job_create` (`id_designation`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_job_create` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_job_create` ON `hris_job_create_details` (`id_hris_job_create`);--> statement-breakpoint
CREATE INDEX `department_id` ON `hris_job_description` (`department_id`);--> statement-breakpoint
CREATE INDEX `designation_id` ON `hris_job_description` (`designation_id`);--> statement-breakpoint
CREATE INDEX `grade_id` ON `hris_job_description` (`grade_id`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `hris_job_description` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_job_description` (`id_users`);--> statement-breakpoint
CREATE INDEX `work_station_id` ON `hris_job_description` (`work_station_id`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_dimension` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_experience` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_external_customer` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_internal_customer` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `hris_job_description_non_performing_areas` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_performing_area` ON `hris_job_description_non_performing_areas` (`id_job_description_performing_area`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_performing_area` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_qualification` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_quality_parameter` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_soft_skill` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_special_requirement` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_hris_job_description` ON `hris_job_description_technical_skill` (`id_hris_job_description`);--> statement-breakpoint
CREATE INDEX `id_job_requisition` ON `hris_job_requisition_approval_activities` (`id_job_requisition`);--> statement-breakpoint
CREATE INDEX `designation_id` ON `hris_job_requisition_summery` (`designation_id`);--> statement-breakpoint
CREATE INDEX `id_department` ON `hris_job_requisition_summery` (`id_department`);--> statement-breakpoint
CREATE INDEX `id_projects` ON `hris_job_requisition_summery` (`id_projects`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_job_requisition_summery` (`id_users`);--> statement-breakpoint
CREATE INDEX `is_employee_nature_type` ON `hris_job_requisition_summery` (`id_employee_nature_type`);--> statement-breakpoint
CREATE INDEX `id_hris_job_requisition_summery` ON `hris_job_requisition_summery_potential_candidate_cv` (`id_hris_job_requisition_summery`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_job_requisition_summery_potential_candidate_cv` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_ceo` ON `hris_job_requisitions` (`id_ceo`);--> statement-breakpoint
CREATE INDEX `id_coo_chro` ON `hris_job_requisitions` (`id_coo_chro`);--> statement-breakpoint
CREATE INDEX `id_coo_recommendation` ON `hris_job_requisitions` (`id_coo_recommendation`);--> statement-breakpoint
CREATE INDEX `id_department` ON `hris_job_requisitions` (`id_department`);--> statement-breakpoint
CREATE INDEX `id_designation` ON `hris_job_requisitions` (`id_designation`);--> statement-breakpoint
CREATE INDEX `id_divisional_hr` ON `hris_job_requisitions` (`id_divisional_hr`);--> statement-breakpoint
CREATE INDEX `id_employee_status` ON `hris_job_requisitions` (`id_employee_status`);--> statement-breakpoint
CREATE INDEX `id_grade` ON `hris_job_requisitions` (`id_grade`);--> statement-breakpoint
CREATE INDEX `id_hr_recommendation` ON `hris_job_requisitions` (`id_hr_recommendation`);--> statement-breakpoint
CREATE INDEX `id_project_hr` ON `hris_job_requisitions` (`id_project_hr`);--> statement-breakpoint
CREATE INDEX `id_recommender` ON `hris_job_requisitions` (`id_recommender`);--> statement-breakpoint
CREATE INDEX `id_recruitment_officer` ON `hris_job_requisitions` (`id_recruitment_officer`);--> statement-breakpoint
CREATE INDEX `id_requester` ON `hris_job_requisitions` (`id_requester`);--> statement-breakpoint
CREATE INDEX `id_work_station` ON `hris_job_requisitions` (`id_work_station`);--> statement-breakpoint
CREATE INDEX `id_job_requisition` ON `hris_job_responsibilities` (`id_job_requisition`);--> statement-breakpoint
CREATE INDEX `id_media_type` ON `hris_media_master` (`id_media_type`);--> statement-breakpoint
CREATE INDEX `id_performance_appraisal_setup` ON `hris_performance_appraisal_date_ranges` (`id_performance_appraisal_setup`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `hris_performance_appraisal_setup` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `accountant_employee_id` ON `hris_rent_generation_details` (`accountant_employee_id`);--> statement-breakpoint
CREATE INDEX `ap_employee_id` ON `hris_rent_generation_details` (`ap_employee_id`);--> statement-breakpoint
CREATE INDEX `approved_by` ON `hris_rent_generation_details` (`approved_by`);--> statement-breakpoint
CREATE INDEX `certified_by` ON `hris_rent_generation_details` (`certified_by`);--> statement-breakpoint
CREATE INDEX `checked_by` ON `hris_rent_generation_details` (`checked_by`);--> statement-breakpoint
CREATE INDEX `id_hris_rent_agreement_details` ON `hris_rent_generation_details` (`id_hris_rent_agreement_details`);--> statement-breakpoint
CREATE INDEX `submitted_by` ON `hris_rent_generation_details` (`submitted_by`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_resident_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_resident_floor_details` ON `hris_resident_flat_details` (`id_hris_resident_floor_details`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_resident_flat_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_resident_flat_details` ON `hris_resident_flat_room_details` (`id_hris_resident_flat_details`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_resident_flat_room_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_resident_details` ON `hris_resident_floor_details` (`id_hris_resident_details`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_resident_floor_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_responsibility_matrix_function` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_responsibility_matrix_sub_function` ON `hris_responsibility_matrix_incharge` (`id_hris_responsibility_matrix_sub_function`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_responsibility_matrix_incharge` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_responsibility_matrix_function` ON `hris_responsibility_matrix_sub_function` (`id_hris_responsibility_matrix_function`);--> statement-breakpoint
CREATE INDEX `id_hris_responsibility_sub_function` ON `hris_responsibility_sub_function_details` (`id_hris_responsibility_sub_function`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_responsibility_sub_function_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_job_requisition` ON `hris_special_notes` (`id_job_requisition`);--> statement-breakpoint
CREATE INDEX `candidate_id` ON `hris_talent_acquisition_joining_details` (`candidate_id`);--> statement-breakpoint
CREATE INDEX `concern_hr_id` ON `hris_talent_acquisition_joining_details` (`concern_hr_id`);--> statement-breakpoint
CREATE INDEX `concern_super_visor_id` ON `hris_talent_acquisition_joining_details` (`concern_super_visor_id`);--> statement-breakpoint
CREATE INDEX `id_appointment_letter` ON `hris_talent_acquisition_joining_details` (`id_appointment_letter`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hris_talent_acquisition_joining_details` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_talent_acquisition_joining_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hris_traits_master` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_traits_master` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_designation` ON `hris_traits_setup_details` (`id_designation`);--> statement-breakpoint
CREATE INDEX `id_hris_traits_master` ON `hris_traits_setup_details` (`id_hris_traits_master`);--> statement-breakpoint
CREATE INDEX `id_project` ON `hris_traits_setup_details` (`id_project`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_traits_setup_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_utility_generation_details` ON `hris_utility_generation_charge_details` (`id_hris_utility_generation_details`);--> statement-breakpoint
CREATE INDEX `id_hris_utility_service` ON `hris_utility_generation_charge_details` (`id_hris_utility_service`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_utility_generation_charge_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `accountant_employee_id` ON `hris_utility_generation_details` (`accountant_employee_id`);--> statement-breakpoint
CREATE INDEX `ap_employee_id` ON `hris_utility_generation_details` (`ap_employee_id`);--> statement-breakpoint
CREATE INDEX `approved_by` ON `hris_utility_generation_details` (`approved_by`);--> statement-breakpoint
CREATE INDEX `certified_by` ON `hris_utility_generation_details` (`certified_by`);--> statement-breakpoint
CREATE INDEX `checked_by` ON `hris_utility_generation_details` (`checked_by`);--> statement-breakpoint
CREATE INDEX `id_hris_rent_agreement_details` ON `hris_utility_generation_details` (`id_hris_rent_agreement_details`);--> statement-breakpoint
CREATE INDEX `submitted_by` ON `hris_utility_generation_details` (`submitted_by`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_utility_service` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_work_station_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `work_station_id` ON `hris_work_station_details` (`work_station_id`);--> statement-breakpoint
CREATE INDEX `id_hris_work_station_floor_details` ON `hris_work_station_flat_details` (`id_hris_work_station_floor_details`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_work_station_flat_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_work_station_flat_details` ON `hris_work_station_flat_room_details` (`id_hris_work_station_flat_details`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_work_station_flat_room_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_hris_work_station_details` ON `hris_work_station_floor_details` (`id_hris_work_station_details`);--> statement-breakpoint
CREATE INDEX `id_users` ON `hris_work_station_floor_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_categories` ON `inv_items` (`id_categories`);--> statement-breakpoint
CREATE INDEX `id_default_image` ON `inv_items` (`id_default_image`);--> statement-breakpoint
CREATE INDEX `id_models` ON `inv_items` (`id_models`);--> statement-breakpoint
CREATE INDEX `id_secondary_unit` ON `inv_items` (`id_secondary_unit`);--> statement-breakpoint
CREATE INDEX `id_unit` ON `inv_items` (`id_unit`);--> statement-breakpoint
CREATE INDEX `idx_id_color_items` ON `inv_items` (`id_color`);--> statement-breakpoint
CREATE INDEX `idx_id_products_items` ON `inv_items` (`id_products`);--> statement-breakpoint
CREATE INDEX `idx_id_size_items` ON `inv_items` (`id_size`);--> statement-breakpoint
CREATE INDEX `idx_id_speci_items` ON `inv_items` (`id_specifications`);--> statement-breakpoint
CREATE INDEX `idx_shutter_type` ON `inv_items` (`shutter_type`);--> statement-breakpoint
CREATE INDEX `item_code` ON `inv_items` (`item_code`);--> statement-breakpoint
CREATE INDEX `item_name` ON `inv_items` (`item_name`);--> statement-breakpoint
CREATE INDEX `approved_hr_id` ON `por_advance` (`approved_hr_id`);--> statement-breakpoint
CREATE INDEX `approved_supervisor_id` ON `por_advance` (`approved_supervisor_id`);--> statement-breakpoint
CREATE INDEX `id_cur_business_unit` ON `por_advance` (`id_cur_business_unit`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `por_advance` (`id_employee`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_app_fcm_tokens` (`employee_id`);--> statement-breakpoint
CREATE INDEX `hr_id` ON `por_attendance` (`hr_id`);--> statement-breakpoint
CREATE INDEX `line_supervisor_id` ON `por_attendance` (`line_supervisor_id`);--> statement-breakpoint
CREATE INDEX `hris_citeria_master_ibfk_2` ON `por_certificate_master` (`id_users`);--> statement-breakpoint
CREATE INDEX `id_project` ON `por_certificate_master` (`id_project`);--> statement-breakpoint
CREATE INDEX `id` ON `por_certificate_request` (`id_por_certificate_master`);--> statement-breakpoint
CREATE INDEX `requested_by` ON `por_certificate_request` (`requested_by`);--> statement-breakpoint
CREATE INDEX `hr_id` ON `por_compensatory_leaves` (`bu_hr_id`);--> statement-breakpoint
CREATE INDEX `line_supervisor_id` ON `por_compensatory_leaves` (`line_supervisor_id`);--> statement-breakpoint
CREATE INDEX `report_supervisor_id` ON `por_compensatory_leaves` (`reporting_supervisor_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_employee` (`employee_id`);--> statement-breakpoint
CREATE INDEX `appraisal_head_pm_pd_ceo_id` ON `por_employee_appraisal_details` (`appraisal_head_pm_pd_ceo_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_employee_appraisal_details` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_performance_appraisal_setup` ON `por_employee_appraisal_details` (`id_performance_appraisal_setup`);--> statement-breakpoint
CREATE INDEX `id_project` ON `por_employee_appraisal_details` (`id_project`);--> statement-breakpoint
CREATE INDEX `approver_id` ON `por_employee_car_ait` (`approver_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_employee_car_ait` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_fiscal_year` ON `por_employee_car_ait` (`id_fiscal_year`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_employee_hr` (`employee_id`);--> statement-breakpoint
CREATE INDEX `deleted_by` ON `por_employee_hr_details` (`deleted_by`);--> statement-breakpoint
CREATE INDEX `hr_id` ON `por_employee_hr_details` (`hr_id`);--> statement-breakpoint
CREATE INDEX `id_employee_hr` ON `por_employee_hr_details` (`id_employee_hr`);--> statement-breakpoint
CREATE INDEX `id_users` ON `por_employee_hr_details` (`id_users`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_employee_review` (`employee_id`);--> statement-breakpoint
CREATE INDEX `review_submitted_by` ON `por_employee_review` (`review_submitted_by`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_employee_supervisor` (`employee_id`);--> statement-breakpoint
CREATE INDEX `supervisor_id` ON `por_employee_supervisor` (`supervisor_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_employee_tin_info` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hr_tax_area_type` ON `por_employee_tin_info` (`id_hr_tax_area_type`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_dimensions` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_dimension` ON `por_job_description_additional_dimensions_history` (`id_job_description_additional_dimension`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_experiences` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_experience` ON `por_job_description_additional_experiences_history` (`id_job_description_additional_experience`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_external_customers` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_external_customer` ON `por_job_description_additional_external_customers_history` (`id_job_description_additional_external_customer`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_internal_customers` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_internal_customer` ON `por_job_description_additional_internal_customers_history` (`id_job_description_additional_internal_customer`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_performing_areas` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_performing_area` ON `por_job_description_additional_performing_areas_history` (`id_job_description_additional_performing_area`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_qualifications` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_qualification` ON `por_job_description_additional_qualifications_history` (`id_job_description_additional_qualification`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_quality_parameters` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_quality_parameter` ON `por_job_description_additional_quality_parameters_history` (`id_job_description_additional_quality_parameter`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_soft_skills` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_soft_skill` ON `por_job_description_additional_soft_skills_history` (`id_job_description_additional_soft_skill`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_special_requirements` (`employee_id`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_job_description_additional_tech_skills` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_job_description_additional_tech_skill` ON `por_job_description_additional_tech_skills_history` (`id_job_description_additional_tech_skill`);--> statement-breakpoint
CREATE INDEX `id_business_unit` ON `por_job_requisitions` (`id_business_unit`);--> statement-breakpoint
CREATE INDEX `submitted_by` ON `por_job_requisitions` (`submitted_by`);--> statement-breakpoint
CREATE INDEX `hr_id` ON `por_leave` (`hr_id`);--> statement-breakpoint
CREATE INDEX `id_employee` ON `por_leave` (`id_employee`);--> statement-breakpoint
CREATE INDEX `id_leave_policy` ON `por_leave` (`id_leave_policy`);--> statement-breakpoint
CREATE INDEX `id_leave_type` ON `por_leave` (`id_leave_type`);--> statement-breakpoint
CREATE INDEX `id_project` ON `por_leave` (`id_project`);--> statement-breakpoint
CREATE INDEX `leave_hr_id` ON `por_leave` (`leave_hr_id`);--> statement-breakpoint
CREATE INDEX `supervisor_id` ON `por_leave` (`line_supervisor_id`);--> statement-breakpoint
CREATE INDEX `id_por_leave` ON `por_leave_details` (`id_por_leave`);--> statement-breakpoint
CREATE INDEX `employee_id` ON `por_performance_appraise` (`employee_id`);--> statement-breakpoint
CREATE INDEX `id_hris_pms_score_master` ON `por_performance_appraise` (`id_hris_pms_score_master`);--> statement-breakpoint
CREATE INDEX `id_performance_appraisal_setup` ON `por_performance_appraise` (`id_performance_appraisal_setup`);--> statement-breakpoint
CREATE INDEX `id_performance_appraise_details` ON `por_performance_appraise_achievements` (`id_performance_appraise`);--> statement-breakpoint
CREATE INDEX `id_por_employee_appraisal_target_details` ON `por_performance_appraise_achievements` (`kpi`);--> statement-breakpoint
CREATE INDEX `id_appraiser` ON `por_performance_appraise_details` (`id_appraiser`);--> statement-breakpoint
CREATE INDEX `id_performance_appraisal_date_range` ON `por_performance_appraise_details` (`id_performance_appraisal_date_range`);--> statement-breakpoint
CREATE INDEX `id_performance_appraise` ON `por_performance_appraise_details` (`id_performance_appraise`);--> statement-breakpoint
CREATE INDEX `id_hris_traits_master` ON `por_performance_appraise_traits` (`id_hris_traits_master`);--> statement-breakpoint
CREATE INDEX `id_performance_appraise_details` ON `por_performance_appraise_traits` (`id_performance_appraise`);--> statement-breakpoint
CREATE INDEX `fk_projects_companies1_idx` ON `projects` (`id_companies`);
*/