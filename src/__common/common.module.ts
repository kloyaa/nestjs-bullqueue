import { Module } from "@nestjs/common";
import { ImageUploaderProcessor } from "./file_upload.process";
import { BullModule } from "@nestjs/bull";

@Module({
    imports: [],
    controllers: [],
    providers: [ImageUploaderProcessor],
    exports: []
})
export class CommonModule {}