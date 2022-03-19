import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";

container.registerSingleton<IDateProvider>(
	"DayjsDateProvider",
	DayjsDateProvider
);

container.registerInstance<IMailProvider>(
	"EtherealMailProvider",
	new EtherealMailProvider()
);

container.registerSingleton<IStorageProvider>(
	"StorageProdiver",
	S3StorageProvider
);