import { Injectable } from '@nestjs/common'
import { ProjectRequestDTO } from './projects.dto.js'

@Injectable()
export class ProjectsService {
  findAll() {
    return ['teste1', 'teste2']
  }

  findById(id: string) {
    return 'teste'
  }

  create(data: ProjectRequestDTO) {
    return 'create teste'
  }

  update(id: string, data: ProjectRequestDTO) {
    return 'update teste'
  }

  remove(id: string) {
    return 'remove teste'
  }
}
