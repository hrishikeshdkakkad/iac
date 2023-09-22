import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Microservice } from "../constructs/ecsCompute";
import { ImageRepositoryStack } from "./ImageRepository.stack";
import { NetworkingStack } from "./Networking.stack";
import { ClusterStack } from "./EcsCluster.stack";
import { tfPimMicroservice } from "./services/tfPim";
import { SecretsStack } from "./Secrets.stack";

export interface MicroServiceStackProps extends StackProps {
  network: NetworkingStack;
  repository: ImageRepositoryStack;
  computeCluster: ClusterStack;
  config: any;
  secret: SecretsStack;
  // codeRepositoryStack: CodeRepositoryStack;
}

export class MicroServicesStack extends Stack {
  tfPim: Microservice;
  constructor(scope: Construct, id: string, props: MicroServiceStackProps) {
    super(scope, id, props);

    this.tfPim = tfPimMicroservice(
      this,
      props,
      props.secret.tfPimSecret.secret
    );
  }
}
