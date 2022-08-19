<style scoped>
body {
    text-align: center;
    background-color: #f6f6f8;
}
input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

<template>
    <div id="app">
        <!-- TodoHeader -->
        <header>
            <h1>TODO it!</h1>
        </header>

        <!-- TodoInput -->
        <div class="inputBox shadow">
            <input
                type="text"
                placeholder="Type what you have to do"
                v-model.trim:value="newTodoItem"
                v-on:keyup.enter="addTodo"
                ref="myfocus"
            />
            <span class="addContainer" v-on:click="addTodo">
                <i class="addBtn fas fa-plus" aria-hidden="true"></i>
            </span>

            <div
                class="modal-mask"
                v-on:keyup.esc="$emit('close')"
                v-if="showModal"
                v-on:close="showModal = false"
            >
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 slot="header">경고</h3>
                        </div>

                        <div class="modal-footer">
                            <span v-on:click="showModal = false">
                                할 일을 입력하세요.
                                <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TodoList -->
        <section>
            <transition-group name="list" tag="ul">
                <li
                    v-for="(todoItem, index) in todoItems"
                    v-bind:key="todoItem.id"
                    v-bind:class="checked(todoItem.done)"
                    v-on:click="doneToggle(todoItem.id)"
                >
                    <i class="checkBtn fas fa-check" aria-hidden="true"></i>
                    {{ todoItem.todo }}
                    <span
                        class="removeBtn"
                        type="button"
                        v-on:click="removeTodo(todoItem.id)"
                    >
                        <i class="far fa-trash-alt" aria-hidden="true"></i>
                    </span>
                </li>
            </transition-group>
        </section>

        <!-- TodoFooter -->
        <div class="clearAllContainer">
            <span class="clearAllBtn" v-on:click="clearAll">Clear All</span>
        </div>
    </div>
</template>

