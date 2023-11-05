import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '../../shared/persistence/timestamp.entity';
import { policiesConfig } from '../config/policies.config';
import { PolicyLanguages } from '../enums/policy-languages.enum';
import { PolicyTypes } from '../enums/policy-types.enum';

const { entity, index } = policiesConfig;
const { fields, options } = index;

@Entity(entity)
@Index(fields, options)
export class PolicyEntity extends TimestampEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column({ default: 'Default policy description' })
	description: string;

	@Column({
		type: 'enum',
		enum: PolicyTypes,
	})
	type: PolicyTypes;

	@Column({
		type: 'enum',
		enum: PolicyLanguages,
	})
	language: PolicyLanguages;

	constructor(
		id: string,
		title: string,
		description: string,
		type: PolicyTypes,
		language: PolicyLanguages,
	) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.type = type;
		this.language = language;
	}

	static create(
		id: string,
		title: string,
		description: string,
		type: PolicyTypes,
		language: PolicyLanguages,
	): PolicyEntity {
		return new PolicyEntity(id, title, description, type, language);
	}
}
