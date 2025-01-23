<template>
    <div class="min-h-screen flex flex-col bg-secondary-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <i class="fas fa-graduation-cap text-2xl text-primary-600 mr-2"></i>
                <span class="text-xl font-semibold text-secondary-800">Universidade</span>
              </div>
            </div>
            
            <nav class="hidden md:flex space-x-8">
              <router-link 
                to="/dashboard" 
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary-600 hover:text-primary-600"
              >
                Dashboard
              </router-link>
              <router-link 
                to="/students" 
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary-600 hover:text-primary-600"
              >
                Estudantes
              </router-link>
            </nav>
          </div>
        </div>
      </header>
  
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <slot></slot>
      </main>
    </div>
  </template>
  