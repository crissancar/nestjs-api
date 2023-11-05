import { IsNotEmpty, IsString } from 'class-validator';

import { DynamicData } from '../../interfaces/dynamic-data.interface';

export class SendgridSendMailRequest {
	@IsNotEmpty()
	@IsString()
	readonly from: string;

	@IsNotEmpty()
	@IsString()
	readonly to: string;

	@IsNotEmpty()
	@IsString()
	readonly templateId: string;

	@IsNotEmpty()
	readonly dynamicTemplateData: DynamicData;

	constructor(from: string, to: string, templateId: string, dynamicTemplateData: DynamicData) {
		this.from = from;
		this.to = to;
		this.templateId = templateId;
		this.dynamicTemplateData = dynamicTemplateData;
	}

	static create(
		from: string,
		to: string,
		templateId: string,
		dynamicTemplateData: DynamicData,
	): SendgridSendMailRequest {
		return new SendgridSendMailRequest(from, to, templateId, dynamicTemplateData);
	}
}
