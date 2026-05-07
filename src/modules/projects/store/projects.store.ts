import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { useLocalStorage } from '@vueuse/core';


const initialLoad = (): Project[] => ([]);


export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage('projects', initialLoad()));
  const projectList = computed(() => projects.value);

  const addProject = (projectName: string) => {
    const newProject: Project = {
      id: String(projects.value.length + 1),
        name: projectName,
        tasks: [],
    };
    projects.value.push(newProject);
  }

  return { 

    // Getters
    projectList,

    //Methods
    addProject
  };
});